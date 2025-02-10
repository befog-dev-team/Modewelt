import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
    Channel,
    ChannelHeader,
    ChannelHeaderProps,
    MessageInput,
    MessageList,
    Window,
} from "stream-chat-react";

interface ChatChannelProps {
    open: boolean;
    openSidebar: () => void;
}

export default function ChatChannel({ open, openSidebar }: ChatChannelProps) {
    return (
        <div className={cn("w-full md:block", !open && "hidden")}>
            <Button className="p-2 md:hidden absolute top-[55px] z-10" size="icon" variant="ghost" onClick={openSidebar}>
                <Menu className="size-5 text-primarybtn" />
            </Button>
            <Channel>
                <Window>
                    <CustomChannelHeader openSidebar={openSidebar} />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </div>
    );
}

interface CustomChannelHeaderProps extends ChannelHeaderProps {
    openSidebar: () => void;
}

function CustomChannelHeader({
    ...props
}: CustomChannelHeaderProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 md:hidden"></div>
            <ChannelHeader {...props} />
        </div>
    );
}