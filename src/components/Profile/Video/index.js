"use client";
import { useState } from 'react';
import Image from "next/image";

export default function VideoGallery() {
    const [activeVideo, setActiveVideo] = useState(null);
    const [showAllVideos, setShowAllVideos] = useState(false); // State to control showing all videos

    // Video data
    const videos = [
        {
            id: 1,
            title: "Video 1",
            description: "A description for video 1",
            thumbnail: "/assets/profile/a.jpg",
            videoSrc: "/assets/profile/video.mp4",
        },
        {
            id: 2,
            title: "Video 2",
            description: "A description for video 2",
            thumbnail: "/assets/profile/a.jpg",
            videoSrc: "/assets/profile/video.mp4",
        },
        {
            id: 3,
            title: "Video 3",
            description: "A description for video 3",
            thumbnail: "/assets/profile/a.jpg",
            videoSrc: "/assets/profile/video.mp4",
        },
        {
            id: 4,
            title: "Video 4",
            description: "A description for video 4",
            thumbnail: "/assets/profile/a.jpg",
            videoSrc: "/assets/profile/video.mp4",
        },
        {
            id: 5,
            title: "Video 5",
            description: "A description for video 5",
            thumbnail: "/assets/profile/a.jpg",
            videoSrc: "/assets/profile/video.mp4",
        },
        {
            id: 6,
            title: "Video 6",
            description: "A description for video 6",
            thumbnail: "/assets/profile/a.jpg",
            videoSrc: "/assets/profile/video.mp4",
        },
        // Add more videos as necessary
    ];

    // Handle thumbnail click to start video
    const handleVideoClick = (video) => {
        setActiveVideo(video);
    };

    // Handle closing the video player
    const handleCloseVideo = () => {
        setActiveVideo(null);
    };

    // Toggle the visibility of additional videos
    const toggleVideos = () => {
        setShowAllVideos((prevState) => !prevState);
    };

    return (
        (<div className="p-4 max-w-7xl mx-auto">
            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.slice(0, showAllVideos ? videos.length : 3).map((video) => (
                    <div key={video.id} className="relative group cursor-pointer">
                        {activeVideo?.id === video.id ? (
                            // Video player when clicked
                            (<div className="relative w-full h-[180px] md:h-[205px] bg-black rounded-lg overflow-hidden">
                                <video
                                    width="100%"
                                    height="100%"
                                    controls
                                    className="object-cover"
                                    autoPlay
                                    onEnded={handleCloseVideo} // Close video when finished
                                >
                                    <source src={video.videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs rounded-tl-lg rounded-br-lg">
                                    {video.title}
                                </div>
                            </div>)
                        ) : (
                            // Thumbnail display when not clicked
                            (<div
                                onClick={() => handleVideoClick(video)}
                                className="relative w-full h-[180px] md:h-[205px] bg-black rounded-lg overflow-hidden group-hover:opacity-80 transition-all duration-300"
                            >
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    width={500}
                                    height={300}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white text-xs rounded-b-lg">
                                    <p>{video.title}</p>
                                    <p className="text-[10px]">{video.description}</p>
                                </div>
                            </div>)
                        )}
                    </div>
                ))}
            </div>
            {/* Toggle Button for SEE ALL / SEE LESS */}
            <div className="text-center mt-4">
                <button
                    onClick={toggleVideos}
                    className="w-full text-[#a35284] font-medium text-sm px-6 py-3 rounded transition-all duration-300 hover:bg-[#a35284] hover:text-white focus:outline-none"
                >
                    {showAllVideos ? 'SEE LESS VIDEOS' : 'SEE ALL VIDEOS'}
                </button>
            </div>
        </div>)
    );
}
