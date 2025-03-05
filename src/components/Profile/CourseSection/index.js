import Image from 'next/image'
import profileimg from "../../../../public/assets/profile/backgroundImageBackrgound.png";

export default function Index() {
    return (
        <div>
            {/* You May Like ADs Section */}
            <div className="h-[338px] mt-5 shadow-lg ">
                <div className="flex items-center p-3">
                    <span className="font-[Gotham] font-semibold text-center ml-2 text-[12px]">
                        YOU MAY LIKE THESE COURSES
                    </span>
                </div>
                <hr className="w-[230px] mx-auto" />
                <div className="flex flex-col items-start m-4 w-[228px] h-[198px] justify-center text-center space-y-3">
                    {/* Added spacing between items */}
                    <div className="flex items-center w-[216px] h-[52px]">
                        <Image
                            width={250}
                            height={160}
                            src={profileimg}
                            alt=""
                            className="w-[80px] h-[52px] mr-2"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold">
                                UX Foundations: Prototyping
                            </h1>
                            <p className="text-gray-700 text-[10px]">
                                27,959 viewers
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center w-[216px] h-[52px]">
                        <Image
                            width={250}
                            height={160}
                            src={profileimg}
                            alt=""
                            className="w-[80px] h-[52px] mr-2"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-center text-sm font-bold">
                                Designing with Adobe XD and pro
                            </h1>
                            <p className="text-gray-700 text-[10px]">9,122 viewers</p>
                        </div>
                    </div>
                    <div className="flex items-center w-[216px] h-[52px]">
                        <Image
                            width={250}
                            height={160}
                            src={profileimg}
                            alt=""
                            className="w-[80px] h-[52px] mr-2"
                        />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-bold">
                                UX Foundations: Styles and GUIs
                            </h1>
                            <p className="text-gray-700 text-[10px]">
                                13,858 viewers
                            </p>
                        </div>
                    </div>
                </div>
                <p className="ml-3 text-[14px] text-[#fa43b4]">
                    See all recomendations
                </p>
            </div>
        </div>
    )
}
