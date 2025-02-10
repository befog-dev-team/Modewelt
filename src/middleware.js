// import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware() {
    // const path = request.nextUrl.pathname

    // // Correctly check if the path is a public path
    // const isPublicPath = path === '/auth' || path === '/demo' || path === '/verify-email';
    
    // const token = request.cookies.get('token')?.value || '';

    // // If the user is authenticated and trying to access a public path
    // if (isPublicPath && token) {
    //     return NextResponse.redirect(new URL('/', request.url)); // Redirect to home if authenticated
    // }
    // // If the user is not authenticated and trying to access a protected path
    // else if (!isPublicPath && !token) {
    //     return NextResponse.redirect(new URL('/', request.url)); // Redirect to auth if not authenticated
    // }

    // // If none of the above conditions are met, allow the request to proceed
    // return NextResponse.next();
}

export const config = {
    matcher: [
        '/',           // Match home
        '/auth',       // Match auth page
        '/verify-email', // Match verify email page
        '/demo',       // Match demo page if needed
    ]
}
