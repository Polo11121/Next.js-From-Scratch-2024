import { HTMLProps } from "react";

type SelectProps = {
  options: string[];
  labelText: string;
} & HTMLProps<HTMLSelectElement>;

export const Select = ({ options, labelText, ...selectProps }: SelectProps) => (
  <div>
    {labelText && (
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor={selectProps.id}
      >
        {labelText}
      </label>
    )}
    <select {...selectProps}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
