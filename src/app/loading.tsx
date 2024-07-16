"use client";

import { ClipLoader } from "react-spinners";

const CSS_OVERDRIVE = {
  display: "block",
  margin: "100px auto",
};

type LoadingPageProps = {
  loading: boolean;
};

const LoadingPage = ({ loading }: LoadingPageProps) => (
  <ClipLoader
    color="#3B82F6"
    loading={loading}
    cssOverride={CSS_OVERDRIVE}
    size={150}
    aria-label="Loading Spinner"
  />
);

export default LoadingPage;
