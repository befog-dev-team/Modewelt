import { AppFileRouter } from "@/app/api/uploadthing/core"; // import the FileRouter type from the core file
import { generateReactHelpers } from "@uploadthing/react"; // import the generateReactHelpers function from the react file

// generate the react helpers for the AppFileRouter and export them as useUploadThing and uploadFiles functions 
export const { useUploadThing, uploadFiles } = generateReactHelpers<AppFileRouter>(); // export the useUploadThing and uploadFiles functions