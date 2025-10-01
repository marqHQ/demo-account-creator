import { useState } from 'react';
import { Check, ChevronRight, ChevronDown, Users, Zap, Building, ExternalLink, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

interface DemoStep {
  id: string;
  number: number;
  title: string;
  description: string;
  completed: boolean;
  expanded: boolean;
  illustration: string;
  actionLabel: string;
  content?: React.ReactNode;
}

interface DemoPackage {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  templates: number;
  users: number;
  features: string[];
  recommended?: boolean;
}

const demoPackages: DemoPackage[] = [
  {
    id: 'marketing-agency',
    name: 'Marketing Agency',
    description: 'Complete marketing materials for agencies',
    icon: Zap,
    templates: 25,
    users: 10,
    features: ['Social Media Templates', 'Print Materials', 'Brand Guidelines', 'Campaign Assets'],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Solution',
    description: 'Large-scale brand management suite',
    icon: Building,
    templates: 50,
    users: 100,
    features: ['Advanced Templates', 'Multi-Brand Support', 'Compliance Tools', 'Analytics Dashboard'],
  },
  {
    id: 'small-business',
    name: 'Small Business',
    description: 'Essential templates for growing businesses',
    icon: Users,
    templates: 15,
    users: 5,
    features: ['Basic Templates', 'Simple Branding', 'Easy Sharing', 'Quick Setup'],
  },
];

export default function PackageSelection() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['package-selection']));

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setCompletedSteps(prev => new Set(prev).add('package-selection'));
  };

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const markStepDone = (stepId: string) => {
    setCompletedSteps(prev => new Set(prev).add(stepId));
  };

  const steps: DemoStep[] = [
    {
      id: 'package-selection',
      number: 1,
      title: 'Select Demo Package',
      description: 'Choose from predefined industry-specific demo packages to get started quickly',
      completed: completedSteps.has('package-selection'),
      expanded: expandedSteps.has('package-selection'),
      illustration: '📦',
      actionLabel: 'Configure Package',
    },
    {
      id: 'account-setup',
      number: 2,
      title: 'Set up Account Details',
      description: 'Configure company information, branding, and user settings',
      completed: completedSteps.has('account-setup'),
      expanded: expandedSteps.has('account-setup'),
      illustration: '⚙️',
      actionLabel: 'Configure Account',
    },
    {
      id: 'template-selection',
      number: 3,
      title: 'Choose Templates',
      description: 'Select and customize templates for your demo environment',
      completed: completedSteps.has('template-selection'),
      expanded: expandedSteps.has('template-selection'),
      illustration: '🎨',
      actionLabel: 'Browse Templates',
    },
    {
      id: 'review-deploy',
      number: 4,
      title: 'Review & Deploy',
      description: 'Review your configuration and deploy the demo account',
      completed: completedSteps.has('review-deploy'),
      expanded: expandedSteps.has('review-deploy'),
      illustration: '🚀',
      actionLabel: 'Deploy Demo',
    },
  ];

  const completedCount = Array.from(completedSteps).length;
  const totalSteps = steps.length;
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Progress */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center animate-fade-in-scale">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-gray-600 hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 button-press mr-4"
              >
                <ArrowLeft size={16} className="mr-1" />
                Dashboard
              </Link>
              <span className="text-2xl mr-2 animate-pulse-slow">👋</span>
              <h1 className="text-2xl font-medium text-gray-900">
                You're on your way to creating your demo account
              </h1>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative animate-slide-in-up" style={{animationDelay: '100ms'}}>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 font-medium">
              {completedCount} of {totalSteps} steps completed
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover-lift overflow-hidden animate-fade-in-scale stagger-animation"
              style={{'--stagger-delay': `${index * 100}ms`}}
            >
              {/* Step Header */}
              <div
                className="flex items-center p-6 cursor-pointer hover:bg-gray-50/50 transition-all duration-200"
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex items-center flex-1">
                  <div className={clsx(
                    "flex items-center justify-center w-10 h-10 rounded-full mr-4 text-sm font-medium transition-all duration-300 hover:scale-105",
                    step.completed
                      ? "bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg shadow-green-200"
                      : "bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-200"
                  )}>
                    {step.completed ? (
                      <Check size={16} className="animate-fade-in-scale" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="ml-4">
                  <div className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                    {step.expanded ? (
                      <ChevronDown className="text-gray-400 transition-transform duration-200" size={20} />
                    ) : (
                      <ChevronRight className="text-gray-400 transition-transform duration-200" size={20} />
                    )}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {step.expanded && (
                <div className="border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/30 animate-slide-in-up">
                  {step.id === 'package-selection' && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {demoPackages.map((pkg, pkgIndex) => (
                          <div
                            key={pkg.id}
                            className={clsx(
                              'relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-lift animate-fade-in-scale stagger-animation group',
                              selectedPackage === pkg.id
                                ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-white shadow-lg shadow-blue-100/50'
                                : 'border-gray-200 bg-gradient-to-br from-white to-gray-50/30 hover:border-blue-200',
                              pkg.recommended && 'ring-2 ring-blue-200/30'
                            )}
                            style={{'--stagger-delay': `${pkgIndex * 50}ms`}}
                            onClick={() => handlePackageSelect(pkg.id)}
                          >
                            {pkg.recommended && (
                              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                Recommended
                              </div>
                            )}

                            <div className="flex items-start mb-3">
                              <div className={clsx(
                                'p-2 rounded-lg mr-3',
                                selectedPackage === pkg.id ? 'bg-blue-50' : 'bg-gray-50'
                              )}>
                                <pkg.icon
                                  size={20}
                                  className={selectedPackage === pkg.id ? 'text-blue-600' : 'text-gray-600'}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">{pkg.name}</h4>
                                <p className="text-sm text-gray-600">{pkg.description}</p>
                              </div>
                              {selectedPackage === pkg.id && (
                                <Check size={16} className="text-blue-600 mt-1" />
                              )}
                            </div>

                            <div className="text-xs text-gray-500 mb-2">
                              {pkg.templates} templates • {pkg.users} users
                            </div>

                            <div className="space-y-1">
                              {pkg.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-gray-600">
                                  <Check size={12} className="text-green-500 mr-1" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between animate-slide-in-up" style={{animationDelay: '200ms'}}>
                        {selectedPackage ? (
                          <div className="flex items-center space-x-4">
                            <button
                              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:scale-105 button-press"
                              onClick={() => markStepDone('package-selection')}
                            >
                              <ExternalLink size={14} className="mr-2" />
                              Continue Setup
                            </button>
                            <button
                              className="flex items-center px-4 py-2 text-gray-600 text-sm font-medium hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 button-press"
                              onClick={() => markStepDone('package-selection')}
                            >
                              <Check size={14} className="mr-2" />
                              Mark done
                            </button>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 animate-pulse">Please select a package to continue</p>
                        )}
                      </div>
                    </div>
                  )}

                  {step.id !== 'package-selection' && (
                    <div className="p-6 flex items-center justify-between animate-slide-in-up">
                      <div className="flex items-center">
                        <div className="text-5xl mr-6 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse-slow">
                          {step.illustration}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">{step.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed max-w-md">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 hover:scale-105 button-press">
                          <ExternalLink size={14} className="mr-2" />
                          {step.actionLabel}
                        </button>
                        <button
                          className="flex items-center px-4 py-2 text-gray-600 text-sm font-medium hover:text-blue-600 transition-all duration-200 rounded-lg hover:bg-blue-50 button-press"
                          onClick={() => markStepDone(step.id)}
                        >
                          <Check size={14} className="mr-2" />
                          Mark done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}