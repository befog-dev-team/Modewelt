export default function UserDetails({ users = [] }) {
  console.log("users", users);

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-yellow-100 text-yellow-700",
    Deleted: "bg-red-100 text-red-700",
  };

  const getStatus = (user) => {
    if (user.isDeleted) return "Deleted";
    return "Active"; // Assuming all others are active
  };

  return (
    <div className="mt-6 bg-white shadow-sm rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">User Details</h2>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Location</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Account Activated</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Phone</th>
              <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Account Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users
                .filter(user => user.lastLogin !== null) // 🔹 Exclude inactive users
                .map((user, index) => {
                  const status = getStatus(user); // Determine status
                  return (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4 text-sm text-gray-700 flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                        {user.displayName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.location || "N/A"}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {new Date(user.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.phone || "N/A"}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-700"}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
