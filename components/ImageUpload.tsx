"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (url: string) => void;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
}: ImageUploadProps) {
    const handleUpload = (result: any) => {
        if (result.event === "success") {
            onChange([...value, result.info.secure_url]);
        }
    };

    return (
        <div>
        {/* عرض الصور المرفوعة */}
        <div className="mb-4 flex items-center gap-4 flex-wrap">
            {value.map((url) => (
            <div key={url} className="relative w-20 h-20 rounded-md overflow-hidden border">
                <button
                type="button"
                onClick={() => onRemove(url)}
                className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full z-10 hover:opacity-80 transition"
                >
                <Trash2 className="h-3 w-3" />
                </button>
                <Image src={url} alt="Property" width={500} height={500} className="object-cover" />
            </div>
            ))}
        </div>

        {/* زر الرفع بـ Cloudinary Widget */}
        <CldUploadWidget
            uploadPreset="Real-State" // غير ده باسم الـ preset بتاعك
            onSuccess={handleUpload}
            options={{ maxFiles: 5, multiple: true }}
        >
            {({ open }) => (
            <Button
                type="button"
                variant="outline"
                onClick={() => open()}
                className="w-full flex items-center gap-2"
            >
                <ImagePlus className="h-4 w-4" />
                رفع صور العقار
            </Button>
            )}
        </CldUploadWidget>
        </div>
    );
}