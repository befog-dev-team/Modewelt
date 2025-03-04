"use client"

import Heatmap from "@/app/ui/dashboard/security/Heatmap";
import TableComponent from "@/app/ui/dashboard/security/TableComponent";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function SecurityWrapper() {
  const { data: activities = [], isLoading: isLoadingAdminActivities, error: errorAdminActivities } = useQuery({
    queryKey: ["adminActivities"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/security-logs/heatmap");
      return response.data.activities;
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminActivities", "table"],
    queryFn: async () => {
      const response = await axios.get("/api/admin/security-logs/admin-activity");
      return response.data; // Ensure data part is returned
    },
  });

  // Loading state
  if (isLoadingAdminActivities || isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="text-[#f26744] size-10 animate-spin" />
      </div>
    );
  }

  // Error state
  if (errorAdminActivities || error) {
    return (
      <div className="h-screen flex justify-center items-center bg-red-100 text-red-700 p-4 rounded-md">
        <p><strong>Error:</strong> Failed to fetch admin activities</p>
      </div>
    );
  }

  return (
    <div>
      <div className="#f3f2f7 rounded-lg shadow-sm p-4 sm:p-6">
        {/* Heatmap Section */}
        <Heatmap activities={activities} />
        {/* Table Section */}
        <TableComponent data={data} />
      </div>
    </div>
  )
}
