import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { AnalyticsContent } from '@/components/analytics/AnalyticsContent';
import { ContactsContent } from '@/components/contacts/ContactsContent';
import { ContactDetailView } from '@/components/contacts/detail/ContactDetailView';
import { UserManagementContent } from '@/components/users/UserManagementContent';
import { CampaignContent } from '@/components/campaigns/CampaignContent';
import { Hero } from '@/components/sections/Hero';
import { Benefits } from '@/components/sections/Benefits';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SignInPage } from '@/components/auth/SignInPage';
import { SignUpPage } from '@/components/auth/SignUpPage';
import { useEffect, useState } from 'react';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  // Public landing page
  if (currentPath === '/') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Benefits />
          <Features />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    );
  }

  // Auth pages
  if (currentPath === '/sign-in') {
    return <SignInPage />;
  }

  if (currentPath === '/sign-up') {
    return <SignUpPage />;
  }

  // Protected routes
  return (
    <>
      <SignedIn>
        <DashboardLayout>
          {currentPath === '/dashboard' && <DashboardContent />}
          {currentPath === '/dashboard/analytics' && <AnalyticsContent />}
          {currentPath === '/dashboard/campaigns' && <CampaignContent />}
          {currentPath === '/dashboard/contacts' && <ContactsContent />}
          {currentPath.startsWith('/dashboard/contacts/') && <ContactDetailView />}
          {currentPath === '/dashboard/usermanagement' && <UserManagementContent />}
        </DashboardLayout>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default App;