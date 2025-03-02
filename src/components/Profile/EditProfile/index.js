"use client";

import { updateUserProfileSchema } from "@/lib/validation"; // Import the updateUserProfileSchema
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver
import { useForm } from "react-hook-form"; // Import the useForm hook
import { useUpdateProfileMutation } from "../UserProfile/mutation"; // Import the useUpdateProfileMutation hook
import { Loader2 } from "lucide-react"; // Import the Loader2 component
import { Camera } from "lucide-react"; // Import the Camera component
import CropImageDialog from "@/components/ui/CropImageDialog"; // Import the CropImageDialog component
import Image from "next/image"; // Import the Image component
import { useState, useRef } from "react"; // Import the useState and useRef hooks
import Resizer from "react-image-file-resizer"; // Import the react-image-file-resizer package
import toast  from "react-hot-toast"; // Import the toast function
import avatarPlaceholder from "../../../../public/assets/sample/avatar.png"; // Import the avatarPlaceholder image
import backgroundPlaceholder from "../../../../public/assets/profile/backgroundImageBackrgound.png"; // Import the backgroundPlaceholder image

export default function EditProfile({ user, closeModal }) {
    const [croppedAvatar, setCroppedAvatar] = useState(null);
    const [croppedBackground, setCroppedBackground] = useState(null);


    // Create a form using the useForm hook
    const form = useForm({
        resolver: zodResolver(updateUserProfileSchema), // Use the zodResolver with the updateUserProfileSchema
        defaultValues: { // Set the default values
            displayName: user?.displayName || "", // Set the display name
            profileHeadline: user?.profileHeadline || "", // Set the profile headline
            location: user?.location || "", // Set the location
            bio: user?.bio || "", // Set the bio
        },
    });

    // Use the useUpdateProfileMutation hook
    const mutation = useUpdateProfileMutation();

    // Function to handle the form submission
    async function onSubmit(values) {
        const newAvatarFile = croppedAvatar
            ? new File([croppedAvatar], `avatar_${user.id}.webp`) // create a new file object with the cropped avatar blob
            : undefined // Set the new avatar file to undefined

        const newBackgroundFile = croppedBackground
            ? new File([croppedBackground], `background_${user.id}.webp`) // create a new file object with the cropped background blob
            : undefined; // Set the new background file to undefined

        // Call the mutation
        mutation.mutate({
            values,
            avatar: newAvatarFile,
            backgroundImage: newBackgroundFile
        }, {
            onSuccess: () => { // If the mutation is successful 
                toast.success("Profile updated successfully");
                setCroppedAvatar(null);
                setCroppedBackground(null);
                closeModal(); // Close the modal
            },
            onError: () => toast.error("Failed to update profile: "),
        });
    }

    return (
        <div>
            {/* Background Image Upload */}
            <div className="space-y-2.5">
                <label className="block text-sm font-medium text-gray-600">Background Image</label>
                <BackgroundInput
                    src={croppedBackground ? URL.createObjectURL(croppedBackground) : user.backgroundImageUrl || backgroundPlaceholder}
                    onImageCropped={setCroppedBackground}
                />
            </div>

            <div className="space-y-2.5 my-4">
                <label className="block text-sm font-medium text-gray-600">Avatar</label>
                <AvatarInput
                    src={croppedAvatar
                        ? URL.createObjectURL(croppedAvatar) // createObjectURL is a function that creates a URL for a blob object
                        : user.avatarUrl || avatarPlaceholder
                    }
                    onImageCropped={setCroppedAvatar}
                />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <input
                        {...form.register("displayName")} // Register the displayName field
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Profile Headline</label>
                    <input
                        {...form.register("profileHeadline")}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Your headline"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Location</label>
                    <input
                        {...form.register("location")} // Register the location field
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Your location"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Bio</label>
                    <textarea
                        {...form.register("bio")} // Register the bio field
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Write a short bio..."
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={mutation.isPending} // Disable the button if the mutation is pending
                        className={`bg-[#a35285] text-white px-6 py-2 rounded-md ${mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {mutation.isPending ? // Show a loader if the mutation is pending
                            (<Loader2 className="animate-spin" />)
                            :
                            "Save"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

// BackgroundInput component
function BackgroundInput({ src, onImageCropped }) {
    const [imageToCrop, setImageToCrop] = useState();
    const fileInputRef = useRef(null);

    function onImageSelected(image) {
        if (!image) return;

        Resizer.imageFileResizer(
            image,
            2000, // Increased width for better quality
            500,  // Increased height (maintains 4:1 aspect ratio)
            "PNG", // Use PNG for lossless quality (change to "WEBP" if needed)
            100,  // Quality set to max (only affects lossy formats like JPEG/WEBP)
            0, // Rotation
            (uri) => {
                setImageToCrop(uri); // Set the image to crop state
            },
            "file" // Output as a file for better processing
        );
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageSelected(e.target.files?.[0])}
                ref={fileInputRef}
                className="hidden"
            />
            <button onClick={() => fileInputRef.current?.click()} className="relative group">
                <Image src={src} alt="Background preview" width={500} height={500} className="rounded object-cover w-[15rem] h-[5rem]" />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Camera size={24} />
                </div>
            </button>
            {imageToCrop && (
                <CropImageDialog
                    src={URL.createObjectURL(imageToCrop)}
                    cropAspectRatio={4}
                    onCropped={onImageCropped}
                    onClose={() => setImageToCrop(undefined)}
                />
            )}
        </>
    );
}

// AvatarInput component
function AvatarInput({ src, onImageCropped }) {
    const [imageToCrop, setImageToCrop] = useState();

    const fileInputRef = useRef(null);

    function onImageSelected(image) {
        if (!image) return;

        Resizer.imageFileResizer(
            image,
            2000, // Increased width for better quality
            500,  // Increased height (maintains 4:1 aspect ratio)
            "PNG", // Use PNG for lossless quality (change to "WEBP" if needed)
            100,  // Quality set to max (only affects lossy formats like JPEG/WEBP)
            0, // Rotation
            (uri) => {
                setImageToCrop(uri); // Set the image to crop state
            },
            "file" // Output as a file for better processing
        );
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageSelected(e.target.files?.[0])}
                ref={fileInputRef}
                className="hidden sr-only"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group relative block"
            >
                <Image
                    src={src}
                    alt="Avatar preview"
                    width={100}
                    height={100}
                    className="size-24 flex-none rounded-full object-cover"
                />
                <span className="absolute inset-0 m-auto hidden group-hover:flex size-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-white transition-colors duration-200">
                    <Camera size={24} />
                </span>
            </button>
            {imageToCrop && (
                <CropImageDialog
                    src={URL.createObjectURL(imageToCrop)} // createObjectURL is a function that creates a URL for a blob object
                    cropAspectRatio={1} // cropAspectRatio is a number that represents the aspect ratio of the crop area
                    onCropped={onImageCropped} // onCropped is a function that takes a blob object and returns void
                    onClose={() => {
                        setImageToCrop(undefined); // Reset the image to crop state
                        // Reset the file input value to allow selecting the same file again
                        if (fileInputRef.current) {
                            fileInputRef.current.value = ""; // Reset the file input value to allow selecting the same file again
                        }
                    }}
                />
            )}
        </>
    )
}