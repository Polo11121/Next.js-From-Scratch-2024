import { HTMLProps } from "react";
import classNames from "classnames";

type InputProps = {
  labelText?: string;
  containerClassName?: string;
  labelClassName?: string;
} & HTMLProps<HTMLInputElement>;

export const Input = ({
  labelText,
  containerClassName,
  labelClassName,
  ...inputProps
}: InputProps) => (
  <div className={containerClassName}>
    {labelText && (
      <label
        className={classNames(
          "block text-gray-700 font-bold mb-2",
          labelClassName
        )}
      >
        {labelText}
      </label>
    )}
    <input {...inputProps} />
  </div>
);
