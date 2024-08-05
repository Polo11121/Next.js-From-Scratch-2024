"use client";

import { useEffect, useState } from "react";
import { Property } from "@/models/Property";
import { fromAddress, setKey } from "react-geocode";

type MapLocation = {
  lat: number;
  lng: number;
};

type Viewport = {
  zoom: number;
  height: string;
  width: string;
} & MapLocation;

export const useMapLocation = (location: Property["location"]) => {
  const [mapLocation, setMapLocation] = useState<MapLocation>({
    lat: 0,
    lng: 0,
  });
  const [viewport, setViewport] = useState<Viewport>({
    lat: 0,
    lng: 0,
    zoom: 10,
    height: "500px",
    width: "100%",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  setKey(process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY!);

  const { city, state, street, zipcode } = location;

  useEffect(() => {
    const fetchCoords = async () => {
      const response = await fromAddress(`
						${street} ${city} ${state} ${zipcode}`);

      if (!response.results.length) {
        setIsError(true);
        return;
      }

      console.log(response);

      const responseLocation = response.results[0].geometry.location;

      setMapLocation(responseLocation);

      try {
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoords();
  }, [city, state, street, zipcode]);

  return { mapLocation, viewport, isLoading, isError };
};
