import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Check if Cloudinary credentials are fully defined in env
const hasCloudinary = !!(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export interface UploadResult {
  secure_url: string;
  public_id: string;
}

/**
 * Uploads a file buffer either to Cloudinary (if configured) or to the local filesystem.
 */
export async function uploadFile(
  fileBuffer: Buffer,
  folder: string,
  filename: string,
  fileType?: string
): Promise<UploadResult> {
  if (hasCloudinary) {
    return new Promise((resolve, reject) => {
      const fileExtension = filename.split(".").pop()?.toLowerCase() || "";
      const ALLOWED_DOC_TYPES = ["pdf", "doc", "docx", "rtf", "odt", "txt"];
      const isRaw = ALLOWED_DOC_TYPES.includes(fileExtension);
      const resourceType = fileType?.startsWith("video/") 
        ? "video" 
        : (isRaw ? "raw" : "image");

      const options: any = {
        folder,
        resource_type: resourceType,
      };

      if (isRaw) {
        const publicId = filename.replace(/\.[^/.]+$/, "");
        options.public_id = publicId;
        options.format = fileExtension;
      } else if (fileType?.startsWith("video/")) {
        options.transformation = [{ width: 1280, height: 720, crop: "limit", fetch_format: "mp4" }];
      } else {
        options.transformation = [{ quality: "auto", fetch_format: "jpg" }];
      }

      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              secure_url: result?.secure_url || "",
              public_id: result?.public_id || "",
            });
          }
        }
      );

      const { Readable } = require("stream");
      Readable.from(fileBuffer).pipe(stream);
    });
  } else {
    // ⚠️ FALLBACK: Local File System Upload
    console.warn("⚠️ Cloudinary credentials missing in .env. Using local filesystem upload fallback!");
    
    // Create clean, safe filename
    const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const publicUploadsDir = path.join(process.cwd(), "public", "uploads", folder);
    
    // Ensure directory exists
    await fs.promises.mkdir(publicUploadsDir, { recursive: true });
    
    // Write buffer to local folder
    const filePath = path.join(publicUploadsDir, cleanFilename);
    await fs.promises.writeFile(filePath, fileBuffer);
    
    // Path accessible to frontend (served by Next.js from public/ folder)
    const localUrl = `/uploads/${folder}/${cleanFilename}`;
    
    return {
      secure_url: localUrl,
      public_id: `local:${folder}:${cleanFilename}`,
    };
  }
}

/**
 * Deletes a file either from local filesystem (if it starts with local:) or from Cloudinary.
 */
export async function deleteFile(publicId: string): Promise<void> {
  if (!publicId) return;

  if (publicId.startsWith("local:")) {
    try {
      const parts = publicId.split(":");
      if (parts.length >= 3) {
        const folder = parts[1];
        const filename = parts[2];
        const filePath = path.join(process.cwd(), "public", "uploads", folder, filename);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
          console.log(`Deleted local file successfully: ${filePath}`);
        }
      }
    } catch (err) {
      console.error("❌ Failed to delete local file:", err);
    }
  } else if (hasCloudinary) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error("❌ Failed to delete Cloudinary file:", err);
    }
  }
}
