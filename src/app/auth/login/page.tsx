'use client'

import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  // Use Clerk's prebuilt SignIn component to handle authentication.
  // See docs/CLERK_INTEGRATION.md for setup steps.
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-8'>
          <SignIn routing='hash' />
        </div>
      </div>
    </div>
  )
}
