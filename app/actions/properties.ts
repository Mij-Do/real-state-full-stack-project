"use server";

import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";


export async function getPropertiesByStatus(status: "PENDING" | "APPROVED" | "SOLD") {
    try {
        return await prisma.property.findMany({
        where: { status },
        orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error("Failed to fetch properties:", error);
        return [];
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