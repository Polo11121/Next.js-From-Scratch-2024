import { HTMLProps } from "react";

type TextareaProps = {
  labelText?: string;
} & HTMLProps<HTMLTextAreaElement>;

export const Textarea = ({ labelText, ...textareaProps }: TextareaProps) => (
  <div>
    {labelText && (
      <label
        htmlFor={textareaProps.id}
        className="block text-gray-700 font-bold mb-2"
      >
        {labelText}
      </label>
    )}
    <textarea {...textareaProps} />
  </div>
);
