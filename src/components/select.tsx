import classNames from "classnames";
import { HTMLProps } from "react";

type SelectProps = {
  options: string[];
  labelText: string;
  labelClassName?: string;
} & HTMLProps<HTMLSelectElement>;

export const Select = ({
  options,
  labelText,
  labelClassName,
  ...selectProps
}: SelectProps) => (
  <div>
    {labelText && (
      <label
        className={classNames(
          "block text-gray-700 font-bold mb-2",
          labelClassName
        )}
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
