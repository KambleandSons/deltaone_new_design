import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BackOfficeProvider } from './context/BackOfficeContext';
import BackOfficeLayout from './layouts/BackOfficeLayout';

// Customer Pages
import DashboardPage from './pages/customer/DashboardPage';
import PurchasePage from './pages/customer/PurchasePage';
import BoosterPage from './pages/customer/BoosterPage';
import MyModulesPage from './pages/customer/MyModulesPage';
import FounderSeatsPage from './pages/customer/FounderSeatsPage';
import BalancesPage from './pages/customer/BalancesPage';
import ModuleManagementPage from './pages/customer/ModuleManagementPage';
import WithdrawPage from './pages/customer/WithdrawPage';
import AccountPage from './pages/customer/AccountPage';
import ActivityPage from './pages/customer/ActivityPage';
import HelpPage from './pages/customer/HelpPage';
import SignInPage from './pages/customer/SignInPage';

// Ambassador Pages
import AmbassadorDashboardPage from './pages/ambassador/AmbassadorDashboardPage';
import NetworkTreePage from './pages/ambassador/NetworkTreePage';
import DownlinePage from './pages/ambassador/DownlinePage';
import MyTeamPage from './pages/ambassador/MyTeamPage';
import CommissionsPage from './pages/ambassador/CommissionsPage';
import CommissionReportsPage from './pages/ambassador/CommissionReportsPage';
import CommissionProjectorPage from './pages/ambassador/CommissionProjectorPage';
import RankPage from './pages/ambassador/RankPage';
import WithdrawMatrixPage from './pages/ambassador/WithdrawMatrixPage';
import AmbassadorAccountPage from './pages/ambassador/AmbassadorAccountPage';

// Review & Companion Pages
import ReviewHubPage from './pages/review/ReviewHubPage';
import BeforeAfterPage from './pages/review/BeforeAfterPage';
import SignOffPage from './pages/review/SignOffPage';
import EditDeskPage from './pages/review/EditDeskPage';
import BoltDemoPage from './pages/review/BoltDemoPage';

export default function App() {
  return (
    <BrowserRouter>
      <BackOfficeProvider>
        <Routes>
          <Route index element={<SignInPage />} />
          <Route path="signin" element={<SignInPage />} />
          {/* Main Back Office Layout with Sidebar, Header, Bolt Mascot */}
          <Route path="/" element={<BackOfficeLayout />}>
            {/* Customer Routes */}
            {/* <Route index element={<DashboardPage />} /> */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="purchase" element={<PurchasePage />} />
            <Route path="booster" element={<BoosterPage />} />
            <Route path="my-modules" element={<MyModulesPage />} />
            <Route path="founder-seats" element={<FounderSeatsPage />} />
            <Route path="balances" element={<BalancesPage />} />
            <Route path="module-management" element={<ModuleManagementPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="help" element={<HelpPage />} />

            {/* Ambassador Routes */}
            <Route path="ambassador" element={<AmbassadorDashboardPage />} />
            <Route path="ambassador/dashboard" element={<AmbassadorDashboardPage />} />
            <Route path="ambassador/tree" element={<NetworkTreePage />} />
            <Route path="ambassador/downline" element={<DownlinePage />} />
            <Route path="ambassador/team" element={<MyTeamPage />} />
            <Route path="ambassador/commissions" element={<CommissionsPage />} />
            <Route path="ambassador/reports" element={<CommissionReportsPage />} />
            <Route path="ambassador/projector" element={<CommissionProjectorPage />} />
            <Route path="ambassador/rank" element={<RankPage />} />
            <Route path="ambassador/withdraw" element={<WithdrawMatrixPage />} />
            <Route path="ambassador/account" element={<AmbassadorAccountPage />} />
          </Route>

          {/* Standalone Review Hub & Companion Tools */}
          <Route path="/review" element={<ReviewHubPage />} />
          <Route path="/before-after" element={<BeforeAfterPage />} />
          <Route path="/sign-off" element={<SignOffPage />} />
          <Route path="/edit-desk" element={<EditDeskPage />} />
          <Route path="/bolt-demo" element={<BoltDemoPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BackOfficeProvider>
    </BrowserRouter>
  );
}
