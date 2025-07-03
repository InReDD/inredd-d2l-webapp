import { API } from "@/helpers/api";

export const getDashboardStats = async () => {
    try {
        return await API.get({ path: "/dashboard/stats" });
    } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        throw err;
    }
};