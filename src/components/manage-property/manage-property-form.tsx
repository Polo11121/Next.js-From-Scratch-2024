"use client";

import { AmenitiesCheckboxes } from "@/components/manage-property/amenities-checkboxes";
import { UseManagePropertyForm } from "@/hooks/use-manage-property-form";
import { capitalizeFirstLetter } from "@/utils/functions";
import { Textarea } from "@/components/text-area";
import { Select } from "@/components/select";
import { Input } from "@/components/input";
import { Property } from "@/models/Property";
import { PROPERTY_TYPES } from "@/utils/constants";
import Image from "next/image";

const LOCATION_FIELDS = ["street", "city", "state", "zipcode"] as const;

type ManagePropertyFormProps = {
  property?: Property;
};

export const ManagePropertyForm = ({ property }: ManagePropertyFormProps) => {
  const {
    fields,
    handleInputChange,
    handleSelectChange,
    handleTextareaChange,
    handleAmenitiesChange,
    handleImageChange,
    submitAction,
    isPending,
  } = UseManagePropertyForm(property);

  return (
    <form action={submitAction}>
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>
      <div className="flex flex-col gap-y-4">
        <Select
          disabled={isPending}
          onChange={handleSelectChange}
          value={fields.type}
          labelText="Property Type"
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
          options={PROPERTY_TYPES}
        />
        <Input
          disabled={isPending}
          onChange={handleInputChange}
          value={fields.name}
          labelText="Listing Name"
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3"
          placeholder="eg. Beautiful Apartment In Miami"
          required
        />
        <Textarea
          disabled={isPending}
          onChange={handleTextareaChange}
          value={fields.description}
          labelText="Description"
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows={4}
          placeholder="Add an optional description of your property"
        />
        <div className="bg-blue-50 p-4">
          {LOCATION_FIELDS.map((field) => (
            <Input
              disabled={isPending}
              onChange={handleInputChange}
              value={fields.location[field]}
              key={field}
              id={field}
              type="text"
              name={`location.${field}`}
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder={capitalizeFirstLetter(field)}
              required={field === "city" || field === "state"}
            />
          ))}
        </div>
        <div className="flex flex-wrap">
          <Input
            disabled={isPending}
            onChange={handleInputChange}
            value={fields.beds}
            containerClassName="w-full sm:w-1/3 pr-2"
            labelText="Beds"
            type="number"
            id="beds"
            name="beds"
            className="border rounded w-full py-2 px-3"
            required
          />
          <Input
            disabled={isPending}
            onChange={handleInputChange}
            value={fields.baths}
            containerClassName="w-full sm:w-1/3 px-2"
            labelText="Baths"
            type="number"
            id="baths"
            name="baths"
            className="border rounded w-full py-2 px-3"
            required
          />
          <Input
            disabled={isPending}
            onChange={handleInputChange}
            value={fields.square_feet}
            containerClassName="w-full sm:w-1/3 pl-2"
            labelText="Square Feet"
            type="number"
            id="square_feet"
            name="square_feet"
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <AmenitiesCheckboxes
          isDisabled={isPending}
          amenities={fields.amenities}
          onChange={handleAmenitiesChange}
        />
        <div className=" bg-blue-50 p-4">
          <h4 className="block text-gray-700 font-bold mb-2">
            Rates (Leave blank if not applicable)
          </h4>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Input
              disabled={isPending}
              onChange={handleInputChange}
              value={fields.rates.weekly}
              containerClassName="flex items-center gap-2"
              labelText="Weekly"
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
            />
            <Input
              disabled={isPending}
              onChange={handleInputChange}
              value={fields.rates.monthly}
              containerClassName="flex items-center gap-2"
              labelText="Monthly"
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
            />
            <Input
              disabled={isPending}
              onChange={handleInputChange}
              value={fields.rates.nightly}
              containerClassName="flex items-center gap-2"
              labelText="Nightly"
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
        <Input
          disabled={isPending}
          onChange={handleInputChange}
          value={fields.seller_info.name}
          labelText="Seller Name"
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
        />
        <Input
          disabled={isPending}
          onChange={handleInputChange}
          value={fields.seller_info.email}
          labelText="Seller Email"
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
        />
        <Input
          disabled={isPending}
          onChange={handleInputChange}
          value={fields.seller_info.phone}
          labelText="Seller Phone"
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
        />
        <Input
          disabled={isPending}
          onChange={handleImageChange}
          labelText="Images (Select up to 4 images)"
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          required={property ? false : true}
        />
        {Boolean(fields.images?.length) && (
          <div className="flex gap-2">
            {fields.images.map((image, index) => (
              <Image
                height={80}
                width={80}
                key={index}
                src={image}
                alt={`Property Image ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
        <button
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:opacity-50"
          type="submit"
        >
          {property ? "Edited" : "Add"} Property
        </button>
      </div>
    </form>
  );
};
