// Stream Chat CSS is ONLY loaded for the /chat route — not globally.
// This saves ~150KB of CSS on every other page.
import 'stream-chat-react/dist/css/v2/index.css';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
