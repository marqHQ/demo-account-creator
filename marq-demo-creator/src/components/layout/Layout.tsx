import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Package,
  Settings,
  FileText,
  Activity,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

interface LayoutProps {
  children: ReactNode;
}

const navigationItems = [
  {
    name: 'Package Selection',
    href: '/',
    icon: Package,
  },
  {
    name: 'Account Configuration',
    href: '/configuration',
    icon: Settings,
  },
  {
    name: 'Template Management',
    href: '/templates',
    icon: FileText,
  },
  {
    name: 'Progress Dashboard',
    href: '/progress',
    icon: Activity,
  },
];

export default function Layout({ children }: LayoutProps) {

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Marq Demo Creator</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
              <ChevronRight className="ml-auto h-4 w-4" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Internal CS/Sales Tool
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
}