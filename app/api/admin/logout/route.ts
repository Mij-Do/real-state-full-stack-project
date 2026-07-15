import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true, message: 'تم تسجيل الخروج' });
    
    // مسح الكوكي عن طريق جعل تاريخ انتهاء صلاحيتها في الماضي
    response.cookies.set('admin_session', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
    });

    return response;
}