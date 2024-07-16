import { ReactNode } from "react";
import classNames from "classnames";

type InfoBoxProps = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: {
    text: string;
    link: string;
    backgroundColor: string;
  };
  children: ReactNode;
};

export const InfoBox = ({
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
  heading,
}: InfoBoxProps) => (
  <div className={classNames("p-6 rounded-lg shadow-md", backgroundColor)}>
    <h2 className={classNames("text-2xl font-bold", textColor)}>{heading}</h2>
    <p className={classNames("mt-2 mb-4", textColor)}>{children}</p>
    <a
      href={buttonInfo.link}
      className={classNames(
        "inline-block  text-white rounded-lg px-4 py-2 hover:opacity-80",
        buttonInfo.backgroundColor
      )}
    >
      {buttonInfo.text}
    </a>
  </div>
);
