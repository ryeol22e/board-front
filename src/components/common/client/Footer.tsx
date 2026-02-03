import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F9FAFB] text-[#8B95A1] border-t border-[#F2F4F6]">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-medium">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#4E5968]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-[#4E5968]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
