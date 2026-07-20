"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type PropertyStatus = "PENDING" | "APPROVED" | "DECLINED" | "SOLD";

export async function getPropertiesByStatus(status: PropertyStatus = "APPROVED") {
    try {
        const properties = await prisma.property.findMany({
            where: { status },
            orderBy: { createdAt: "desc" },
        });

        return properties.map((property) => ({
            ...property,
            createdAt: property.createdAt.toISOString(),
            updatedAt: property.updatedAt.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch properties:", error);
        return [];
    }
}

export async function addProperty(property: {
    title: string;
    description: string;
    type: string;
    price: number;
    isNegotiable: boolean;
    ownerName: string;
    ownerNumber: string;
    images: string[];
}) {
    try {
        const newProperty = await prisma.property.create({
            data: {
                title: property.title,
                description: property.description,
                type: property.type,
                price: property.price,
                isNegotiable: property.isNegotiable,
                ownerName: property.ownerName,
                ownerPhone: property.ownerNumber,
                images: property.images,
            },
        });

        revalidatePath("/admin/dashboard");
        return { success: true, data: newProperty };
    } catch (error) {
        console.error("Failed to add property:", error);
        return { success: false, error: "فشل في إضافة العقار" };
    }
}

export async function approveProperty(id: string) {
    try {
        await prisma.property.update({
            where: { id },
            data: { status: "APPROVED" },
        });
        revalidatePath("/admin/dashboard"); 
        return { success: true };
    } catch (error) {
        return { success: false, error: "فشل في قبول العقار" };
    }
}


export async function declineProperty(id: string) {
    try {
        await prisma.property.delete({
            where: { id },
        });
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
            return { success: false, error: "فشل في حذف العقار" };
    }
}


export async function markAsSold(id: string) {
    try {
        await prisma.property.update({
            where: { id },
            data: { status: "SOLD" },
        });
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
            return { success: false, error: "فشل في تحديث حالة العقار لمباع" };
    }
}