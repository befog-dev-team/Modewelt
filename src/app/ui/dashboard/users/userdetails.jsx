export default function UserDetails() {
    const users = [
      {
        name: "Aditya Kumar",
        location: "Lucknow, UP 226021",
        activated: "12.09.2019 - 12:53 PM",
        email: "adityakannujiya.ui@gmail.com",
        phone: "+91 7459068576",
        status: "Active",
      },
      {
        name: "User Name #2",
        location: "6096 Marjolaine Landing",
        activated: "12.09.2019 - 12:53 PM",
        email: "abc@gmail.com",
        phone: "1234567890",
        status: "Pending",
      },
      {
        name: "User Name #3",
        location: "6096 Marjolaine Landing",
        activated: "12.09.2019 - 12:53 PM",
        email: "abc@gmail.com",
        phone: "1234567890",
        status: "Delete account",
      },
      {
        name: "User Name",
        location: "6096 Marjolaine Landing",
        activated: "12.09.2019 - 12:53 PM",
        email: "abc@gmail.com",
        phone: "1234567890",
        status: "Active",
      },
    ];
  
    const statusStyles = {
      Active: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      "Delete account": "bg-red-100 text-red-700",
    };
  
    return (
      <div className="min-h-fit bg-gray-50 p-4 sm:p-6">
          <div className="mt-6 bg-white shadow-sm rounded-lg p-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">User Details</h2>
              <select className="mt-3 sm:mt-0 text-gray-600 bg-gray-100 p-2 rounded border">
                <option>October</option>
                <option>September</option>
                <option>August</option>
              </select>
            </div>
  
            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Product Name
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Location
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Account Activate
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Email
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Phone
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Account Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4 text-sm text-gray-700 flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                        {user.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.location}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.activated}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.phone}</td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            statusStyles[user.status]
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
      </div>
    );
  }
  