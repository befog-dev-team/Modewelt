import React from 'react';

const EventsList = () => {
  const events = [
    { id: 1, name: 'Event Name', date: '21st Feb 2025' },
    { id: 2, name: 'Event Name', date: '21st Feb 2025' },
    { id: 3, name: 'Event Name', date: '21st Feb 2025' },
    { id: 4, name: 'Event Name', date: '21st Feb 2025' },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-[#fff5fb] p-8 rounded-lg shadow-lg mt-6">
      <h2 className="text-base font-bold mb-6 text-gray-800">Current Events</h2>

      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className={`pb-4 border-b border-gray-200 last:border-b-0 ${event.bgClass || ''}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-base font-medium text-gray-900">{event.name}</h3>
              <span className="text-gray-600 text-sm">Start on {event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
