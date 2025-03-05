"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import Card from "./card";
import { FaCheck } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

export default function Dashboard({ reportStats, reportPosts }) {
  const queryClient = useQueryClient();

  // Mutation to approve (remove) report optimistically
  const approveMutation = useMutation({
    mutationFn: async (reportId) => {
      await ky.patch(`/api/admin/content-moderation/report/posts/${reportId}`);
    },
    onMutate: async (reportId) => {
      await queryClient.cancelQueries(["reported-posts"]); // Cancel any ongoing queries

      const previousData = queryClient.getQueryData(["reported-posts"]); // Save current state

      queryClient.setQueryData(["reported-posts"], (oldData) =>
        oldData ? oldData.filter((report) => report.id !== reportId) : []
      );

      return { previousData }; // Return snapshot for rollback
    },
    onError: (err, reportId, context) => {
      queryClient.setQueryData(["reported-posts"], context.previousData); // Rollback on error
      toast.error("Failed to approve report.");
    },
    onSuccess: () => {
      toast.success("Report approved successfully!");
    },
  });

  // Mutation to delete post and report optimistically
  const deleteMutation = useMutation({
    mutationFn: async (reportId) => {
      await ky.delete(`/api/admin/content-moderation/report/posts/${reportId}`);
    },
    onMutate: async (reportId) => {
      await queryClient.cancelQueries(["reported-posts"]); // Cancel any ongoing queries

      const previousData = queryClient.getQueryData(["reported-posts"]); // Save current state

      queryClient.setQueryData(["reported-posts"], (oldData) =>
        oldData ? oldData.filter((report) => report.id !== reportId) : []
      );

      return { previousData }; // Return snapshot for rollback
    },
    onError: (err, reportId, context) => {
      queryClient.setQueryData(["reported-posts"], context.previousData); // Rollback on error
      toast.error("Failed to delete report.");
    },
    onSuccess: () => {
      toast.success("Post and report deleted successfully!");
    },
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Stats Section */}
      <Card reportStats={reportStats} />

      {/* Posts Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-semibold text-xl text-gray-800">Reported Posts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead>
              <tr>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">User Name</th>
                <th className="p-4 font-medium">Report Date</th>
                <th className="p-4 font-medium">Reason</th>
                <th className="p-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {reportPosts.length > 0 ? (
                reportPosts.map((report) => (
                  <tr key={report.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                      <span className="font-medium text-gray-800">{report.user.username}</span>
                    </td>
                    <td className="p-4">@{report.user.username}</td>
                    <td className="p-4">{new Date(report.createdAt).toLocaleString()}</td>
                    <td className="p-4">{report.reason}</td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          title="Approve Action"
                          onClick={() => approveMutation.mutate(report.id)}
                          disabled={approveMutation.isLoading}
                          className="bg-green-200 text-green-800 border-2 border-green-800 p-2 rounded-lg transition-all hover:bg-green-800 hover:text-white disabled:opacity-50"
                        >
                          {approveMutation.isLoading ?
                            <Loader2 className="mx-auto w-6 h-5 animate-spin" />
                            : <FaCheck />
                          }
                        </button>
                        <button
                          title="Delete Action"
                          onClick={() => deleteMutation.mutate(report.id)}
                          disabled={deleteMutation.isLoading}
                          className="bg-red-100 text-red-800 border-2 border-red-800 p-2 rounded-lg transition-all hover:bg-red-800 hover:text-white disabled:opacity-50"
                        >
                          {deleteMutation.isLoading ?
                            <Loader2 className="mx-auto w-6 h-5 animate-spin" />
                            : <FaCheck />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 p-4">
                    No reported posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
