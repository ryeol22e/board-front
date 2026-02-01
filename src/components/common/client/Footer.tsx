import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <p>&copy; {new Date().getFullYear()} MyCompany. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="transition-colors hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
