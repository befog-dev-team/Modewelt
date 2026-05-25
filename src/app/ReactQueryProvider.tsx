"use client"

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import the react-query hooks
import { ReactQueryDevtools } from "@tanstack/react-query-devtools" // Import the devtools

export default function ReactQueryProvider({
    children // The children of the component
}: {
    children: React.ReactNode; // The children of the component
}) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60, // 1 minute
                    },
                },
            })
    ); // Create a new query client

    return (
        // QueryClientProvider is a context provider that accepts a client prop and client prop is the query client
        (<QueryClientProvider client={client}>
            {children}
            {/* ReactQueryDevtools is a devtools component that accepts an initialIsOpen prop and showing on the popup right-bottom screen in developement but in production it disapear*/}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>)
    );
}