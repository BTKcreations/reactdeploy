// src/components/ui/label.js
export function Label({ htmlFor, children, className = "" }) {
    return (
      <label htmlFor={htmlFor} className={`block font-medium text-gray-700 ${className}`}>
        {children}
      </label>
    );
  }
  