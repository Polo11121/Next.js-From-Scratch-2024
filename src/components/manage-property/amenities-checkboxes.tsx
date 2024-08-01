import { ChangeEvent } from "react";

export const AMENITIES = [
  "Wifi",
  "Full Kitchen",
  "Washer & Dryer",
  "Free Parking",
  "Swimming Pool",
  "Hot Tub",
  "24/7 Security",
  "Wheelchair Accessible",
  "Elevator Access",
  "Dishwasher",
  "Gym/Fitness Center",
  "Air Conditioning",
  "Balcony/Patio",
  "Smart TV",
  "Coffee Maker",
];

type AmenitiesCheckboxesProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  amenities: string[];
  isDisabled?: boolean;
};

export const AmenitiesCheckboxes = ({
  onChange,
  amenities,
  isDisabled,
}: AmenitiesCheckboxesProps) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Amenities</label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {AMENITIES.map((amenity) => (
        <div key={amenity}>
          <input
            disabled={isDisabled}
            onChange={onChange}
            checked={amenities.includes(amenity)}
            type="checkbox"
            id={`amenity_${amenity.toLowerCase().replace(" ", "_")}`}
            name={amenity}
            value={amenity}
            className="mr-2"
          />
          <label htmlFor={`amenity_${amenity.toLowerCase().replace(" ", "_")}`}>
            {amenity}
          </label>
        </div>
      ))}
    </div>
  </div>
);
