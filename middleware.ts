import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // تحديد مسار الداشبورد المحمي
    const isAdminDashboard = path.startsWith('/admin/dashboard');
    const isAdminLogin = path === '/admin/login';

  // جلب الكوكي الخاصة بجلسة الـ Admin
    const adminSession = request.cookies.get('admin_session')?.value;

  // 1. إذا حاول دخول الداشبورد بدون كوكي -> وجهه لصفحة الـ Login
    if (isAdminDashboard && !adminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

  // 2. إذا كان مسجل دخوله بالفعل وحاول فتح صفحة الـ Login -> وجهه للداشبورد مباشرة
    if (isAdminLogin && adminSession) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

// تشغيل الـ Middleware فقط على مسارات الـ Admin لتوفير الأداء
export const config = {
    matcher: ['/admin/:path*'],
}