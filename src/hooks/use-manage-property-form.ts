import { ChangeEvent, useState, useTransition } from "react";
import { addProperty } from "@/actions/addProperty";
import { toast } from "react-toastify";
import { Property } from "@/models/Property";
import { editProperty } from "@/actions/editProperty";

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
  square_feet: string;
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

export const UseManagePropertyForm = (property?: Property) => {
  const [fields, setFields] = useState<FIELDS>({
    type: property?.type || "",
    name: property?.name || "",
    description: property?.description || "",
    location: {
      street: property?.location.street || "",
      city: property?.location.city || "",
      state: property?.location.state || "",
      zipcode: property?.location.zipcode || "",
    },
    beds: property?.beds.toString() || "",
    baths: property?.baths.toString() || "",
    square_feet: property?.square_feet.toString() || "",
    amenities: property?.amenities || [],
    rates: {
      weekly: property?.rates.weekly.toString() || "",
      monthly: property?.rates.monthly.toString() || "",
      nightly: property?.rates.nightly.toString() || "",
    },
    seller_info: {
      name: property?.seller_info.name || "",
      email: property?.seller_info.email || "",
      phone: property?.seller_info.phone || "",
    },
    images: property?.images || [],
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

  const submitAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await (property
        ? editProperty(property, formData)
        : addProperty(formData));

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(`Property successfully ${property ? "edited" : "added"}`);
    });
  };

  return {
    fields,
    handleSelectChange,
    handleInputChange,
    handleTextareaChange,
    handleAmenitiesChange,
    handleImageChange,
    submitAction,
    isPending,
  };
};
