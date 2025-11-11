'use client'

// Clerk provider wraps the app and supplies authentication context.
// Requires installing @clerk/nextjs and configuring Clerk env vars (see docs/CLERK_INTEGRATION.md).
import { ClerkProvider } from '@clerk/nextjs'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClerkProvider>{children}</ClerkProvider>
}
