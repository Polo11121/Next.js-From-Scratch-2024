import { HTMLProps } from "react";

type InputProps = {
  labelText?: string;
  containerClassName?: string;
} & HTMLProps<HTMLInputElement>;

export const Input = ({
  labelText,
  containerClassName,
  ...inputProps
}: InputProps) => (
  <div className={containerClassName}>
    {labelText && (
      <label className="block text-gray-700 font-bold mb-2">{labelText}</label>
    )}
    <input {...inputProps} />
  </div>
);
