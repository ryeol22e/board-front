'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#F2F4F6]">
        <span className="text-5xl">🤔</span>
      </div>
      <h2 className="mb-3 text-2xl font-bold text-[#191F28] md:text-3xl">
        페이지를 찾을 수 없어요
      </h2>
      <p className="mb-10 max-w-md break-keep text-[#4E5968] md:text-lg">
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨어요.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-[#3182F6] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#1B64DA] active:scale-[0.98]"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
