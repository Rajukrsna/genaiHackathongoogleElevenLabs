import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Component to protect routes - requires authentication
 * Redirects to sign-in if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
