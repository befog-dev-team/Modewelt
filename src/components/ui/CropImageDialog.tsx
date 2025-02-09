"use client"

import { useRef } from 'react'; // Import the useRef hook
import { Cropper, ReactCropperElement } from 'react-cropper'; // Import the Cropper component and the ReactCropperElement type from the react-cropper package
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './dialog'; // Import the Dialog, DialogContent, DialogFooter, DialogHeader, and DialogTitle components from the dialog module
import { Button } from './button'; // Import the Button component from the button module
import 'cropperjs/dist/cropper.css' // Import the Cropper CSS file


// Define the CropImageDialogProps type
interface CropImageDialogProps {
    src: string; // The source of the image to crop
    cropAspectRatio: number; // The aspect ratio of the crop
    onCropped: (blob: Blob | null) => void; // The callback function to call when the image is cropped
    onClose: () => void; // The callback function to call when the dialog is closed
}

// Define the CropImageDialog component
export default function CropImageDialog({
    src, // The source of the image to crop
    cropAspectRatio, // The aspect ratio of the crop
    onCropped, // The callback function to call when the image is cropped
    onClose, // The callback function to call when the dialog is closed
}: CropImageDialogProps) {
    // Create a ref for the cropper instance
    const cropperRef = useRef<ReactCropperElement>(null);

    function crop() {
        // Get the cropper instance
        const cropper = cropperRef.current?.cropper;

        // If the cropper instance is not available, return
        if (!cropper) return;

        // Convert the cropped canvas to a blob and call the onCropped callback with the blob and the image type "image/webp". "image/webp" is a lossy image format that supports transparency and animation
        cropper.getCroppedCanvas().toBlob((blob) => onCropped(blob), "image/webp");
        onClose(); // Close the dialog
    }

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Crop Image
                    </DialogTitle>
                </DialogHeader>
                <Cropper
                    src={src} // Set the source of the image to crop
                    aspectRatio={cropAspectRatio} // Set the aspect ratio of the crop
                    guides={false} // Disable the guides
                    zoomable={false} // Disable zooming
                    ref={cropperRef} // Set the ref to the cropperRef
                    className="mx-auto size-fit" // Set the class name to "mx-auto size-fit" to center the cropper
                />
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel 
                    </Button>
                    <Button onClick={crop} className='text-white'>Crop</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}