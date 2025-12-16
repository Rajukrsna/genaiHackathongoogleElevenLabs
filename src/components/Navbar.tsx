import { Link, useLocation } from 'wouter';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard', protected: true },
    { href: '/profile', label: 'Profile', protected: true },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 text-xl font-bold text-indigo-600 hover:text-indigo-700">
              <span>🚀</span>
              <span>AI Project</span>
            </a>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <SignedIn key={link.href}>
                <Link href={link.href}>
                  <a
                    className={`font-medium transition-colors ${
                      location === link.href
                        ? 'text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    {link.label}
                  </a>
                </Link>
              </SignedIn>
            ))}

            {/* Show only Home for signed out users */}
            <SignedOut>
              <Link href="/">
                <a
                  className={`font-medium transition-colors ${
                    location === '/'
                      ? 'text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  Home
                </a>
              </Link>
            </SignedOut>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Signed Out - Show Sign In/Up Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            {/* Signed In - Show User Button */}
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
