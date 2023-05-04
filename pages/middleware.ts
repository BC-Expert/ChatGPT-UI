import { NextRequest, NextResponse } from 'next/server'

export function middleware ( req: NextRequest, res: NextResponse) {
    const url = req.nextUrl
    if (
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ) {
      const basicAuth = req.headers.get('authorization')
      if (basicAuth) {
        const authValue = basicAuth.split('')[1]
        const [user, pwd] = atob(authValue).split(':')
  
        if (user === process.env.BASIC_USERNAME && pwd === process.env.BASIC_PASSWORD) {
          return NextResponse.next()
        }
      }
      url.pathname = '/api/auth'
    }
}