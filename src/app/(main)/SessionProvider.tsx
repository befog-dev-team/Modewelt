"use client" // use the client

import { User, Session } from "lucia"; // import the User and Session types from lucia
import { createContext, useContext } from "react"; // import the createContext and useContext functions from react

// define the SessionContext type
interface SessionContext {
    user: User; // the user object from the session
    session: Session; // the session object
}

// create a new SessionContext with an initial value of null
const SessionContext = createContext<SessionContext | null>(null);

// define the SessionProvider component
export default function SessionProvider({
    children, // the children of the component
    value // the session context
}: React.PropsWithChildren<{ value: SessionContext }>) { // the props for the component
    return (
        <SessionContext.Provider value={value}>
            {children} {/* render the children of the component */}
        </SessionContext.Provider>
    )
}

// define the useSession hook
export function useSession() {
    // get the session context from the context
    const context = useContext(SessionContext);

    // if the context is null, throw an error
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider"); // throw an error
    }

    return context; // return the session context
}
