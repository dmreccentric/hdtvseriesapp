"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Movie {
  _id: string;
  title: string;
  genres: string[];
  plot: string;
  type: string;
  language?: string;
  link?: string;
  rating?: number;
  released?: number;
  seasons?: { seasonNumber: number; episodes: { episodeNumber: number }[] }[];
  img?: string;
  himg?: string;
}

export default function EditMoviePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // movie ID from URL
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [movie, setMovie] = useState<Movie | null>(null);

  const genresEnum = [
    "Action",
    "Adventure",
    "Alternate History",
    "Animation",
    "Anime",
    "Biography",
    "Business",
    "Career",
    "Comedy",
    "Competition",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Historical",
    "History",
    "Horror",
    "Legal",
    "Martial Arts",
    "Medical",
    "Military",
    "Music",
    "Mystery",
    "News",
    "Police",
    "Procedural",
    "Psychological",
    "Reality",
    "Religious",
    "Romance",
    "Satire",
    "Sci-Fi",
    "Sitcom",
    "Social Experiment",
    "Sports",
    "Spy",
    "Superhero",
    "Supernatural",
    "Survival",
    "Teen",
    "Thriller",
    "War",
    "Western",
  ];

  const [form, setForm] = useState({
    title: "",
    plot: "",
    genres: [] as string[],
    type: "",
    language: "",
    link: "",
    rating: "",
    released: "",
    image: null as File | null,
    himage: null as File | null,
    seasonNumber: "",
    episodeNumber: "",
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [HPreview, setHPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const languageEnum = ["English", "French", "Hindi", "others"];
  const typeEnum = ["Movie", "Series", "Reality"];

  // Fetch movie data
  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      const res = await fetch(`${API_BASE}/api/v1/movie/${id}`);
      const data = await res.json();
      setMovie(data.movie);
      setForm({
        title: data.movie.title,
        plot: data.movie.plot,
        genres: data.movie.genres,
        type: data.movie.type,
        language: data.movie.language || "",
        link: data.movie.link || "",
        rating: data.movie.rating?.toString() || "",
        released: data.movie.released?.toString() || "",
        image: null,
        himage: null,
        seasonNumber: data.movie.seasons?.[0]?.seasonNumber.toString() || "",
        episodeNumber:
          data.movie.seasons?.[0]?.episodes?.[0]?.episodeNumber.toString() ||
          "",
      });
      setPreview(data.movie.img || null);
    };
    fetchMovie();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Type guard for file inputs
    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files[0]
    ) {
      const file = e.target.files[0];
      if (name === "image") {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      } else if (name === "himage") {
        setForm({ ...form, himage: file });
        setHPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddGenre = (genre: string) => {
    if (!form.genres.includes(genre))
      setForm({ ...form, genres: [...form.genres, genre] });
  };

  const handleRemoveGenre = (genre: string) => {
    setForm({ ...form, genres: form.genres.filter((g) => g !== genre) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("plot", form.plot);
    fd.append("type", form.type);
    fd.append("language", form.language);
    fd.append("genres", JSON.stringify(form.genres));
    if (form.link) fd.append("link", form.link);
    if (form.rating) fd.append("rating", form.rating.toString());
    if (form.released) fd.append("released", form.released.toString());
    if (form.image) fd.append("img", form.image);
    if (form.himage) fd.append("himg", form.himage);

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/v1/movie/${id}`, {
        method: "PATCH",
        body: fd,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update movie");

      alert("Movie updated successfully!");
      router.push("/admin/movies"); // redirect back to movies list
    } catch (err) {
      console.error(err);
      alert("Error updating movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1  mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Movie</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-2 rounded-lg space-y-4 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800">🎬 Edit Movie</h2>

        {/* Title */}
        <label className="font-semibold text-black">Movie Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Movie Title"
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
          required
        />

        {/* Plot */}
        <label className="font-semibold text-black">Movie Plot</label>
        <textarea
          name="plot"
          value={form.plot}
          placeholder="Movie Plot"
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
          required
        />

        {/* Link, Rating, Released */}
        <label className="font-semibold text-black">Link</label>
        <input
          type="text"
          name="link"
          value={form.link}
          placeholder="Movie Link"
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
        />

        <div className="flex gap-1">
          <div>
            <label className="font-semibold text-black">Rating</label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              placeholder="Movie Rating"
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
            />
          </div>
          <div>
            <label className="font-semibold text-black">Released Year</label>
            <input
              type="number"
              name="released"
              value={form.released}
              placeholder="Released Year"
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
            />
          </div>
        </div>

        {/* Type & Language */}
        <div className="flex gap-1">
          <div>
            <label className="font-semibold text-black">Film Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
              required
            >
              <option value="">Select Type</option>
              {typeEnum.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-black">Language</label>
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
              required
            >
              <option value="">Select Language</option>
              {languageEnum.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Genres */}
        <div className="space-y-1">
          <label className="font-semibold text-black">Genres</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.genres.map((g) => (
              <span
                key={g}
                className="bg-red-500 text-white px-2 rounded flex items-center gap-1 text-xs"
              >
                {g}
                <button
                  type="button"
                  onClick={() => handleRemoveGenre(g)}
                  className="font-bold text-sm"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <select
            onChange={(e) => {
              handleAddGenre(e.target.value);
              e.target.value = "";
            }}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
          >
            <option value="">Select genre to add</option>
            {genresEnum.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional seasons/episodes */}
        {(form.type === "series" || form.type === "reality") && (
          <div className="space-y-2">
            <label className="font-semibold text-black">Season Number</label>
            <input
              type="number"
              name="seasonNumber"
              value={form.seasonNumber}
              placeholder="Season Number"
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
            />
            <label className="font-semibold text-black">Episode Number</label>
            <input
              type="number"
              name="episodeNumber"
              value={form.episodeNumber}
              placeholder="Episode Number"
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
            />
          </div>
        )}

        {/* Image */}
        <label className="font-semibold text-black">Movie Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
        />
        {/* HImage */}
        <label className="font-semibold text-black">H-Movie Image</label>
        <input
          type="file"
          name="himage"
          onChange={handleChange}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue text-black"
        />
        <div className="flex space-x-3">
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>

            {preview ? (
              // If user picked a new file
              <img
                src={preview}
                alt="Preview"
                className="w-22 h-30 object-fill rounded-xl shadow-md border"
              />
            ) : form.image && typeof form.image === "string" ? (
              // If editing and existing image URL is present
              <img
                src={`${API_BASE}/${form.image}`} // adjust if stored differently
                alt="Existing"
                className="w-48 h-64 object-cover rounded-xl shadow-md border"
              />
            ) : (
              <p className="text-gray-400">No image selected</p>
            )}
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">H-Preview:</p>

            {HPreview ? (
              // If user picked a new file
              <img
                src={HPreview}
                alt="Preview"
                className="w-48 h-30 object-fill rounded-sm shadow-md border"
              />
            ) : form.himage && typeof form.himage === "string" ? (
              // If editing and existing image URL is present
              <img
                src={`${API_BASE}/${form.himage}`} // adjust if stored differently
                alt="Existing"
                className="w-64 h-64 object-cover rounded-xl shadow-md border"
              />
            ) : (
              <p className="text-gray-400">No image selected</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
