import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Terminal } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DocumentationView from './components/DocumentationView';
import BookCatalogView from './components/BookCatalogView';
import DeveloperDashboardView from './components/DeveloperDashboardView';
import GettingStartedView from './components/GettingStartedView';
import ApiStatusView from './components/ApiStatusView';
import SettingsView from './components/SettingsView';
import SupportView from './components/SupportView';
import ProfileModal from './components/ProfileModal';
import { ApiKey, ActiveTab, UserProfile } from './types';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Profile management state
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('developer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return {
      name: 'Unit-734',
      email: 'wmaliffirdaus@gmail.com',
      quotaTier: 'Developer Prime',
      registered: 'Oct 12, 2023',
      role: 'Declassified Security clearance',
      status: 'Nominal (Operational)',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZbdUaJtGOr893XJDF7bme80OTHsD8Ge9P7hWLqv-oh8TJrvSgX0xcRtCe6T-Fu5U9VuFuKCwKJdm2rF_w-C5sMbD6R9jGrV9PRiOA_6IpM1Mw5odwC0TC0ha4rNJ7V1EJ54IJUjzYkccSvplGvo9ZowtLB7Nb3CcaoQptlQbIyR_ZhhR4DBQ1sV7Z_hRo5XpdXb4Zl9laUUifIJQ-JZmIUa3m3e3lIRUgBTIglHagOXxGWiOF2yqOLqeVrfHK6ctMqvWCh4THPzaA',
      bio: 'SecOps lead for Core VividArchive indexing algorithms. Specializing in cryptographic book handshakes and secure declassification protocols.',
      usedRequests: 7500,
      maxRequests: 10000,
      location: 'Sector-Asia East Relay (Tokyo)',
      nodeKey: 'Active Node #34'
    };
  });

  useEffect(() => {
    localStorage.setItem('developer_profile', JSON.stringify(profile));
  }, [profile]);

  // Profile modal control state
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<ActiveTab>('documentation');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Global settings state
  const [scanlinesEnabled, setScanlinesEnabled] = useState<boolean>(true);

  // Search sync state
  const [searchValue, setSearchValue] = useState<string>('');

  // Developer profile registration
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  // Dynamic API Keys list state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 'key_1',
      name: 'Prod_Main_Service',
      token: 'ca_live_f78a2e19a842b892',
      created: 'Oct 12, 2023',
      lastUsed: '2 mins ago',
      type: 'live'
    },
    {
      id: 'key_2',
      name: 'Dev_Local_Testing',
      token: 'ca_test_d3a8e99411983a1c',
      created: 'Nov 04, 2023',
      lastUsed: 'Yesterday',
      type: 'test'
    }
  ]);

  // Toast notifications state
  const [toasts, setToasts] = useState<{ id: string; msg: string }[]>([]);

  // Function to push a toast
  const addToast = (msg: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, msg }]);
    // Auto purge in 3.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Generate Key callback
  const handleGenerateKey = (name: string, type: 'live' | 'test') => {
    const prefix = type === 'live' ? 'ca_live_' : 'ca_test_';
    // Generate a random 16 character hex string
    const hex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const token = `${prefix}${hex}`;
    
    // Formatting today's date
    const dateOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const createdDate = new Date().toLocaleDateString('en-US', dateOpts);

    const newKey: ApiKey = {
      id: `key_${Math.random().toString(36).substring(2, 9)}`,
      name,
      token,
      created: createdDate,
      lastUsed: 'Never',
      type
    };

    setApiKeys((prev) => [newKey, ...prev]);
    addToast(`API Key "${name}" successfully generated!`);
  };

  // Revoke Key callback
  const handleRevokeKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
  };

  const handleCreateKeyQuickAction = () => {
    setActiveTab('dashboard');
    addToast("Initializing API Key Provisioner protocol...");
  };

  // View Router
  const renderActiveView = () => {
    switch (activeTab) {
      case 'documentation':
        return (
          <DocumentationView 
            apiKeys={apiKeys} 
            onAddToast={addToast} 
          />
        );
      case 'catalog':
        return (
          <BookCatalogView 
            onAddToast={addToast} 
          />
        );
      case 'dashboard':
        return (
          <DeveloperDashboardView 
            apiKeys={apiKeys}
            onGenerateKey={handleGenerateKey}
            onRevokeKey={handleRevokeKey}
            setActiveTab={setActiveTab}
            onAddToast={addToast}
          />
        );
      case 'getting-started':
        return (
          <GettingStartedView 
            apiKeys={apiKeys}
            isRegistered={isRegistered}
            onRegister={() => setIsRegistered(true)}
            onGenerateKey={handleGenerateKey}
            setActiveTab={setActiveTab}
            onAddToast={addToast}
          />
        );
      case 'api-status':
        return <ApiStatusView />;
      case 'settings':
        return (
          <SettingsView 
            onAddToast={addToast}
            scanlinesEnabled={scanlinesEnabled}
            setScanlinesEnabled={setScanlinesEnabled}
            profile={profile}
            onUpdateProfile={setProfile}
          />
        );
      case 'support':
        return <SupportView onAddToast={addToast} />;
      default:
        return (
          <DocumentationView 
            apiKeys={apiKeys} 
            onAddToast={addToast} 
          />
        );
    }
  };

  return (
    <div className={`theme-${theme} ${theme} bg-cyber-bg text-cyber-text font-sans min-h-screen selection:bg-cyber-cyan/30 selection:text-cyber-cyan flex flex-col md:flex-row overflow-x-hidden relative`}>
      
      {/* Global CRT scanline overlay if enabled */}
      {scanlinesEnabled && (
        <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>
      )}

      {/* Side Navigation panel */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onCreateKeyClick={handleCreateKeyQuickAction}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        profile={profile}
        onProfileClick={() => setProfileModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:ml-64 relative min-h-screen">
        
        {/* Header toolbar */}
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onNotificationClick={() => addToast("Alert Handshake: All connection systems are healthy.")}
          theme={theme}
          onThemeToggle={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          profile={profile}
          onProfileClick={() => setProfileModalOpen(true)}
        />

        {/* Content canvas viewport */}
        <main className="flex-1 p-4 md:p-8 z-10 w-full max-w-7xl mx-auto pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating declassified alert slide-in container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-cyber-surface/90 border border-cyber-cyan/30 rounded p-4 flex items-start gap-3 shadow-[0_4px_24px_rgba(0,240,255,0.15)] backdrop-blur-md pointer-events-auto relative overflow-hidden"
            >
              {/* Green indicator neon pill */}
              <div className="w-1 h-full bg-cyber-cyan absolute left-0 top-0"></div>
              
              <div className="flex-1 text-xs font-mono leading-relaxed text-cyber-text pl-1 pr-6 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyber-cyan shrink-0 animate-pulse" />
                <span>{toast.msg}</span>
              </div>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-cyber-text-muted hover:text-cyber-cyan transition-colors shrink-0 absolute right-2 top-2 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Profile Detail Account Modal Overlay */}
      <AnimatePresence>
        {profileModalOpen && (
          <ProfileModal 
            isOpen={profileModalOpen}
            onClose={() => setProfileModalOpen(false)}
            profile={profile}
            onSave={(updatedProfile) => {
              setProfile(updatedProfile);
            }}
            onAddToast={addToast}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

