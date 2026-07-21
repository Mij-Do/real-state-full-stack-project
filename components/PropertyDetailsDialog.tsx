"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PROPERTY_TYPE_LABELS } from "@/constants";
import { Tag, DollarSign, Calendar, CheckCircle2, User, Phone } from "lucide-react";
import Image from "next/image";

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
}

interface Props {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function PropertyDetailsDialog({ property, isOpen, onClose }: Props) {
    // 🎯 State لمتابعة الصورة المعروضة حالياً
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!property) return null;

    // الصورة النشطة حالياً أو الصورة الأولى كـ Fallback
    const activeImage = property.images?.[selectedImageIndex] || property.images?.[0];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold leading-snug">
                        {property.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 my-2">
                    {/* 🖼️ معرض الصور التفاعلي */}
                    {property.images && property.images.length > 0 && (
                        <div className="space-y-3">
                            {/* 1. الصورة الرئيسية الكبيرة */}
                            <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-100 bg-slate-100 shadow-sm">
                                <Image
                                    src={activeImage}
                                    alt={property.title}
                                    fill
                                    priority
                                    className="object-cover transition-all duration-300"
                                />
                            </div>

                            {/* 2. الشبكة المصغرة (تظهر فقط لو فيه أكتر من صورة) */}
                            {property.images.length > 1 && (
                                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                                    {property.images.map((url, idx) => {
                                        const isSelected = selectedImageIndex === idx;
                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setSelectedImageIndex(idx)}
                                                className={`relative h-16 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                                    isSelected 
                                                        ? "border-blue-600 ring-2 ring-blue-600/20 scale-95" 
                                                        : "border-transparent opacity-70 hover:opacity-100"
                                                }`}
                                            >
                                                <Image
                                                    src={url}
                                                    alt={`صورة مصغرة ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* تفاصيل العقار */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-sm">
                        <div className="flex items-center gap-2 text-slate-700">
                            <Tag className="w-4 h-4" />
                            <span>النوع: </span>
                            <span className="font-bold">
                                {PROPERTY_TYPE_LABELS[property.type] || property.type}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            <span>السعر: </span>
                            <span className="font-bold text-emerald-600">
                                {property.price.toLocaleString()} ج.م
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                            <span>التفاوض: </span>
                            <span className="font-medium">
                                {property.isNegotiable ? "قابل للتفاوض" : "غير قابل للتفاوض"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            <span>تاريخ الإضافة: </span>
                            <span className="font-medium">
                                {new Date(property.createdAt).toLocaleDateString("ar-EG")}
                            </span>
                        </div>
                    </div>

                    {/* الوصف */}
                    {property.description && (
                        <div>
                            <h4 className="text-sm font-bold mb-1">الوصف والتفاصيل:</h4>
                            <p className="text-sm leading-relaxed p-3 rounded-lg border border-slate-100 whitespace-pre-line text-slate-600 bg-white">
                                {property.description}
                            </p>
                        </div>
                    )}

                    {/* بيانات صاحب العقار */}
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-bold mb-2">معلومات المعلن:</h4>
                        <div className="flex flex-col sm:flex-row gap-4 bg-blue-50/50 p-3 rounded-xl text-sm border border-blue-100">
                            <div className="flex items-center gap-2 font-medium">
                                <User className="w-4 h-4 text-blue-600" />
                                <span>الاسم: {property.ownerName}</span>
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <Phone className="w-4 h-4 text-blue-600" />
                                <span>الهاتف: 01002992233</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}