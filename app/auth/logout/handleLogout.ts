import { axiosInstance } from "@/lib/api/axios";
import { useUserStore } from "@/lib/store/user";

export const handleLogout = async () => {
  try {
    await axiosInstance.post("/auth/logout");

    useUserStore.getState().logout();
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("user-storage");

    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
