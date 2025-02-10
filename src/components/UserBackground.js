import Image from "next/image"
import backgroundImageBackrgound from "../../public/assets/profile/backgroundImageBackrgound.png"
import { cn } from "@/lib/utils"

export default function UserBackground({
    backgroundImageUrl,
    size,
    className
}) {
    return <Image
        src={backgroundImageUrl || backgroundImageBackrgound}
        width={size ?? 1920}
        height={size ?? 1000}
        alt="User BackgroundImage"
        className={cn("aspect-video flex-none object-cover size-fit", className)}
        priority
    />
}