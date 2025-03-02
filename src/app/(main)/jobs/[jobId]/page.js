import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { cache, Suspense } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import Navbar from "@/components/Navbar";
import FollowButton from "@/components/FollowButton";

// Fetch job details and applicant stats
const getJob = cache(async (jobId, loggedInUserId) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      user: {
        include: {
          _count: { select: { followers: true } },
          followers: { where: { followerId: loggedInUserId } },
        },
      },
      applications: {
        include: {
          user: true, // Include applicant details
        },
      },
      _count: {
        select: {
          applications: true, // Count of applications
        },
      },
    },
  });
  if (!job) notFound();
  return job;
});

// Generate metadata for the job page
export async function generateMetadata(props) {
  const { jobId } = props.params;
  const { user } = await validateRequest();
  if (!user) redirect("/auth");
  const job = await getJob(jobId, user.id);
  return { title: `${job.jobTitle} at ${job.company}`, description: job.description.slice(0, 160) };
}

// Main Job Page Component
export default async function Page(props) {
  const { jobId } = props.params;
  const { user } = await validateRequest();
  if (!user) {
    return <p className="text-red-500 text-center mt-10">You&apos;re not authorized to view this page.</p>;
  }
  const job = await getJob(jobId, user.id);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto flex flex-col lg:flex-row gap-6 p-6">
        {/* Job Details Section */}
        <div className="w-full lg:w-3/5">
          <JobDetails job={job} />
        </div>
        {/* User Info Sidebar */}
        <div className="w-full lg:w-2/5">
          <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
            <UserInfoSidebar user={job.user} loggedInUser={user} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// UserInfoSidebar Component
async function UserInfoSidebar({ user, loggedInUser }) {
  if (!loggedInUser) return null;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posted by</h2>
      <Link href={`/profile/${user.username}`} className="flex items-center gap-4">
        <UserAvatar avatarUrl={user.avatarUrl} className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-lg font-bold text-gray-900 hover:underline">{user.displayName}</p>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </Link>
      <p className="mt-4 text-gray-700 text-sm whitespace-pre-line">{user.bio}</p>
      {user.id !== loggedInUser.id && (
        <div className="mt-4">
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count?.followers || 0,
              isFollowedByUser: user.followers?.some(({ followerId }) => followerId === loggedInUser.id) || false,
            }}
          />
        </div>
      )}
    </div>
  );
}

function JobDetails({ job }) {
  if (!job) {
    return <div className="text-center py-10">Job not found.</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-[85vh] overflow-y-auto no-scrollbar">
      {/* Job Title and Company */}
      <div className="border-b pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.jobTitle}</h1>
          <p className="text-lg text-gray-600 mt-2">{job.company}</p>
          <p className="text-sm text-gray-500 mt-1">{job.location}</p>
        </div>
        <div>
          <Link href={`/jobDetails/${job.id}`} prefetch={true}>
            <button className="w-[120px] h-[36px] flex justify-center items-center rounded-[4px] uppercase bg-[#f26744] text-white text-[14px] font-semibold hover:text-black hover:bg-transparent hover:outline transition duration-300 ease-in-out">
              <span className="font-[Arial] text-[14px] leading-[16px]">
                More Info
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-6 space-y-6">
        {/* Job Description */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{job.requirements}</p>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Benefits</h2>
          <p className="mt-2 text-gray-700 whitespace-pre-line">{job.benefits}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Skills Required</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Salary</h2>
          <p className="mt-2 text-gray-700">
            {job.salaryAmount} {job.salaryCurrency} ({job.salaryType})
          </p>
        </div>

        {/* Job Type and Workplace Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Job Type</h2>
            <p className="mt-2 text-gray-700">{job.jobType}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Workplace Type</h2>
            <p className="mt-2 text-gray-700">{job.workplaceType}</p>
          </div>
        </div>

        {/* Expiration Date */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Expiration Date</h2>
          <p className="mt-2 text-gray-700">{job.expirationDate}</p>
        </div>

        {/* Applicant Statistics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Applicant Statistics</h2>
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Total Applicants: <span className="font-bold">{job._count.applications}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}