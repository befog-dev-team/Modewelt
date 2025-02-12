import Navbar from '../../Navbar'
// import Footer from '../../Footer'
import UserProfile from '../UserProfile'
import ProfileDashboard from '../ProfileDashboard'
import VisitorSection from '../VisitorSection'
// import CourseSection from '../CourseSection'
import ProfileTabs from '../ProfileTabs'


export default function UserProfileWrappper({ user, loggedinUserId, totalLikesReceived, totalCommentsReceived, visitors }) {
    const followerInfo = {
        followers: user._count.followers, // Total followers
        isFollowedByUser: user.followers.some( // Check if the user is followed by the logged in user
            ({ followerId }) => followerId === loggedinUserId // Check if the followerId is the same as the logged in user's id
        ),
        following: 0, // Total following
        followingId: "", // Following id
        sentRequests: [], // Sent requests
        hasPendingRequest: false // Check if the user has a pending request
    };

    return (
        <div>
            <Navbar />
            <div className="h-auto w-full p-4">
                {/* Main content area */}
                <div className="flex flex-col lg:flex-row justify-center mt-12 space-y-10 lg:space-y-0 lg:space-x-14 px-4 lg:px-8">
                    {/* Top section with image and info */}
                    <div className="flex flex-col">
                        {/* User Profile */}
                        <UserProfile user={user} followerInfo={followerInfo} loggedinUserId={loggedinUserId} />

                        {/* Profile Tabs */}
                        <ProfileTabs user={user} loggedinUserId={loggedinUserId} />
                    </div>

                    {/* Sidebar Area */}
                    <div className="w-full lg:w-[290px] hidden lg:block">
                        {/* ProfileDashboard Section */}
                        <ProfileDashboard
                            user={user}
                            loggedinUserId={loggedinUserId}
                            totalLikesReceived={totalLikesReceived}
                            totalCommentsReceived={totalCommentsReceived}
                        />

                        {/* Visitor Section */}
                        <VisitorSection visitors={visitors } user={user} />

                        {/* Course Section */}
                        {/* <CourseSection /> */}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
