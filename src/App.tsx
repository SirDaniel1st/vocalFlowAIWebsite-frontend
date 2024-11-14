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

  if (currentPath === '/dashboard') {
    return (
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/analytics') {
    return (
      <DashboardLayout>
        <AnalyticsContent />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/campaigns') {
    return (
      <DashboardLayout>
        <CampaignContent />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/contacts') {
    return (
      <DashboardLayout>
        <ContactsContent />
      </DashboardLayout>
    );
  }

  if (currentPath.startsWith('/dashboard/contacts/')) {
    return (
      <DashboardLayout>
        <ContactDetailView />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/usermanagement') {
    return (
      <DashboardLayout>
        <UserManagementContent />
      </DashboardLayout>
    );
  }

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

export default App;