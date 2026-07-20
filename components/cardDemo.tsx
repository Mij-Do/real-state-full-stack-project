"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { txtLength } from "@/utils/functions";
import PropertyDetailsDialog from "./PropertyDetailsDialog";
import { useState } from "react";


interface Property {
    id: string;
    title: string;
    description: string;
    type: string;
    price: number;
    isNegotiable: boolean;
    ownerName: string;
    ownerPhone: string;
    images: string[];
    status: string; 
    createdAt: string;
    updatedAt?: string;
}

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    // تجهيز رابط الصورة الأولى للعرض كغلاف للكارد
    const coverImageUrl = property.images?.[0] || "/placeholder-property.jpg";

    const waPhoneNumber = property.ownerPhone.replace(/[^0-9]/g, "");
    const whatsappNumber = waPhoneNumber.startsWith("2") ? waPhoneNumber : `2${waPhoneNumber}`;

    // تنسيق السعر بالجنيه المصري بطريقة مريحة للعين (مثال: 550,000 ج.م)
    const formattedPrice = new Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 10,
    }).format(property.price);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md mt-2">
            
            {/* غلاف العقار مع الـ Badge */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                    src={coverImageUrl}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-w-7xl) 100vw, 384px"
                />
                {/* التظليل الخفيف فوق الصورة لجعل النص والـ Badges مقروءة */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10 z-10" />
                
                {/* نوع العقار على الصورة مباشرة */}
                <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                    {property.type === "apartment" ? "شقة" : "فيلا"}
                </Badge>
                {property.isNegotiable && (
                    <Badge variant="secondary" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        قابل للتفاوض
                    </Badge>
                )}
                </div>

                {/* السعر يعرض أسفل الصورة بشكل بارز ومميز */}
                <div className="absolute bottom-3 right-3 z-20">
                <span className="text-lg font-bold text-white drop-shadow-sm bg-black/40 px-2.5 py-1 rounded-md">
                    {formattedPrice}
                </span>
                </div>
            </div>

            <CardHeader className="space-y-2 p-4">
                {/* عنوان العقار */}
                <CardTitle className="line-clamp-1 text-base font-bold">
                    {property.title}
                </CardTitle>
                
                {/* وصف العقار (يعرض في حال وجوده) */}
                {property.description && (
                    <CardDescription className=" line-clamp-2 text-xs pt-1">
                        {txtLength(property.description, 20)}
                    </CardDescription>
                )}
            </CardHeader>

            {/* أزرار التفاعل السريعة مع صاحب العقار (اتصال / واتساب) */}
                <CardFooter className="flex flex-row justify-between items-center gap-2 p-4 border-t border-slate-50 ">
                {/* زر عرض كامل تفاصيل العقار */}
                    <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="flex-1 text-xs h-9 cursor-pointer">
                        عرض التفاصيل
                    </Button>
                    
                    {/* زر اتصال سريع بالمعلن */}
                    <Button 
                        size="sm" 
                        className="text-xs gap-1 h-9 cursor-pointer"
                        nativeButton={false}
                        render={
                            <a href={`tel:${property.ownerPhone}`}>
                                <Phone className="w-3.5 h-3.5" />
                            </a>
                        }
                    />

                    {/* زر واتساب سريع */}
                    <Button 
                        size="sm" 
                        variant="ghost"
                        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-emerald-200 text-xs p-2 h-9 cursor-pointer"
                        nativeButton={false}
                        render={
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=مرحباً أستاذ ${property.ownerName}، أنا مهتم بعقارك المعروض: ${property.title}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        }
                    />
                </CardFooter>
            </Card>
            <PropertyDetailsDialog 
                isOpen={isOpen} 
                onClose={() => setIsOpen(false)} 
                property={property}
            />
        </>
    );
}