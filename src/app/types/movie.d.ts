export interface Movie {
  _id: string;
  title: string;
  genres: string[];
  plot: string;
  link?: string;
  rating?: number;
  img?: string;
  released?: number;
  language?: "english" | "french" | "hindi" | "others";
  type: "movie" | "series" | "reality";
  createdAt?: string;
  updatedAt?: string;
}
