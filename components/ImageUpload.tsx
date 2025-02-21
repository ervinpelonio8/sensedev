"use client";
import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageUploadProps {
  onChange: (files: File[]) => void;
}

export interface ImageUploadRef {
  reset: () => void;
}

const ImageUpload = forwardRef<ImageUploadRef, ImageUploadProps>(
  ({ onChange }, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const reset = useCallback(() => {
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);
      setFiles([]);
      onChange([]);
    }, [previews, onChange]);

    useImperativeHandle(
      ref,
      () => ({
        reset,
      }),
      [reset]
    );

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const updatedFiles = [...files, ...acceptedFiles];
        setFiles(updatedFiles);

        const newPreviews = acceptedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setPreviews((prev) => [...prev, ...newPreviews]);

        onChange(updatedFiles);
      },
      [files, onChange]
    );

    const removeImage = useCallback(
      (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);

        setPreviews((prevPreviews) => {
          URL.revokeObjectURL(prevPreviews[index]);
          return prevPreviews.filter((_, i) => i !== index);
        });

        onChange(newFiles);
      },
      [files, onChange]
    );

    useEffect(() => {
      return () => {
        previews.forEach((url) => URL.revokeObjectURL(url));
      };
    }, [previews]);

    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    });

    return (
      <div>
        <div className="mb-4 flex flex-wrap gap-4">
          {previews.map((url, index) => (
            <div key={index} className="relative w-[200px] h-[200px]">
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-sm hover:scale-110 transition"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={url}
                  alt={`Product image ${index + 1}`}
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-4 rounded-lg hover:bg-muted transition text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p>Drag & drop images here, or click to select files</p>
        </div>
      </div>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
