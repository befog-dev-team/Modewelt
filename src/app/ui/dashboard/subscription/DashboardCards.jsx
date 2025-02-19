import { Clipboard } from "lucide-react";

const dataCards = [
  { title: "New Subscription", count: 2034, color: "bg-purple-400" },
  { title: "New Trials", count: 2034, color: "bg-purple-400" },
  { title: "Reactivation", count: 2034, color: "bg-purple-400" },
];

export default function DashboardCards() {
  return (
    <div className="p-4 flex flex-wrap gap-4">
      {dataCards.map((card, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-center justify-between w-full max-w-md rounded-2xl shadow-md p-6 bg-white">
          <div className="flex flex-col justify-between h-full">
            <h2 className="text-lg font-semibold text-purple-600 mb-2">{card.title}</h2>
            <div className="flex items-center mb-2">
              <Clipboard className="text-black mr-2" size={24} />
              <span className="text-4xl font-bold">{card.count}</span>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-1 h-16 w-1/2">
            {[1, 2, 3, 4, 5, 6].map((bar, idx) => (
              <div
                key={idx}
                className={`w-2 rounded-md ${
                  idx === 2 ? `${card.color}` : "bg-gray-300"
                } h-${idx % 2 === 0 ? 6 : 10}`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
