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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F2F4F6]">
      <div className="container mx-auto flex items-center justify-between px-4 h-[60px]">
        {/* Left Section: Logo and Menu */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-[#191F28]">
            MyLogo
          </Link>
          <nav className="hidden space-x-6 md:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[#4E5968] font-medium transition-colors hover:text-[#191F28] hover:bg-[#F2F4F6] px-3 py-2 rounded-lg"
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
              <span className="text-[#333D4B] font-medium">
                Welcome, {userInfo?.userName}!
              </span>
              <Link
                href="/mypage"
                className="text-[#4E5968] font-medium transition-colors hover:text-[#191F28]"
              >
                My Page
              </Link>
              <Link
                href="/"
                className="text-[#4E5968] font-medium transition-colors hover:text-[#191F28]"
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
                className="px-4 py-2 text-[#3182F6] bg-[#3182F6]/10 rounded-lg font-semibold transition-colors hover:bg-[#3182F6]/20"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-[#3182F6] text-white rounded-lg font-semibold transition-colors hover:bg-[#1B64DA]"
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
