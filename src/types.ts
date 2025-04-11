export interface Cafe {
  id: string;
  name: string;
  rating: number;
  category: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  image: string;
  description: string;
}

export interface FilterOptions {
  rating: number | null;
  category: string | null;
  location: string | null;
}