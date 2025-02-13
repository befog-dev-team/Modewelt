"use client"

import React from "react";
import {
    Box,
    // Typography,
    Divider,
    // Card,
    // CardContent,
    // Avatar,
} from "@mui/material";
// import { AvatarGroup } from "@mui/material";
import Notifications from "./Notifications";
// import { FaEllipsisH } from "react-icons/fa";

// import Image from "next/image";

// function ActivityCard({ avatars, description, time }) {
//   return (
//     <div className="shadow-md bg-white rounded-md p-4 mb-4">
//       <div className="flex items-center space-x-4 mb-3">
//         {avatars.map((avatar, index) => (
//           <Image
//             width={100}
//             height={100}
//             key={index}
//             src={avatar}
//             alt={`Activity avatar ${index + 1}`}
//             className="w-10 h-10 rounded-full"
//           />
//         ))}
//       </div>
//       <p className="font-medium text-gray-700">{description}</p>
//       <p className="text-xs text-gray-500">{time}</p>
//     </div>
//   );
// }

export default function NotificationWrapper({ user, todayViews }) {

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:my-12 lg:ml-32 space-y-8 lg:space-y-0 lg:space-x-8 m-auto">
                {/* Left Section */}
                <div className="lg:w-1/4 w-full">
                    <div className="shadow-md bg-white rounded-md p-4 mb-6">
                        {/* <h6 className="text-center text-sm font-semibold">Notification Settings</h6> */}
                        {/* <Divider className="my-2" /> */}
                        <p className="text-center font-medium">Notification</p>
                    </div>
                    <div className="shadow-lg bg-white rounded-md p-4">
                        <h6 className="text-center font-semibold text-sm">
                            Your Dashboard
                        </h6>
                        <Divider className="my-4" />
                        <div className="space-y-8">
                            {[
                                { count: todayViews, label: "Today views" },
                                { count: user.totalProfileViews, label: "Total views" },
                                { count: user.totalLikes, label: "Total likes" },
                            ].map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-[#f26744] text-4xl font-bold">
                                        {item.count}
                                    </h3>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-grow mx-4 overflow-y-auto h-[70vh]">
                    <Box className=" h-[330px] lg:w-[900px] w-full">
                        {/* <Box className="flex justify-between items-center mb-4">
                            <Divider className="flex-grow mx-4" />
                            <Typography className="font-semibold">RECENT</Typography>
                            <Divider className="flex-grow mx-4" />
                        </Box> */}

                        {/* Notifications Section */}
                        <Notifications />

                        {/* Card */}
                        {/* <Card className="w-auto mb-4 border-2 rounded-lg mx-4">
                            <CardContent>
                                <Box className="flex justify-between items-center">
                                    <Box className="flex items-center">
                                        <AvatarGroup spacing={24}>
                                            {[
                                                "https://s3-alpha-sig.figma.com/img/0707/1b5c/c4766380c498dbd1155f64c2717a27a6?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XKk3q1CUZ-bWFGtIzq~2gmSQ5vvxLdMl2xbgQBE3Dyh0Xo0jrAj64GC8yzp3CyWd7RtBZI2j~Uwx0CB72bRikC6raqDwDE5vJo8b7F2EdWJfEdDTEw6nq8uWnhpZ6QTYS4yZh0vAnv8dCQA4DyM~XQVilVvyeWTM2sIbKmZzg4uIl-DVO-xRM5Giil6E4EUmZzDEHL1p8OAuw5XFpv0qKi~86817D47hr-dLbvkH8RPKGQMNhHZDO0gJy6XwG4IyIFs6GOBh~k0CbnoEmu7XOVUo~B0n~ZaO3QynYqD4dy5gPwq4GeI~zIllE1Op-lT1iaAtxwGZDPtEOG98I-K47Q__",
                                                "https://s3-alpha-sig.figma.com/img/0707/1b5c/c4766380c498dbd1155f64c2717a27a6?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XKk3q1CUZ-bWFGtIzq~2gmSQ5vvxLdMl2xbgQBE3Dyh0Xo0jrAj64GC8yzp3CyWd7RtBZI2j~Uwx0CB72bRikC6raqDwDE5vJo8b7F2EdWJfEdDTEw6nq8uWnhpZ6QTYS4yZh0vAnv8dCQA4DyM~XQVilVvyeWTM2sIbKmZzg4uIl-DVO-xRM5Giil6E4EUmZzDEHL1p8OAuw5XFpv0qKi~86817D47hr-dLbvkH8RPKGQMNhHZDO0gJy6XwG4IyIFs6GOBh~k0CbnoEmu7XOVUo~B0n~ZaO3QynYqD4dy5gPwq4GeI~zIllE1Op-lT1iaAtxwGZDPtEOG98I-K47Q__",
                                            ].map((src, idx) => (
                                                <Avatar key={idx} alt={`Avatar ${idx + 1}`} src={src} />
                                            ))}
                                        </AvatarGroup>
                                        <Box className="ml-4">
                                            <Typography variant="body2">
                                                You appeared in 9 searches this week
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                3 hours
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2">
                                        <FaEllipsisH className="text-gray-700 text-[20px] cursor-pointer w-[24px] h-[24px] " />
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card> */}
                    </Box>
                </div>
            </div>
        </div>
    );
}
