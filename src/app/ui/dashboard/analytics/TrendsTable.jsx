'use client';

export default function TrendsTable() {
  const trends = [
    { id: 1, name: 'lorem', description: 'lorem the ghtou asdfiadsuj', view: 'View', color: 'text-green-500' },
    { id: 2, name: 'lorem', description: 'lorem the ghtou asdfiadsuj', view: 'view', color: 'text-green-500' },
    { id: 3, name: 'lorem', description: 'lorem the ghtou asdfiadsuj', view: 'View', color: 'text-red-500' },
    { id: 4, name: 'lorem', description: 'lorem the ghtou asdfiadsuj', view: 'View', color: 'text-green-500' },
    { id: 5, name: 'lorem', description: 'lorem the ghtou asdfiadsuj', view: 'View', color: 'text-red-500' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-2xl shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full mt-4 text-left border-collapse">
          <thead>
            <tr className="text-gray-600 text-sm border-b">
              <th className="p-2">SL No</th>
              <th className="p-2">Trend Name</th>
              <th className="p-2">Trends Description</th>
              <th className="p-2">View</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend, index) => (
              <tr key={trend.id} className="border-b text-gray-700 text-sm">
                <td className="p-2">{String(index + 1).padStart(2, '0')}.</td>
                <td className="p-2 font-medium">{trend.name}</td>
                <td className="p-2">{trend.description}</td>
                <td className={`p-2 font-medium ${trend.color}`}>{trend.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
