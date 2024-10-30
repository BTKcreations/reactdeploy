// src/components/ui/input.js
export function Input({ id, type = "text", value, onChange, placeholder, className = "" }) {
    return (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-3 py-2 border rounded w-full ${className}`}
      />
    );
  }
  