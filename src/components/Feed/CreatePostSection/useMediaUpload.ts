import { toast } from "react-hot-toast"; // Import the toast function from the react-toastify module
import { useUploadThing } from "@/lib/uploadthing"; // Import the useUploadThing hook from the uploadthing module
import { useState } from "react"; // Import the useState function from the react module

// Define the Attachment interface
export interface Attachment {
    file: File; // Define the file property as a File
    mediaId?: string; // Define the mediaId property as an optional string
    isUploading: boolean; // Define the isUploading property as a boolean
}

// Hook to handle media uploads
export default function useMediaUpload() {
    // Destructure the toast function from the useToast hook

    // Define the state variables for the attachments
    const [attachments, setAttachments] = useState<Attachment[]>([]);

    // Define the state variable for the upload progress
    const [uploadProgress, setUploadProgress] = useState<number>();

    // Upload attachments 
    const { startUpload, isUploading } = useUploadThing("attachment", { // Use the useUploadThing hook to upload attachments with the key "attachment" 
        // Rename files to prevent conflicts
        onBeforeUploadBegin(files) { // Handle the before upload event to rename the files before uploading
            const renamedFiles = files.map((file) => {
                // Generate a random UUID to prevent conflicts
                const extension = file.name.split(".").pop(); // Get the file extension
                return new File( // Create a new File object
                    [file], // File data
                    `attachment_${crypto.randomUUID()}.${extension}`, // Rename the file with a random UUID
                    {
                        type: file.type, // Preserve the file type
                    },
                );
            });

            setAttachments((prev) => [ // Update the attachments
                ...prev, // Add the renamed files to the list of attachments
                ...renamedFiles.map((file) => ({ file, isUploading: true })), // Mark the files as uploading
            ]);

            // Return the renamed files
            return renamedFiles;
        },
        // Update the upload progress
        onUploadProgress: setUploadProgress,
        // Update the media ID of the uploaded file
        onClientUploadComplete(res) {
            setAttachments((prev) =>
                prev.map((a) => {
                    // We added a random UUID to the file name so we need to find the correct upload result
                    const uploadResult = res.find((r) => r.name === a.file.name);

                    // If the upload result is not found, return the attachment as is
                    if (!uploadResult) return a;

                    // Update the media ID of the attachment
                    return {
                        ...a, // Spread the attachment to keep the other properties
                        mediaId: uploadResult.serverData.mediaId, // Update the media ID
                        isUploading: false, // Mark the file as not uploading
                    };
                }),
            );
        },
        // Handle upload errors
        onUploadError() {
            // Remove the files that failed to upload
            setAttachments((prev) => prev.filter((a) => !a.isUploading));
            toast.error("An error occurred while uploading the file.");
        },
    });

    // Handle the start upload event
    function handleStartUpload(files: File[]) {
        // Prevent multiple uploads
        if (isUploading) {
            toast.error("An upload is already in progress.");
            return;
        }

        // Limit the number of attachments
        if (attachments.length + files.length > 3) {
            toast.error("You can only upload up to 3 attachments per post.");
            return;
        }

        // Start the upload
        startUpload(files);
    }

    // Remove an attachment
    function removeAttachment(fileName: string) {
        setAttachments((prev) => prev.filter((a) => a.file.name !== fileName)); // Remove the attachment with the matching file name from the list of attachments
    }

    // Reset the attachments
    function reset() {
        setAttachments([]); // Clear the list of attachments
        setUploadProgress(undefined); // Clear the upload progress
    }

    // Expose the functions and state
    return {
        startUpload: handleStartUpload, // Start the upload
        attachments, // List of attachments
        isUploading, // Whether an upload is in progress
        uploadProgress, // Upload progress
        removeAttachment, // Remove an attachment
        reset, // Reset the attachments
    };
}