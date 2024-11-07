import React from "react";
import "./styles.css";

interface InputFieldProps {
  field: string;
  value: string;
  onChange: (name: string, value: string) => void;
  suggestions: string[];
}

const InputField: React.FC<InputFieldProps> = ({
  field,
  value,
  onChange,
  suggestions,
}) => {
  return (
    <div className="inputBox">
      <label>{field.toUpperCase()}</label>
      <input
        className="input"
        type="text"
        name={field}
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        list={`${field}-autocomplete`}
      />
      <datalist id={`${field}-autocomplete`}>
        {suggestions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </div>
  );
};

export default InputField;
