"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

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
}

export default function MoviesAdminPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const genresEnum = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Fantasy",
    "Family",
    "Historical",
    "Horror",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
  ];
  const languageEnum = ["English", "French", "Hindi", "others"];
  const typeEnum = ["Movie", "Series", "Reality"];

  const [movies, setMovies] = useState<Movie[]>([]);
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
    seasonNumber: "",
    episodeNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies
  const fetchMovies = async (pageNumber = 1) => {
    try {
      setFetching(true);
      const res = await fetch(
        `${API_BASE}/api/v1/movie?limit=20&page=${pageNumber}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        setMovies(data.movies || []);
        setPage(data.page || 1);
        setTotalPages(data.totalPages || 1);
      } else {
        setMovies([]);
        console.error("Failed to fetch movies:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setFetching(false);
    }
  };

  // Pagination controls
  const handlePrevPage = () => {
    if (page > 1) fetchMovies(page - 1);
  };
  const handleNextPage = () => {
    if (page < totalPages) fetchMovies(page + 1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchMovies(1);
  }, []);

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value, files } = e.target;
  //   if (files && files.length > 0) setForm({ ...form, [name]: files[0] });
  //   else setForm({ ...form, [name]: value });
  // };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      const file = e.target.files[0];
      setForm({ ...form, [name]: file });

      // ✅ Set preview from the file
      setPreview(URL.createObjectURL(file));
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

  const resetForm = () => {
    setForm({
      title: "",
      plot: "",
      type: "",
      language: "",
      genres: [],
      link: "",
      rating: "",
      released: "",
      image: null,
      seasonNumber: "",
      episodeNumber: "",
    });
    setPreview(null);
    setEditingId(null);
  };

  // Create or update movie

  const handleCreateOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("plot", form.plot);
    fd.append("type", form.type);
    fd.append("language", form.language);
    fd.append("genres", JSON.stringify(form.genres));
    if (form.link) fd.append("link", form.link);
    if (form.rating) fd.append("rating", form.rating.toString());
    if (form.released) fd.append("released", form.released.toString());

    if (form.type === "series" || form.type === "reality") {
      const seasons = [
        {
          seasonNumber: Number(form.seasonNumber),
          episodes: [{ episodeNumber: Number(form.episodeNumber) }],
        },
      ];
      fd.append("seasons", JSON.stringify(seasons));
    }

    if (form.image) fd.append("img", form.image);

    try {
      setLoading(true);
      const url = editingId
        ? `${API_BASE}/api/v1/movie/${editingId}`
        : `${API_BASE}/api/v1/movie`;
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: fd,
        credentials: "include", // ✅ send cookies for auth
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() }; // fallback if not JSON
      }

      if (!res.ok) {
        // Proper error handling
        console.error("Failed to save movie:", data);
        alert(`Failed to save movie: ${data.message || "Unknown error"}`);
        return;
      }

      alert(`Movie ${editingId ? "updated" : "created"} successfully!`);
      resetForm();
      fetchMovies();
    } catch (error: any) {
      console.error("Error saving movie:", error);
      alert("Error saving movie: " + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingId(movie._id);
    setForm({
      title: movie.title,
      plot: movie.plot,
      genres: movie.genres,
      type: movie.type,
      language: movie.language || "",
      link: movie.link || "",
      rating: movie.rating?.toString() || "",
      released: movie.released?.toString() || "",
      image: null, // reset file input; user can upload new image
      seasonNumber: movie.seasons?.[0]?.seasonNumber.toString() || "",
      episodeNumber:
        movie.seasons?.[0]?.episodes?.[0]?.episodeNumber.toString() || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this movie?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/v1/movie/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) fetchMovies();
      else console.error("Failed to delete movie:", res.statusText);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First try verifying
        let res = await fetch(`${API_BASE}/api/v1/auth/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          // Try refreshing
          const refreshRes = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
            method: "GET",
            credentials: "include",
          });

          if (!refreshRes.ok) {
            // refresh failed → go to login
            window.location.href = "/login";
            return;
          }

          // retry verify after refresh
          res = await fetch(`${API_BASE}/api/v1/auth/verify`, {
            method: "GET",
            credentials: "include",
          });

          if (!res.ok) {
            window.location.href = "/login";
            return;
          }
        }

        const data = await res.json();
        console.log("Authenticated user:", data);

        // Later when roles exist:
        // if (data.role !== "admin") {
        //   alert("You do not have permission to access this page.");
        //   window.location.href = "/";
        // }
      } catch (error) {
        console.error("Error checking auth:", error);
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (form.type === "movie") {
      setForm((f) => ({ ...f, seasonNumber: "", episodeNumber: "" }));
    }
  }, [form.type]);

  return (
    <div className="space-y-10 p-8 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleCreateOrEdit}
        className="bg-white shadow-md p-6 rounded-lg space-y-4 max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          🎬 {editingId ? "Edit Movie" : "Add New Movie"}
        </h2>

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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : editingId ? "Update Movie" : "Save Movie"}
        </button>
      </form>

      {/* Movie List */}
      <div className="mt-10 max-w-3xl mx-auto space-y-4">
        {fetching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-xl overflow-hidden shadow"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gray-300"></div>
                <div className="p-3 space-y-2">
                  {/* Title placeholder */}
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                  {/* Genres placeholder */}
                  <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
                  {/* Rating placeholder */}
                  <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie._id}
              className="flex gap-4 bg-white p-4 rounded shadow"
            >
              {/* Movie Image */}
              <div className="w-24 h-32 flex-shrink-0 relative">
                <Image
                  src={
                    movie.img ||
                    "https://res.cloudinary.com/dzhhpr7f1/image/upload/v1755246293/no-image-placeholder_arffdk.png"
                  }
                  alt={movie.title}
                  fill
                  className="w-full h-full object-cover rounded"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Movie Details */}
              <div className="flex-1">
                <p className="font-bold text-lg text-black">{movie.title}</p>
                <p className="text-sm line-clamp-4 md:line-clamp-none text-gray-700">
                  {movie.plot}
                </p>
                <p className="text-xs text-gray-500">
                  Type: {movie.type} | Language: {movie.language || "N/A"} |
                  Genres: {movie.genres.join(", ")} | Rating: {movie.rating}/10
                  | Released: {movie.released}
                </p>
                {movie.link && (
                  <p className="text-xs text-white  p-2 bg-blue-600 rounded-lg text-center w-fit">
                    <a href={movie.link} target="_blank" rel="noreferrer">
                      Download Link
                    </a>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(movie)}
                  className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
