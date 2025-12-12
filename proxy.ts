import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getOrCreateDb from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storage.collection'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    await Promise.all([
        getOrCreateDb(),
        getOrCreateStorage()
    ]);
    /* const path = request.nextUrl.pathname;
    console.log("path:",path)
    const isPublicpath =  path === "/login" || "/register"
    console.log("path2:",isPublicpath)
    const authToken = request.cookies.get('auth-token')?.value;
    console.log(authToken)
    if (authToken && isPublicpath) {
      return NextResponse.redirect(new URL("/",request.nextUrl));
    } 
    if(!authToken && !isPublicpath) {
       return NextResponse.redirect(new URL("/login",request.nextUrl))
    } */
   return NextResponse.next();
}
 

// See "Matching Paths" below to learn more
export const config = {
    /* 
    match all request paths except for the ones that
    starts with:
    - api
    - _next/image
    - _next/static
    - favicon.com
    */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    '/login',
    '/register',
  ],
}