"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
}

export function MultiImageUpload({ value, onChange, onRemove }: MultiImageUploadProps) {
  const onUpload = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[150px] rounded-lg border border-border overflow-hidden group">
            <Image src={url} alt="Screenshot" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {value.length < 5 && (
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
                Upload Screenshot
              </Button>
            );
          }}
        </CldUploadWidget>
      )}
    </div>
  );
}
