"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Roles {
  User?: number;
  Editor?: number;
  Admin?: number;
}

interface User {
  _id: string;
  username: string;
  email: string;
  roles: Roles;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v1/user`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_BASE]);

  if (loading)
    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6 text-black">👥 Users</h1>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex items-center justify-between p-4 border rounded-md"
          >
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-3 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">👥 Users</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-normal text-black">
                  Username: <span className="font-light">{user.username}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Email:<span className="font-light">{user.email}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Roles: {Object.keys(user.roles).join(", ")}
                </p>
              </div>

              <Link
                href={`/admin/users/${user._id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
