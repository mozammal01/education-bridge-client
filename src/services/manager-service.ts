const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getRequest = async (endpoint: string) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    }
  });
  return response.json();
};

const patchRequest = async (endpoint: string, data: any) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

const postRequest = async (endpoint: string, data: any) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const managerService = {
  getStats: () => getRequest("/manager/stats"),
  getBlogs: () => getRequest("/manager/blogs"),
  createBlog: (data: any) => postRequest("/manager/blogs", data),
  getFlags: () => getRequest("/manager/flags"),
  getReports: () => getRequest("/manager/reports"),
  getPendingReviews: () => getRequest("/manager/reviews/pending"),
  updateReviewStatus: (id: string, status: string) => patchRequest(`/manager/reviews/${id}`, { status })
};
