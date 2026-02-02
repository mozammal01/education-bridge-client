export const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "https://education-bridge-server.vercel.app").replace(/\/+$/, "");

async function request<T>(endpoint: string, options?: RequestInit): Promise<{ data?: T; message?: string }> {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new Error("Network error. Please check your connection.");
  }

  let data;
  try {
    data = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }
    return { data: undefined, message: "Success" };
  }

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),

  upload: async <T>(endpoint: string, formData: FormData): Promise<{ data?: T; message?: string }> => {
    let res: Response;

    try {
      res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    } catch {
      throw new Error("Network error. Please check your connection.");
    }

    let data;
    try {
      data = await res.json();
    } catch {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }
      return { data: undefined, message: "Upload successful" };
    }

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  },
};
