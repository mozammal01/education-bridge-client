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

export const organizerService = {
  getStats: () => getRequest("/organizer/stats"),
  getInstitutions: () => getRequest("/organizer/institutions"),
  getTutors: () => getRequest("/organizer/tutors"),
  getGroups: () => getRequest("/organizer/groups"),
};
