import { formatNumber } from '@/lib/utils'
// import Link from 'next/link'

export default function ProfileDashboard({ user, totalLikesReceived, totalCommentsReceived }) {
    return (
        <div>
            <div className="min-h-[360px] h-auto pb-4 bg-[#ffffff] dark:bg-gray-900 shadow-lg border dark:border-gray-800 transition-colors">
                <div className="flex justify-between max-w-[230px] w-full ml-5 mt-4">
                    <span className="font-semibold dark:text-gray-200">Your Dashboard</span>
                    {/* <Link href="/stats">
                        <span
                            className="text-[#fa43b4] rounded-md hover:bg-[#fa43b4] hover:text-white transition-all duration-200 px-2 py-1 font-semibold cursor-pointer"
                        >
                            Go To Stats
                        </span>
                    </Link> */}
                </div>
                <hr className="max-w-[230px] w-full mx-auto mt-4 border-gray-200 dark:border-gray-800" />
                <div className="flex flex-col md:flex-row md:flex-wrap gap-6 m-4 mt-4">
                    <div className="flex flex-col w-full md:max-w-[200px] h-auto mb-2">
                        <span className="text-[#fc3fb4] rounded-md font-arial font-bold text-[36px] md:text-[45px] leading-tight md:leading-[51.75px] text-left">
                            {formatNumber(user.totalProfileViews)}
                        </span>
                        <span className="text-[14px] md:text-[16px] text-gray-700 dark:text-gray-400">
                            Total Views
                        </span>
                    </div>

                    <div className="flex flex-col w-full md:max-w-[200px] h-auto mb-2">
                        <span className="text-[#fc3fb4] rounded-md font-arial font-bold text-[36px] md:text-[45px] leading-tight md:leading-[51.75px] text-left">
                            {formatNumber(totalLikesReceived)}
                        </span>
                        <span className="text-[14px] md:text-[16px] text-gray-700 dark:text-gray-400">
                            Total Likes 
                        </span>
                    </div>

                    <div className="flex flex-col w-full md:max-w-[200px] h-auto mb-2">
                        <span className="text-[#fc3fb4] rounded-md font-arial font-bold text-[36px] md:text-[45px] leading-tight md:leading-[51.75px] text-left">
                            {formatNumber(totalCommentsReceived)}
                        </span>
                        <span className="text-[14px] md:text-[16px] text-gray-700 dark:text-gray-400">
                            Total Comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
