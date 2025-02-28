import React from 'react'

export default function RecentJob() {
  return (
      <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Jobs</h2>
          <div className="space-y-3">
            <JobCard
              title="Fashion Designer"
              company="Design Co."
              icon="👗"
            />
            <JobCard
              title="Software Engineer"
              company="Tech Solutions"
              icon="💻"
            />
            <JobCard
              title="Marketing Manager"
              company="Advertise Inc."
              icon="📈"
            />
          </div>
        </div>
  )
}

function JobCard({ title, company, icon }) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-gray-500">{company}</p>
        </div>
      </div>
    );
  }