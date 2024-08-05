import { ClipLoader } from "react-spinners";

const CSS_OVERDRIVE = {
  display: "block",
  margin: "100px auto",
};

export const Spinner = () => (
  <ClipLoader
    color="#3B82F6"
    cssOverride={CSS_OVERDRIVE}
    size={150}
    aria-label="Loading Spinner"
  />
);
