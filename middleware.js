// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const res = NextResponse.next();

    const token = await getToken({ req });
    if (pathname.startsWith("/login") && token) {
        const url = new URL(`/`, req.url);
        return NextResponse.redirect(url);
    }

    if (!pathname.startsWith("/login") && !token) {
        const url = new URL(`/login`, req.url);
        url.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(url);
    }

    return res;
}

export const config = {
    matcher: ["/", "/login", "/user/:path*", "/upload/:path*"],
};
