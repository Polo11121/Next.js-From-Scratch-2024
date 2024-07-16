const API_URL = process.env.NEXT_PUBLIC_DOMAIN || null;

export const fetchProperties = async () => {
  try {
    if (!API_URL) {
      return [];
    }

    const response = await fetch(`${API_URL}/api/properties`);

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return [];
  }
};

export const fetchProperty = async (id: string) => {
  try {
    if (!API_URL) {
      return null;
    }

    const response = await fetch(`${API_URL}/api/properties/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
