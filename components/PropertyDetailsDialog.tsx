"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PROPERTY_TYPE_LABELS } from "@/constants";
import { MapPin, Phone, User, Tag, DollarSign, Calendar, CheckCircle2 } from "lucide-react";
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
    if (!property) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold leading-snug">
                        {property.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 my-2">
                {/* معرض الصور */}
                {property.images && property.images.length > 0 && (
                    <div>
                        {property.images.map((url, idx) => (
                            <Image
                                key={idx}
                                src={url}
                                alt={`صورة ${idx + 1}`}
                                width={600}
                                height={500}
                                className="object-cover rounded-lg border border-slate-100"
                            />
                        ))}
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
                    <h4 className="text-sm font-bold  mb-1">الوصف والتفاصيل:</h4>
                    <p className="text-sm leading-relaxed p-3 rounded-lg border border-slate-100 whitespace-pre-line">
                        {property.description}
                    </p>
                    </div>
                )}

                {/* بيانات صاحب العقار */}
                <div className="border-t pt-4">
                    <h4 className="text-sm font-bold  mb-2">معلومات المعلن:</h4>
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