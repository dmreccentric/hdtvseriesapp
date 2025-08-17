"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithRefresh } from "../../../utils/fetchWIthRefresh";
import Link from "next/link";

const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

interface Roles {
  User?: number;
  Editor?: number;
  Admin?: number;
}

interface User {
  _id: string;
  username: string;
  email?: string;
  roles: Roles;
}

export default function EditUserPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<Roles>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = window.location.pathname.split("/").pop();
        const data = await fetchWithRefresh(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${id}`,
          {},
          router
        );
        setUser(data);
        setUsername(data.username);
        setEmail(data.email || "");
        setRoles(data.roles);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchUser();
  }, [router]);

  const handleToggleRole = (role: keyof Roles) => {
    setRoles((prev) => {
      const newRoles = { ...prev };
      if (newRoles[role]) delete newRoles[role];
      else newRoles[role] = ROLES_LIST[role];
      return newRoles;
    });
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      await fetchWithRefresh(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${user._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ username, email, roles }),
        },
        router
      );
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!user) return <p className="p-4">Loading user...</p>;

  return (
    <div className="p-4">
      <Link
        href={`/admin/users`}
        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back
      </Link>
      <h1 className="text-xl font-bold mt-10 mb-4 text-black">Edit User</h1>

      <label className="block mt-2 text-black">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-1 mt-1 w-full"
        />
      </label>

      <label className="block mt-2 text-black">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 mt-1 w-full"
        />
      </label>

      <div className="mt-4 text-black">
        <p className="font-semibold mb-2">Roles:</p>
        <div className="flex gap-2">
          {Object.keys(ROLES_LIST).map((role) => {
            const isActive = !!roles[role as keyof Roles];
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleToggleRole(role as keyof Roles)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
