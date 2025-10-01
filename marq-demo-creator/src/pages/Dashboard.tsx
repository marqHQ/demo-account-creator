import { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  ExternalLink,
  Copy,
  Edit3,
  Archive,
  Calendar,
  Users,
  Activity,
  Package,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  Circle
} from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

// Demo Account Types
interface DemoAccount {
  id: string;
  name: string;
  description?: string;
  package_type: 'marketing-agency' | 'enterprise' | 'small-business';
  demo_url: string;
  features: string[];
  tags: string[];
  created_by: string;
  created_at: Date;
  last_accessed?: Date;
  status: 'active' | 'expired' | 'draft';
  configuration: {
    templates: string[];
    branding?: {
      primaryColor?: string;
      logo?: string;
      companyName?: string;
    };
    users: number;
    settings?: Record<string, any>;
  };
}

interface DemoAccountFilters {
  search: string;
  package_type?: string;
  status?: string;
  tags?: string[];
  date_range?: {
    start: Date;
    end: Date;
  };
}

// Mock data for demo accounts
const mockDemoAccounts: DemoAccount[] = [
  {
    id: '1',
    name: 'Acme Corp Marketing Demo',
    description: 'Complete marketing suite for enterprise clients',
    package_type: 'marketing-agency',
    demo_url: 'https://demo.marq.com/acme-corp',
    features: ['Social Media Templates', 'Print Materials', 'Brand Guidelines'],
    tags: ['enterprise', 'marketing', 'b2b'],
    created_by: 'Spencer Kotter',
    created_at: new Date('2024-01-15'),
    last_accessed: new Date('2024-01-20'),
    status: 'active',
    configuration: {
      templates: ['social-media-pack', 'print-materials'],
      users: 10,
      branding: {
        primaryColor: '#0066cc',
        companyName: 'Acme Corporation'
      }
    }
  },
  {
    id: '2',
    name: 'TechStart Branding Package',
    description: 'Startup branding essentials with modern templates',
    package_type: 'small-business',
    demo_url: 'https://demo.marq.com/techstart',
    features: ['Basic Templates', 'Simple Branding', 'Easy Sharing'],
    tags: ['startup', 'tech', 'modern'],
    created_by: 'Sarah Johnson',
    created_at: new Date('2024-01-10'),
    last_accessed: new Date('2024-01-18'),
    status: 'active',
    configuration: {
      templates: ['startup-pack'],
      users: 5,
      branding: {
        primaryColor: '#ff6b35',
        companyName: 'TechStart Inc.'
      }
    }
  },
  {
    id: '3',
    name: 'Global Enterprise Suite',
    description: 'Large-scale brand management for international clients',
    package_type: 'enterprise',
    demo_url: 'https://demo.marq.com/global-enterprise',
    features: ['Advanced Templates', 'Multi-Brand Support', 'Compliance Tools', 'Analytics Dashboard'],
    tags: ['enterprise', 'global', 'compliance'],
    created_by: 'Mike Chen',
    created_at: new Date('2024-01-05'),
    status: 'draft',
    configuration: {
      templates: ['enterprise-suite', 'compliance-pack'],
      users: 100,
      branding: {
        primaryColor: '#28a745'
      }
    }
  },
  {
    id: '4',
    name: 'Creative Agency Portfolio',
    description: 'Showcase templates for creative agencies',
    package_type: 'marketing-agency',
    demo_url: 'https://demo.marq.com/creative-agency',
    features: ['Social Media Templates', 'Portfolio Layouts', 'Brand Guidelines'],
    tags: ['creative', 'agency', 'portfolio'],
    created_by: 'Lisa Rodriguez',
    created_at: new Date('2023-12-28'),
    last_accessed: new Date('2024-01-15'),
    status: 'expired',
    configuration: {
      templates: ['creative-pack', 'portfolio-templates'],
      users: 15,
      branding: {
        primaryColor: '#6f42c1',
        companyName: 'Creative Studio'
      }
    }
  }
];

const packageTypeLabels = {
  'marketing-agency': 'Marketing Agency',
  'enterprise': 'Enterprise',
  'small-business': 'Small Business'
};

const statusConfig = {
  active: { label: 'Active', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  expired: { label: 'Expired', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' },
  draft: { label: 'Draft', icon: Circle, color: 'text-gray-600 bg-gray-50 border-gray-200' }
};

export default function Dashboard() {
  const [demoAccounts] = useState<DemoAccount[]>(mockDemoAccounts);
  const [filters, setFilters] = useState<DemoAccountFilters>({
    search: '',
    package_type: '',
    status: '',
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredAccounts = useMemo(() => {
    return demoAccounts.filter(account => {
      const matchesSearch = filters.search === '' ||
        account.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        account.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        account.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesPackage = !filters.package_type || account.package_type === filters.package_type;
      const matchesStatus = !filters.status || account.status === filters.status;

      return matchesSearch && matchesPackage && matchesStatus;
    });
  }, [demoAccounts, filters]);

  const copyDemoUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Marq Logo/Branding */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">
                    Demo Manager
                  </h1>
                  <p className="text-sm text-gray-500">
                    Sales & CS Tool
                  </p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-gray-900">
                    Demo Manager
                  </h1>
                </div>
              </div>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Spencer Kotter</p>
                <p className="text-xs text-gray-500">Customer Success</p>
              </div>

              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">SK</span>
              </div>

              <Link
                to="/create"
                className="flex items-center px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md button-press"
              >
                <Plus size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">New Demo</span>
                <span className="sm:hidden">New</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 sm:p-6 mb-6 animate-slide-in-up">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search demos by name, description, or tags..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={clsx(
                "flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 button-press whitespace-nowrap",
                showFilters
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
              )}
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 animate-slide-in-up">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.package_type}
                  onChange={(e) => setFilters(prev => ({ ...prev, package_type: e.target.value }))}
                >
                  <option value="">All Packages</option>
                  <option value="marketing-agency">Marketing Agency</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="small-business">Small Business</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ search: '', package_type: '', status: '', tags: [] })}
                  className="w-full px-4 py-2 text-gray-600 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors button-press"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Demo Accounts Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden animate-slide-in-up">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50/50 border-b border-gray-200/50">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Demo Account
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Created
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden xl:table-cell">
                    Last Accessed
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50">
                {filteredAccounts.map((account, index) => {
                  const StatusIcon = statusConfig[account.status].icon;

                  return (
                    <tr
                      key={account.id}
                      className="hover:bg-gray-50/30 transition-colors animate-fade-in-scale stagger-animation"
                      style={{'--stagger-delay': `${index * 50}ms`}}
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-600 line-clamp-1">{account.description}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {account.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                            {account.tags.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                +{account.tags.length - 3}
                              </span>
                            )}
                          </div>
                          {/* Mobile-only info */}
                          <div className="lg:hidden mt-2 text-xs text-gray-500">
                            Created {account.created_at.toLocaleDateString()} by {account.created_by}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          {packageTypeLabels[account.package_type]}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <span className={clsx(
                          "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border",
                          statusConfig[account.status].color
                        )}>
                          <StatusIcon size={12} className="mr-1" />
                          {statusConfig[account.status].label}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {account.created_at.toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">by {account.created_by}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 hidden xl:table-cell">
                        {account.last_accessed ? (
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            {account.last_accessed.toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-gray-400">Never</span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => copyDemoUrl(account.demo_url)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded hover:bg-blue-50 button-press"
                            title="Copy demo URL"
                          >
                            <Copy size={14} />
                          </button>
                          <a
                            href={account.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-green-600 transition-colors rounded hover:bg-green-50 button-press"
                            title="Open demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                          <button
                            className="p-1.5 text-gray-400 hover:text-orange-600 transition-colors rounded hover:bg-orange-50 button-press"
                            title="Edit demo"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50 button-press"
                            title="Archive demo"
                          >
                            <Archive size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No demo accounts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filters.search || filters.package_type || filters.status
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first demo account."}
              </p>
              {!filters.search && !filters.package_type && !filters.status && (
                <div className="mt-6">
                  <Link
                    to="/create"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:scale-105 button-press"
                  >
                    <Plus size={16} className="mr-2" />
                    Create Your First Demo
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}