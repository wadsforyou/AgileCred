import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Loans from '@/pages/Loans';
import LoanCategory from '@/pages/LoanCategory';
import BusinessSupport from '@/pages/BusinessSupport';
import Calculator from '@/pages/Calculator';
import Apply from '@/pages/Apply';
import Contact from '@/pages/Contact';
import Careers from '@/pages/Careers';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminApplications from '@/pages/admin/Applications';
import AdminApplicationDetail from '@/pages/admin/ApplicationDetail';
import AdminApplicants from '@/pages/admin/Applicants';
import AdminDocuments from '@/pages/admin/Documents';
import AdminProducts from '@/pages/admin/Products';
import AdminCalculatorConfig from '@/pages/admin/CalculatorConfig';
import AdminEditWebsiteContent from '@/pages/admin/EditWebsiteContent';
import AdminEnquiries from '@/pages/admin/Enquiries';
import AdminCareers from '@/pages/admin/Careers';
import AdminLocations from '@/pages/admin/Locations';
import AdminReports from '@/pages/admin/Reports';
import AdminStaff from '@/pages/admin/Staff';
import AdminNotifications from '@/pages/admin/Notifications';
import AdminActivityLog from '@/pages/admin/ActivityLog';
import AdminSettings from '@/pages/admin/Settings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/applications/:id" element={<AdminApplicationDetail />} />
          <Route path="/admin/applicants" element={<AdminApplicants />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/calculator" element={<AdminCalculatorConfig />} />
          <Route path="/admin/website-content" element={<AdminEditWebsiteContent />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          <Route path="/admin/careers" element={<AdminCareers />} />
          <Route path="/admin/locations" element={<AdminLocations />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/activity-log" element={<AdminActivityLog />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/loans/:slug" element={<LoanCategory />} />
        <Route path="/business-support" element={<BusinessSupport />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default 