

export function Select({ value, onValueChange, children, className = "" }) {
  return (
    <div className={`relative inline-block w-full ${className}`}>
      {children}
    </div>
  );
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <div className={`px-3 py-2 border rounded cursor-pointer ${className}`}>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder, selectedValue }) {
  return <span>{selectedValue || placeholder}</span>;
}

export function SelectContent({ children }) {
  return <ul className="absolute z-10 bg-white border rounded mt-1">{children}</ul>;
}

export function SelectItem({ value, children, onClick }) {
  return (
    <li
      onClick={() => onClick(value)}
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </li>
  );
}
