import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PackageSelection from './pages/PackageSelection';
import AccountConfiguration from './pages/AccountConfiguration';
import TemplateManagement from './pages/TemplateManagement';
import ProgressDashboard from './pages/ProgressDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Main dashboard - no sidebar layout */}
          <Route path="/" element={<Dashboard />} />

          {/* Demo creation flow - full screen layout */}
          <Route path="/create" element={<PackageSelection />} />

          {/* Management pages - with sidebar layout */}
          <Route path="/demos/*" element={
            <Layout>
              <Routes>
                <Route path="configuration/:id" element={<AccountConfiguration />} />
                <Route path="templates/:id" element={<TemplateManagement />} />
                <Route path="progress/:id" element={<ProgressDashboard />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
