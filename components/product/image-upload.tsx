"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (value) {
    return (
      <div className="relative size-24 rounded-lg border border-dashed border-border overflow-hidden group">
        <Image src={value} alt="Upload" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="size-8"
            onClick={onRemove}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CldUploadWidget onSuccess={onUpload} uploadPreset="shipweekly_uploads">
      {({ open }) => {
        return (
          <Button
            type="button"
            variant="outline"
            className="w-fit border-dashed gap-2"
            onClick={() => open()}
          >
            <ImagePlusIcon className="size-4" />
            Upload Logo
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
