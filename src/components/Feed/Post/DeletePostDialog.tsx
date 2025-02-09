"use client"

import { PostData } from "@/lib/types"; // Import the PostData type from the types module
import { useDeletePostMutation } from "./deletePostMutation"; // Import the useDeletePostMutation hook from the deletePostMutation module
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"; // Import the Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, and DialogTitle components from the dialog module
import LoadingButton from "../../LoadingButton"; // Import the LoadingButton component from the LoadingButton module
import { Button } from "../../ui/button"; // Import the Button component from the button module

// Define the DeletePostDialogProps interface
interface DeletePostDialogProps {
    post: PostData; // Post data
    open: boolean; // Open state
    onClose: () => void; // On close function
}

// Define the DeletePostDialog component
export default function DeletePostDialog({
    post, // Post data
    open, // Open state
    onClose, // On close function
}: DeletePostDialogProps) {
    const mutation = useDeletePostMutation() // Call the useDeletePostMutation hook

    // Define the handleOpenChange function
    function handleOpenChange(open: boolean) { // Define the handleOpenChange function with the open parameter
        if (!open || !mutation.isPending) { // If open is false or mutation is not pending
            onClose() // Call the onClose function
        }
    }

    return <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete post?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this post? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <LoadingButton
                    variant={"destructive"}
                    onClick={() => mutation.mutate(post.id, { onSuccess: onClose })}
                    loading={mutation.isPending}
                >
                    Delete
                </LoadingButton>
                <Button variant={"outline"} onClick={onClose} disabled={mutation.isPending}>
                    Cancel
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}