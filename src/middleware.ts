import { clerkMiddleware } from '@clerk/nextjs/server'

// Use the default clerkMiddleware implementation from the docs.
// Keep auth routes public by not matching them in the middleware matcher.
export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, but DO NOT match /auth routes
    '/((?!_next|auth|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
