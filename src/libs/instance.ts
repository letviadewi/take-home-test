import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const buildURL = (url: string) => {
  if (url.startsWith("http")) return url;
  return baseURL + url;
};

export async function Fetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const updatedOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (typeof window === "undefined") {
    updatedOptions.headers = {
      ...updatedOptions.headers,
      "x-ssr-request": "true",
    };
  }

  try {
    const res = await fetch(buildURL(url), updatedOptions);

    if (!res.ok) {
      const errorBody = await safeErrorMessage(res);
      toast.error(`Error ${res.status}: ${errorBody.message}`);
      throw new Error(errorBody.message || "Request error");
    }

    return res.json() as Promise<T>;
  } catch (err) {
    throw err;
  }
}

async function safeErrorMessage(res: Response) {
  try {
    return await res.json();
  } catch {
    return { message: "Unknown error" };
  }
}

function handleError(status: number, errorBody: any) {
  const message = errorBody?.message || "Terjadi kesalahan";

  if (status === 401) {
    toast.error("Unauthorized: Sesi kamu mungkin sudah habis.");
  } else if (status === 403) {
    toast.error("Forbidden: Kamu tidak punya akses.");
  } else if (status >= 500) {
    toast.error(`Server error (${status}): ${message}`);
  } else {
    toast.error(`Error ${status}: ${message}`);
  }
}
