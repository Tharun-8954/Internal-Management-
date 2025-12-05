import { useState } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LoginPage from "@/components/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import SalesManagerDashboard from "@/pages/SalesManagerDashboard";
import SalesEmployeeDashboard from "@/pages/SalesEmployeeDashboard";
import CandidateProfile from "@/pages/CandidateProfile";
import DeveloperDashboard from "@/pages/DeveloperDashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

import UsersManagement from "@/pages/admin/UsersManagement";
import UserDetail from "@/pages/admin/UserDetail";
import Batches from "@/pages/admin/Batches";
import BatchDetail from "@/pages/admin/BatchDetail";
import AllCandidates from "@/pages/admin/AllCandidates";
import AssignCandidate from "@/pages/admin/AssignCandidate";
import Reports from "@/pages/admin/Reports";
import AdminSubmissions from "@/pages/admin/Submissions";
import AdminSubmissionDetail from "@/pages/admin/SubmissionDetail";
import AdminAssignments from "@/pages/admin/Assignments";
import AdminInterviews from "@/pages/admin/Interviews";
import AdminJobs from "@/pages/admin/Jobs";
import AdminJobDetail from "@/pages/admin/JobDetail";

import MyTeam from "@/pages/manager/MyTeam";
import TeamMemberDetail from "@/pages/manager/TeamMemberDetail";
import ManagerAllCandidates from "@/pages/manager/AllCandidates";
import ManagerCandidateDetail from "@/pages/manager/CandidateDetail";
import ManagerSubmissions from "@/pages/manager/Submissions";
import ManagerSubmissionDetail from "@/pages/manager/SubmissionDetail";
import Assignments from "@/pages/manager/Assignments";
import ManagerBatches from "@/pages/manager/Batches";
import ManagerBatchDetail from "@/pages/manager/BatchDetail";

import SalesMyCandidates from "@/pages/sales/MyCandidates";
import SalesCandidateDetail from "@/pages/sales/CandidateDetail";
import SalesSubmissions from "@/pages/sales/Submissions";
import NewSubmission from "@/pages/sales/NewSubmission";
import SubmissionDetail from "@/pages/sales/SubmissionDetail";

import MyProgress from "@/pages/candidate/Progress";
import Interviews from "@/pages/candidate/Interviews";
import Resources from "@/pages/candidate/Resources";

import Projects from "@/pages/developer/Projects";
import ProjectDetail from "@/pages/developer/ProjectDetail";
import CodeReviews from "@/pages/developer/CodeReviews";
import Documentation from "@/pages/developer/Documentation";
import GitActivity from "@/pages/developer/GitActivity";

function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [, setLocation] = useLocation();

  const handleLogin = (email: string, role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    
    const dashboardPaths = {
      admin: '/admin/dashboard',
      sales_manager: '/manager/dashboard',
      sales_employee: '/sales/dashboard',
      candidate: '/candidate/dashboard',
      developer: '/dev/dashboard',
    };
    
    setLocation(dashboardPaths[role as keyof typeof dashboardPaths] || '/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setLocation('/');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Switch>
      {/* Admin Routes - Has access to ALL functionalities */}
      {userRole === 'admin' && (
        <>
          {/* Admin-specific routes */}
          <Route path="/admin/dashboard" component={() => <AdminDashboard onLogout={handleLogout} />} />
          <Route path="/admin/users" component={() => <UsersManagement onLogout={handleLogout} />} />
          <Route path="/admin/users/:id" component={() => <UserDetail onLogout={handleLogout} />} />
          <Route path="/admin/batches" component={() => <Batches onLogout={handleLogout} />} />
          <Route path="/admin/batches/:id/assign" component={() => <AssignCandidate onLogout={handleLogout} />} />
          <Route path="/admin/batches/:id" component={() => <BatchDetail onLogout={handleLogout} />} />
          <Route path="/admin/candidates" component={() => <AllCandidates onLogout={handleLogout} />} />
          <Route path="/admin/submissions" component={() => <AdminSubmissions onLogout={handleLogout} />} />
          <Route path="/admin/submissions/:id" component={() => <AdminSubmissionDetail onLogout={handleLogout} />} />
          <Route path="/admin/interviews" component={() => <AdminInterviews onLogout={handleLogout} />} />
          <Route path="/admin/jobs" component={() => <AdminJobs onLogout={handleLogout} />} />
          <Route path="/admin/jobs/:id" component={() => <AdminJobDetail onLogout={handleLogout} />} />
          <Route path="/admin/assignments" component={() => <AdminAssignments onLogout={handleLogout} />} />
          <Route path="/admin/reports" component={() => <Reports onLogout={handleLogout} />} />
          
          {/* Sales Manager routes accessible to admin */}
          <Route path="/manager/dashboard" component={() => <SalesManagerDashboard onLogout={handleLogout} />} />
          <Route path="/manager/team" component={() => <MyTeam onLogout={handleLogout} />} />
          <Route path="/manager/team/:id" component={() => <TeamMemberDetail onLogout={handleLogout} />} />
          <Route path="/manager/candidates" component={() => <ManagerAllCandidates onLogout={handleLogout} />} />
          <Route path="/manager/candidates/:id" component={() => <ManagerCandidateDetail onLogout={handleLogout} />} />
          <Route path="/manager/submissions" component={() => <ManagerSubmissions onLogout={handleLogout} />} />
          <Route path="/manager/submissions/:id" component={() => <ManagerSubmissionDetail onLogout={handleLogout} />} />
          <Route path="/manager/assignments" component={() => <Assignments onLogout={handleLogout} />} />
          <Route path="/manager/batches" component={() => <ManagerBatches onLogout={handleLogout} />} />
          <Route path="/manager/batches/:id" component={() => <ManagerBatchDetail onLogout={handleLogout} />} />
          
          {/* Sales Employee routes accessible to admin */}
          <Route path="/sales/dashboard" component={() => <SalesEmployeeDashboard onLogout={handleLogout} />} />
          <Route path="/sales/candidates" component={() => <SalesMyCandidates onLogout={handleLogout} />} />
          <Route path="/sales/candidates/:id" component={() => <SalesCandidateDetail onLogout={handleLogout} />} />
          <Route path="/sales/submissions" component={() => <SalesSubmissions onLogout={handleLogout} />} />
          <Route path="/sales/submissions/new" component={() => <NewSubmission onLogout={handleLogout} />} />
          <Route path="/sales/submissions/:id" component={() => <SubmissionDetail onLogout={handleLogout} />} />
          
          {/* Candidate routes accessible to admin */}
          <Route path="/candidate/dashboard" component={() => <CandidateProfile onLogout={handleLogout} />} />
          <Route path="/candidate/progress" component={() => <MyProgress onLogout={handleLogout} />} />
          <Route path="/candidate/interviews" component={() => <Interviews onLogout={handleLogout} />} />
          <Route path="/candidate/resources" component={() => <Resources onLogout={handleLogout} />} />
          
          {/* Developer routes accessible to admin */}
          <Route path="/dev/dashboard" component={() => <DeveloperDashboard onLogout={handleLogout} />} />
          <Route path="/dev/projects" component={() => <Projects onLogout={handleLogout} />} />
          <Route path="/dev/projects/:id" component={() => <ProjectDetail onLogout={handleLogout} />} />
          <Route path="/dev/reviews" component={() => <CodeReviews onLogout={handleLogout} />} />
          <Route path="/dev/docs" component={() => <Documentation onLogout={handleLogout} />} />
          <Route path="/dev/git" component={() => <GitActivity onLogout={handleLogout} />} />
          
          {/* Common routes */}
          <Route path="/profile" component={() => <Profile onLogout={handleLogout} />} />
          <Route path="/settings" component={() => <Settings onLogout={handleLogout} />} />
        </>
      )}

      {/* Sales Manager Routes */}
      {userRole === 'sales_manager' && (
        <>
          <Route path="/manager/dashboard" component={() => <SalesManagerDashboard onLogout={handleLogout} />} />
          <Route path="/manager/team" component={() => <MyTeam onLogout={handleLogout} />} />
          <Route path="/manager/team/:id" component={() => <TeamMemberDetail onLogout={handleLogout} />} />
          <Route path="/manager/candidates" component={() => <ManagerAllCandidates onLogout={handleLogout} />} />
          <Route path="/manager/candidates/:id" component={() => <ManagerCandidateDetail onLogout={handleLogout} />} />
          <Route path="/manager/submissions" component={() => <ManagerSubmissions onLogout={handleLogout} />} />
          <Route path="/manager/submissions/:id" component={() => <ManagerSubmissionDetail onLogout={handleLogout} />} />
          <Route path="/manager/assignments" component={() => <Assignments onLogout={handleLogout} />} />
          <Route path="/manager/batches" component={() => <ManagerBatches onLogout={handleLogout} />} />
          <Route path="/manager/batches/:id" component={() => <ManagerBatchDetail onLogout={handleLogout} />} />
          <Route path="/profile" component={() => <Profile onLogout={handleLogout} />} />
          <Route path="/settings" component={() => <Settings onLogout={handleLogout} />} />
        </>
      )}

      {/* Sales Employee Routes */}
      {userRole === 'sales_employee' && (
        <>
          <Route path="/sales/dashboard" component={() => <SalesEmployeeDashboard onLogout={handleLogout} />} />
          <Route path="/sales/candidates" component={() => <SalesMyCandidates onLogout={handleLogout} />} />
          <Route path="/sales/candidates/:id" component={() => <SalesCandidateDetail onLogout={handleLogout} />} />
          <Route path="/sales/submissions" component={() => <SalesSubmissions onLogout={handleLogout} />} />
          <Route path="/sales/submissions/new" component={() => <NewSubmission onLogout={handleLogout} />} />
          <Route path="/sales/submissions/:id" component={() => <SubmissionDetail onLogout={handleLogout} />} />
          <Route path="/profile" component={() => <Profile onLogout={handleLogout} />} />
          <Route path="/settings" component={() => <Settings onLogout={handleLogout} />} />
        </>
      )}

      {/* Candidate Routes */}
      {userRole === 'candidate' && (
        <>
          <Route path="/candidate/dashboard" component={() => <CandidateProfile onLogout={handleLogout} />} />
          <Route path="/candidate/progress" component={() => <MyProgress onLogout={handleLogout} />} />
          <Route path="/candidate/interviews" component={() => <Interviews onLogout={handleLogout} />} />
          <Route path="/candidate/resources" component={() => <Resources onLogout={handleLogout} />} />
          <Route path="/profile" component={() => <Profile onLogout={handleLogout} />} />
          <Route path="/settings" component={() => <Settings onLogout={handleLogout} />} />
        </>
      )}

      {/* Developer Routes */}
      {userRole === 'developer' && (
        <>
          <Route path="/dev/dashboard" component={() => <DeveloperDashboard onLogout={handleLogout} />} />
          <Route path="/dev/projects" component={() => <Projects onLogout={handleLogout} />} />
          <Route path="/dev/projects/:id" component={() => <ProjectDetail onLogout={handleLogout} />} />
          <Route path="/dev/reviews" component={() => <CodeReviews onLogout={handleLogout} />} />
          <Route path="/dev/docs" component={() => <Documentation onLogout={handleLogout} />} />
          <Route path="/dev/git" component={() => <GitActivity onLogout={handleLogout} />} />
          <Route path="/profile" component={() => <Profile onLogout={handleLogout} />} />
          <Route path="/settings" component={() => <Settings onLogout={handleLogout} />} />
        </>
      )}

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
