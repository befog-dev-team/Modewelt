import { validateRequest } from "@/auth"; // Import the validateRequest function
import { redirect } from "next/navigation"; // Import the redirect function

// The layout component
export default async function Layout({
    children, // The children of the component
}: {
    children: React.ReactNode // The children of the component
}) {
    const { user } = await validateRequest(); // Validate the request

    return <>{children}</>; // Return the children
}