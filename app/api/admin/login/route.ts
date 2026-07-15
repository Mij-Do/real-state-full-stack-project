import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        // الباسورد السري المحفوظ في ملف الـ .env (مثال: ADMIN_PASSWORD=BeniSuefAdmin2026)
        const securePassword = process.env.ADMIN_PASSWORD;

        if (!securePassword) {
            return NextResponse.json(
                { message: 'خطأ في إعدادات الخادم، الباسورد غير مضبوط.' },
                { status: 500 }
            );
        }

        if (password === securePassword) {
            const response = NextResponse.json({ success: true, message: 'تم تسجيل الدخول بنجاح!' });

        // تعيين الكوكي وتأمينها (تنتهي بعد 7 أيام)
            response.cookies.set('admin_session', 'true', {
                httpOnly: true, // تمنع سرقتها عن طريق كود JS خبيث في المتصفح
                secure: process.env.NODE_ENV === 'production', // تعمل فقط على HTTPS في الـ Production
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 أيام بالثواني
                path: '/',
            });

            return response;
        }

        return NextResponse.json(
            { message: 'كلمة المرور غير صحيحة!' },
            { status: 401 }
        );
        } catch (error) {
            return NextResponse.json({ message: 'حدث خطأ ما في السيرفر' }, { status: 500 });
    }
}