import { useRouter } from "next/navigation";

export async function fetchWithRefresh(
  url: string,
  options: RequestInit = {},
  router?: ReturnType<typeof import("next/navigation").useRouter>
) {
  const baseOptions: RequestInit = {
    ...options,
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  let response = await fetch(url, baseOptions);

  if (response.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
      {
        method: "GET",
        credentials: "include" as RequestCredentials,
      }
    );

    if (refreshRes.ok) {
      response = await fetch(url, baseOptions);
    } else {
      if (router) router.push("/login");
      throw new Error("Unauthorized, please login again");
    }
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }

  return response.json();
}
