import { SignInButton, SignUpButton } from '@clerk/clerk-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to AI Project
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern React application with Clerk authentication and a clean API
            layer for your Python backend services.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-indigo-600">
                Sign Up
              </button>
            </SignUpButton>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="🔐 Secure Authentication"
            description="Built-in Clerk authentication with protected routes and automatic token management."
          />
          <FeatureCard
            title="🚀 Modern API Layer"
            description="Clean, type-safe API client with automatic token attachment and error handling."
          />
          <FeatureCard
            title="⚡ React Query"
            description="Powerful caching, loading states, and optimistic updates out of the box."
          />
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Built With</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <TechBadge>React 18</TechBadge>
            <TechBadge>TypeScript</TechBadge>
            <TechBadge>Vite</TechBadge>
            <TechBadge>Clerk Auth</TechBadge>
            <TechBadge>React Query</TechBadge>
            <TechBadge>Wouter</TechBadge>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-20 bg-white rounded-xl shadow-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Getting Started
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Sign up or sign in with Clerk authentication</li>
            <li>Explore the Dashboard to see protected routes</li>
            <li>Check your Profile page with user information</li>
            <li>Review the API layer in <code className="bg-gray-100 px-2 py-1 rounded">/lib/api</code></li>
            <li>Connect to your Python backend services</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium">
      {children}
    </span>
  );
}
