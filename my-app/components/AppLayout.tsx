import Link from 'next/link'
import { Home, Search, Users, Star, User } from 'lucide-react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/" className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-indigo-600">MediaRater</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            <nav className="bg-white shadow-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between py-4">
                        <Link href="/" className="text-gray-600 hover:text-indigo-600">
                            <Home className="mx-auto h-6 w-6" />
                            <span className="sr-only">Home</span>
                        </Link>
                        <Link href="/search" className="text-gray-600 hover:text-indigo-600">
                            <Search className="mx-auto h-6 w-6" />
                            <span className="sr-only">Search</span>
                        </Link>
                        <Link href="/groups" className="text-gray-600 hover:text-indigo-600">
                            <Users className="mx-auto h-6 w-6" />
                            <span className="sr-only">Groups</span>
                        </Link>
                        <Link href="/ratings" className="text-gray-600 hover:text-indigo-600">
                            <Star className="mx-auto h-6 w-6" />
                            <span className="sr-only">My Ratings</span>
                        </Link>
                        <Link href="/profile" className="text-gray-600 hover:text-indigo-600">
                            <User className="mx-auto h-6 w-6" />
                            <span className="sr-only">Profile</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}