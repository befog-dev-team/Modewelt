import { validateRequest } from "@/auth"; // import the validateRequest function
import prisma from "@/lib/prisma"; // import the prisma client
import streamServerClient from "@/lib/stream";
// import streamServerClient from "@/lib/stream"; // import the stream server client
import { createUploadthing, FileRouter } from "uploadthing/next"; // import the createUploadthing function
import { UploadThingError, UTApi } from "uploadthing/server"; // import the UploadThingError and UTApi classes

// create a new file router using the createUploadthing function
const f = createUploadthing();

// define the file router
export const fileRouter = { // export the file router
    // define the avatar upload route
    avatar: f({ // create a new file router
        image: { maxFileSize: "512KB" } // set the max file size to 512KB
    })
        // add a middleware to validate the user
        .middleware(async () => { // add a middleware to validate the user
            // validate the request
            const { user } = await validateRequest();
            // if the user is not found, throw an error
            if (!user) throw new UploadThingError("Unauthorized");

            // return the user
            return { user };
        })
        .onUploadComplete(async ({ metadata, file }) => { // add an onUploadComplete handler to update the user with the new avatar
            // get the user from the metadata and the old avatar url from the user metadata 
            const oldAvatarUrl = metadata.user.avatarUrl;

            // delete the old avatar
            if (oldAvatarUrl) { // if the old avatar url exists
                const key = oldAvatarUrl.split( // split the old avatar url to get the key
                    `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/` // /a/ is the app url prefix
                )[1] // get the second part of the split array which is the key of the file 

                // delete the old avatar file from the uploadthing server 
                await new UTApi().deleteFiles(key)
            }

            // update the user with the new avatar
            const newAvatarUrl = file.url.replace( // replace the file url with the app url prefix 
                "/f/", // /f/ is the file url prefix 
                `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`, // /a/ is the app url prefix 
            );

            // update the user with the new avatar
            await Promise.all([
                prisma.user.update({
                    where: { id: metadata.user.id },
                    data: {
                        avatarUrl: newAvatarUrl,
                    },
                }),
                ...(streamServerClient ? [
                    streamServerClient.partialUpdateUser({
                        id: metadata.user.id,
                        set: {
                            image: newAvatarUrl,
                        }
                    })
                ] : [])
            ])

            // update the user with the new avatar
            await prisma.user.update({ // update the user in the database with the new avatar url 
                where: { id: metadata.user.id }, // find the user by id from the metadata 
                data: { // set the user's avatar url to the new avatar url 
                    avatarUrl: newAvatarUrl, // set the avatar url to the new avatar url
                },
            });

            return { avatarUrl: newAvatarUrl }; // return the new avatar url
        }),

    // define the background image upload route
    backgroundImage: f({ // create a new file router for the background image upload route
        image: { maxFileSize: "2MB" } // set the max file size to 2MB
    })
        // add a middleware to validate the user
        .middleware(async () => { // add a middleware to validate the user
            // validate the request
            const { user } = await validateRequest();
            // if the user is not found, throw an error
            if (!user) throw new UploadThingError("Unauthorized");

            // return the user
            return { user };
        })
        .onUploadComplete(async ({ metadata, file }) => { // add an onUploadComplete handler to update the user with the new background image
            // get the user from the metadata and the old background image url from the user metadata 
            const oldBackgroundImageUrl = metadata.user.backgroundImageUrl;

            // delete the old background image
            if (oldBackgroundImageUrl) { // if the old background image url exists
                const key = oldBackgroundImageUrl.split( // split the old background image url to get the key
                    `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/` // /a/ is the app url prefix
                )[1] // get the second part of the split array which is the key of the file 

                // delete the old background image file from the uploadthing server 
                await new UTApi().deleteFiles(key)
            }

            // update the user with the new background image
            const newBackgroundImageUrl = file.url.replace( // replace the file url with the app url prefix 
                "/f/", // /f/ is the file url prefix 
                `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`, // /a/ is the app url prefix 
            );

            // update the user with the new background image
            await Promise.all([ // update the user in the database and on the stream server in parallel
                prisma.user.update({ // update the user in the database
                    where: { id: metadata.user.id }, // find the user by id
                    data: { // set the user's background image url to the new url 
                        backgroundImageUrl: newBackgroundImageUrl, // set the background image url to the new url
                    },
                }),
                // streamServerClient.partialUpdateUser({ // update the user on the stream server
                //     id: metadata.user.id, // find the user by id
                //     set: { // set the user's background image url to the new url 
                //         backgroundImage: newBackgroundImageUrl, // set the background image field to the new url
                //     }
                // })
            ])

            // update the user with the new background image
            await prisma.user.update({ // update the user in the database with the new background image url 
                where: { id: metadata.user.id }, // find the user by id from the metadata 
                data: { // set the user's background image url to the new background image url 
                    backgroundImageUrl: newBackgroundImageUrl, // set the background image url to the new background image url
                },
            });

            return { backgroundImageUrl: newBackgroundImageUrl }; // return the new background image url
        }),

    // define the media upload route for social media posts
    attachment: f({ // create a new file router for the media upload route
        image: { maxFileSize: "4MB", maxFileCount: 3 }, // set the max file size to 4MB and the max file count to 5
        video: { maxFileSize: "64MB", maxFileCount: 3 }, // set the max file size to 64MB and the max file count to 5
        pdf: { maxFileSize: "16MB", maxFileCount: 3 }, // set the max file size to 16MB and the max file count to 5
    })
        .middleware(async () => { // add a middleware to validate the user
            // validate the request and get the user
            const { user } = await validateRequest();

            // if the user is not found, throw an error
            if (!user) throw new UploadThingError("Unauthorized");

            return {}; // return an empty object
        })
        .onUploadComplete(async ({ file }) => { // add an onUploadComplete handler to save the media to the database


            // save the social media posts to the database 
            const media = await prisma.media.create({ // create a new media record in the database
                data: {
                    url: file.url.replace(
                        "/f/",
                        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
                    ),
                    type: file.type.startsWith("image")
                        ? "IMAGE"
                        : file.type.startsWith("video")
                            ? "VIDEO"
                            : "PDF",
                    fileName: file.name, // Save the filename
                    fileSize: file.size, // Save the filesize in bytes
                    public_id: file.url.split('/').pop() || '', // Add the public_id property
                },
            });

            return { mediaId: media.id }; // return the media id
        })
} satisfies FileRouter; // ensure that the file router satisfies the FileRouter type

// export the file router
export type AppFileRouter = typeof fileRouter;