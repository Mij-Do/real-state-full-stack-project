"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            // إعادة توجيه للداشبورد وتحديث الـ router لمراعاة الـ Middleware
            router.refresh();
            router.push("/admin/dashboard");
        } else {
            setError(data.message || "حدث خطأ غير متوقع");
        }
        } catch (err) {
        setError("فشل الاتصال بالخادم، حاول مجدداً.");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 font-cairo">تسجيل دخول الإدارة</h1>
            <p className="text-sm text-slate-500 mt-1">أدخل كلمة المرور السرية للوصول للوحة التحكم</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">كلمة المرور</label>
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-left"
                />
            </div>

            {error && (
                <div className="text-sm bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 font-medium">
                ⚠️ {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
            >
                {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" /> جاري التحقق...
                </>
                ) : (
                "دخول"
                )}
            </button>
            </form>
        </div>
        </div>
    );
}