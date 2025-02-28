'use client';

export default function RecentJob({ data }) {
  return (
    <div className='bg-white rounded-xl shadow-md p-4'>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Jobs</h2>
      <div className="max-h-[300px] overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          {data.map((job) => (
            <JobCard
              key={job.id}
              title={job.jobTitle}
              company={job.company}
              location={job.location}
              jobType={job.jobType}
            // icon={job.companyPic} // Uncomment if you want to use companyPic as an icon
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function JobCard({ title, company, location, jobType, icon }) {
  return (
    <div className="flex items-center gap-4">
      {/* Uncomment if you want to use companyPic as an icon */}
      {/* <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full">
        {icon && <img src={icon} alt={company} className="rounded-full" />}
      </div> */}
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-500">{company}</p>
        <p className="text-xs text-gray-500">{location}</p>
        <p className="text-xs text-gray-500">{jobType}</p>
      </div>
    </div>
  );
}