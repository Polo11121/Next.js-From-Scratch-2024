"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { PROPERTY_TYPES } from "@/utils/constants";

export const PropertySearchForm = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const router = useRouter();

  const changeLocation = (e: ChangeEvent<HTMLInputElement>) =>
    setLocation(e.target.value);
  const changePropertyType = (e: ChangeEvent<HTMLSelectElement>) =>
    setPropertyType(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (location === "" && propertyType === "All") {
      router.push("/properties");
    } else {
      router.push(
        `/properties?location=${location}&propertyType=${propertyType}`
      );
    }
  };

  return (
    <form
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <Input
          labelClassName="sr-only"
          labelText="Location"
          type="text"
          id="location"
          placeholder="Enter Location (City, State, Zip, etc"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={location}
          onChange={changeLocation}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <Select
          labelText="Property Type"
          labelClassName="sr-only"
          id="property-type"
          className="w-full px-4 py-[13px] rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          options={["All", ...PROPERTY_TYPES]}
          value={propertyType}
          onChange={changePropertyType}
        />
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};
