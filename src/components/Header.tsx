import { Search, Bell, Moon, Sun, ArrowRight, Sparkles } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  onNotificationClick: () => void;
  isGlitchActive?: boolean;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  profile: UserProfile;
  onProfileClick: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onSearchChange,
  searchValue = '',
  onNotificationClick,
  isGlitchActive = false,
  theme,
  onThemeToggle,
  profile,
  onProfileClick
}: HeaderProps) {
  
  return (
    <header className="bg-cyber-surface/95 backdrop-blur-md border-b border-cyber-border/40 sticky top-0 z-30 flex justify-between items-center w-full px-4 md:px-8 h-16 max-w-7xl mx-auto transition-colors duration-200">
      {/* Navigation Links */}
      <nav className="flex items-center gap-6 h-full">
        <button 
          onClick={() => setActiveTab('documentation')}
          className={`flex items-center h-full font-sans text-xs font-bold tracking-wider uppercase transition-all pb-1 border-b-2 cursor-pointer ${
            activeTab === 'documentation' 
              ? 'text-cyber-cyan border-cyber-cyan opacity-100' 
              : 'text-cyber-text-muted hover:text-cyber-cyan border-transparent opacity-80'
          }`}
        >
          Endpoints
        </button>
        <button 
          onClick={() => setActiveTab('getting-started')}
          className={`flex items-center h-full font-sans text-xs font-bold tracking-wider uppercase transition-all pb-1 border-b-2 cursor-pointer ${
            activeTab === 'getting-started' 
              ? 'text-cyber-cyan border-cyber-cyan opacity-100' 
              : 'text-cyber-text-muted hover:text-cyber-cyan border-transparent opacity-80'
          }`}
        >
          SDKs
        </button>
        <button 
          onClick={() => setActiveTab('api-status')}
          className={`flex items-center h-full font-sans text-xs font-bold tracking-wider uppercase transition-all pb-1 border-b-2 cursor-pointer ${
            activeTab === 'api-status' 
              ? 'text-cyber-cyan border-cyber-cyan opacity-100' 
              : 'text-cyber-text-muted hover:text-cyber-cyan border-transparent opacity-80'
          }`}
        >
          Changelog
        </button>
      </nav>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyber-text-muted w-4 h-4" />
          <input 
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search books or settings..."
            className="bg-cyber-panel border border-cyber-border/40 rounded-full text-cyber-text placeholder:text-cyber-text-muted/40 font-sans text-xs py-2 pl-10 pr-4 w-48 focus:w-64 focus:bg-cyber-surface focus:ring-2 focus:ring-cyber-cyan-dim/20 focus:border-cyber-cyan focus:outline-none transition-all shadow-sm"
          />
        </div>

        {/* Action Button Icons */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={onNotificationClick}
            className="p-2 text-cyber-text-muted hover:text-cyber-cyan hover:bg-cyber-panel rounded-full transition-all relative cursor-pointer border-none bg-transparent flex items-center justify-center"
            title="System alerts"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
          </button>
          
          <button 
            onClick={onThemeToggle}
            className="p-2 text-cyber-text-muted hover:text-cyber-cyan hover:bg-cyber-panel rounded-full transition-all cursor-pointer border-none bg-transparent flex items-center justify-center"
            title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-500" />
            )}
          </button>
        </div>

        <div className="h-6 w-px bg-cyber-border hidden sm:block"></div>

        {/* API Console Switch */}
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="font-sans text-xs font-extrabold tracking-wide uppercase text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all flex items-center gap-1.5 px-4.5 py-2.5 rounded-full shadow-md shadow-indigo-600/15 active:scale-95 cursor-pointer border-none"
        >
          API Console
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Profile Avatar Badge */}
        <button 
          onClick={onProfileClick}
          className="w-9 h-9 rounded-full border-2 border-pink-500 p-0.5 overflow-hidden bg-cyber-panel hover:scale-105 transition-all cursor-pointer flex items-center justify-center border-none"
          title="View profile details"
        >
          <img 
            alt="Developer Avatar" 
            className="w-full h-full object-cover rounded-full" 
            src={profile.avatarUrl}
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
}
