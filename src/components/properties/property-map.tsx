"use client";

import { useMapLocation } from "@/hooks/use-map-location";
import { Property } from "@/models/Property";
import { Spinner } from "@/components/spinner";
import GoogleMapReact from "google-map-react";

type PropertyMapProps = {
  location: Property["location"];
};

export const PropertyMap = ({ location }: PropertyMapProps) => {
  const { mapLocation, viewport, isLoading, isError } =
    useMapLocation(location);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    <div style={{ height: "25vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={mapLocation}
        defaultZoom={viewport.zoom}
      />
    </div>
  );
};
