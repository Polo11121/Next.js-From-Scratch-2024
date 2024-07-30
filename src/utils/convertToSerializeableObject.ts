type LeanDocument = {
  [key: string]: any;
};

export const convertToSerializeableObject = (
  leanDocument: LeanDocument
): LeanDocument => {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key]?.toJSON && leanDocument[key]?.toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  return leanDocument;
};
