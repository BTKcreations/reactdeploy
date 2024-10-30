import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './InterfaceWithForm.css';
// import './InterfaceWithForm1.css';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const InterfaceWithForm = () => {
  
  const [submitted, setSubmitted] = useState(false);
  const [markdownData, setMarkdownData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      input1: e.target[0].value,
      input2: e.target[1].value,
      input3: e.target[2].value,
      input4: e.target[3].value,
      input5: e.target[4].value,
    };

    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok){
        const result = await response.json();
        setMarkdownData(result.markdown);
        console.log(result.markdown);
        setSubmitted(true);
      } else {
        console.error("error in fetchning data from backend");
      }
    } catch (error) {
      console.log("Fetch error: ",error);
    }

    setSubmitted(true); // Show the right block
  };

  const handleBackToForm = () => {
    setSubmitted(false);
  };

  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    console.log("width : ",canvas.width);
    console.log("height : ",canvas.height);

    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const imgX = (pageWidth - imgWidth * ratio) / 2;
    const imgY = (pageHeight - imgHeight * ratio) / 2;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${document.querySelector('#input1').value}_document.pdf`);
};

  return (
    <div className="interface-container">
      <h1 className='heading'>Generate Your Document</h1>
      <div className={`interface ${submitted ? 'submitted' : ''}`}>
        <div className="left-block">
          <form onSubmit={handleSubmit}>
            <div className='form-heading-container'>
              <h1 className='form-heading'>Student Details</h1>
            </div>
            <div className='input-container'>
              <div>
                <label htmlFor="input1">First name</label>
                <input type="text" id="input1" name='fname' placeholder="First name" required />
              </div>
              <div>
                <label htmlFor="input2">Last name</label>
                <input type="text" id="input2" name='lname' placeholder="Last name" required />
              </div>
              <div>
                <label htmlFor="input3">Marks</label>
                <input type="number" value={123} id="input3" name='marks' placeholder="Marks" required />
              </div>
              <div>
                <label htmlFor="input4">Email</label>
                <input type="email" id="input4" name='email' placeholder="Email" required />
              </div>
              <div>
                <label htmlFor="input5">Choose an Option</label>
                <select id="input5" required>
                  <option value="">Select an option</option>
                  <option value="distributor">Distributor</option>
                  <option value="regional" selected>Regional C&F</option>
                  <option value="national">National C&F</option>
                </select>
              </div>
            </div>
            <div className='button-container'>
              <button type="submit" className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
        {submitted && (
          <div className="right-block">
            <button className='back-button' onClick={handleBackToForm}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="back-icon"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg></button>

            <div className="sub-block">
              <h3 className='heading'>Additional Information</h3>
              <div className='document' ref={printRef}>
              <ReactMarkdown children={markdownData} />
              </div>
            </div>
            
            <div className="pdf-btn-container">
              <button className="pdf-btn" onClick={handleDownloadPdf}>Download document</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceWithForm;
