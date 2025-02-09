import { createRouteHandler } from "uploadthing/next"; // import the createRouteHandler function from the next file
import { fileRouter } from "./core"; // import the fileRouter from the core file

// export the GET and POST route handlers for the file router
export const { GET, POST } = createRouteHandler({ 
    router: fileRouter, // pass the file router to the createRouteHandler function
});