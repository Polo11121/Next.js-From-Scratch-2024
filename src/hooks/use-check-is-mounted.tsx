"use client";

import { useEffect, useState } from "react";

export const UseCheckIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(
    () => setIsMounted(true),

    []
  );

  return isMounted;
};
