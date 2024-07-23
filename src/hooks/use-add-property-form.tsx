import { ChangeEvent, useState, useTransition } from "react";
import { addProperty } from "@/actions/addProperty";

type FIELDS = {
  type: string;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: string;
  baths: string;
  square_feet: "";
  amenities: string[];
  rates: {
    weekly: string;
    monthly: string;
    nightly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
};

export const UseAddPropertyForm = () => {
  const [fields, setFields] = useState<FIELDS>({
    type: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    square_feet: "",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    images: [],
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    const isNestedField = name.includes(".");

    if (isNestedField) {
      const [parent, child] = name.split(".");
      setFields((prevFields) => ({
        ...prevFields,
        [parent]: {
          ...(prevFields[parent as keyof FIELDS] as object),
          [child]: value,
        },
      }));
      return;
    }

    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>
    handleChange(event);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    handleChange(event);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    handleChange(event);

  const handleAmenitiesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFields((prevFields) => {
      const amenities = checked
        ? [...prevFields.amenities, name]
        : prevFields.amenities.filter((amenity) => amenity !== name);

      return {
        ...prevFields,
        amenities,
      };
    });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const images = Array.from(files).map((file) => URL.createObjectURL(file));

    setFields((prevFields) => ({
      ...prevFields,
      images,
    }));
  };

  const addPropertyAction = async (formData: FormData) => {
    startTransition(() => {
      addProperty(formData);
    });
  };

  return {
    fields,
    handleSelectChange,
    handleInputChange,
    handleTextareaChange,
    handleAmenitiesChange,
    handleImageChange,
    addPropertyAction,
    isPending,
  };
};
