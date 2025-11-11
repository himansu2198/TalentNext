Clerk integration - steps

What I changed

- Replaced your `SessionProvider` with `ClerkProvider` in `src/components/providers/auth-provider.tsx`.
- Added Clerk auth middleware in `src/middleware.ts` (protects `/api/*`).
- Replaced the custom login/signup pages with Clerk's `SignIn` / `SignUp` components in `src/app/auth/*/page.tsx`.

Manual steps you must perform

1. Install Clerk packages

   npm install @clerk/nextjs

   or

   pnpm add @clerk/nextjs

2. Add Clerk environment variables to `.env.local` (get these from your Clerk dashboard):

   # Example placeholders (replace with real values from Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="clerk.publ_..."
   CLERK_SECRET_KEY="sk_..."
   NEXT_PUBLIC_CLERK_FRONTEND_API="your-clerk-frontend-api"  # sometimes required

3. Configure Clerk in the dashboard to add your application origin (e.g., http://localhost:3000) and set redirect URLs if you use hosted auth.

4. Restart dev server

   npm run dev

Notes and tips

- The app now expects `@clerk/nextjs` to be installed. If you prefer NextAuth instead, revert the provider change.
- The middleware currently protects `/api/:path*`. If you'd like to protect pages or other paths, update `src/middleware.ts`'s `matcher`.
- Clerk's `SignIn` and `SignUp` components are highly configurable. See https://clerk.com/docs for customization and social providers.

If you'd like, I can also:

- Add the Clerk package to `package.json` and run the install for you (I can run the install command here),
- Configure more precise route protection, or
- Replace social login buttons with Clerk-hosted OAuth providers.
