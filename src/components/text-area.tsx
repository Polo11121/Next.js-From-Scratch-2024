import { HTMLProps } from "react";
import classNames from "classnames";

type TextareaProps = {
  labelText?: string;
  labelClassName?: string;
} & HTMLProps<HTMLTextAreaElement>;

export const Textarea = ({
  labelText,
  labelClassName,
  ...textareaProps
}: TextareaProps) => (
  <div>
    {labelText && (
      <label
        htmlFor={textareaProps.id}
        className={classNames(
          "block text-gray-700 font-bold mb-2",
          labelClassName
        )}
      >
        {labelText}
      </label>
    )}
    <textarea {...textareaProps} />
  </div>
);
