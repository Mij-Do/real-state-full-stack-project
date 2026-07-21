"use client";

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (url: string) => void;
}

export default function ImageUpload({
    value = [],
    onChange,
    onRemove,
}: ImageUploadProps) {

    const handleUploadSuccess = (result: any) => {
        if (result.event === "success" && result.info) {
            const info = result.info as CloudinaryUploadWidgetInfo;
            if (info.secure_url) {
                // 🎯 نستخدم الدالة المباشرة لتحديث الـ Form فوراً وآمناً
                onChange([...value, info.secure_url]);
            }
        }
    };

    return (
        <div>
            {/* عرض الصور المرفوعة */}
            {value.length > 0 && (
                <div className="mb-4 flex items-center gap-3 flex-wrap">
                    {value.map((url, index) => (
                        <div key={url + index} className="relative w-20 h-20 rounded-md overflow-hidden border shadow-sm">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full z-10 hover:opacity-90 transition"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                            <Image 
                                src={url} 
                                alt={`صورة العقار ${index + 1}`} 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* زر الرفع بـ Cloudinary Widget */}
            <CldUploadWidget
                uploadPreset="Real-State"
                onSuccess={handleUploadSuccess}
                options={{ 
                    maxFiles: 5, 
                    multiple: true,
                    singleUploadAutoClose: false
                }}
            >
                {({ open }) => (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => open()}
                        className="w-full flex items-center gap-2"
                    >
                        <ImagePlus className="h-4 w-4" />
                        رفع صور العقار ({value.length}/5)
                    </Button>
                )}
            </CldUploadWidget>
        </div>
    );
}