'use client';

import { clearCache } from '@/actions/common';
import { useGlobalStore } from '@/contexts/GlobalContext';
import { appFetch } from '@/utils/fetch/app-fetch';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const { push } = useRouter();
  const { isLogin, userInfo } = useGlobalStore((state) => state);

  const handleLogout = async () => {
    const { data } = await appFetch<boolean>('/api/logout', {
      method: 'post',
    }).catch(() => ({
      data: false,
    }));

    if (data) {
      clearCache();
      push('/');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Left Section: Logo and Menu */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            MyLogo
          </Link>
          <nav className="hidden space-x-6 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Auth Links */}
        <div className="flex items-center space-x-4">
          {isLogin ? (
            <>
              <span className="text-gray-700">
                Welcome, {userInfo?.userName}!
              </span>
              <Link
                href="/mypage"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                My Page
              </Link>
              <Link
                href="/"
                className="text-gray-600 transition-colors hover:text-gray-900"
                onNavigate={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
