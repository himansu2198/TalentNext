
import Navbar from '@/components/layout/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className='pt-16'> {/* Add padding for fixed navbar */}
        {children}
      </div>
    </div>
  )
}

