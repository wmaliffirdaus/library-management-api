import { 
  Terminal, 
  Plus, 
  BookOpen, 
  BookMarked, 
  Rocket, 
  Activity, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onCreateKeyClick: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  profile: UserProfile;
  onProfileClick: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onCreateKeyClick,
  mobileOpen,
  setMobileOpen,
  profile,
  onProfileClick
}: SidebarProps) {
  
  const navItems = [
    { id: 'documentation' as ActiveTab, label: 'Documentation', icon: BookOpen },
    { id: 'catalog' as ActiveTab, label: 'Book Catalog', icon: BookMarked },
    { id: 'dashboard' as ActiveTab, label: 'Developer Dashboard', icon: Terminal },
    { id: 'getting-started' as ActiveTab, label: 'Getting Started', icon: Rocket },
    { id: 'api-status' as ActiveTab, label: 'API Status', icon: Activity },
  ];

  const systemItems = [
    { id: 'settings' as ActiveTab, label: 'Settings', icon: Settings },
    { id: 'support' as ActiveTab, label: 'Support', icon: HelpCircle },
  ];

  const handleTabSelect = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full py-6 text-white bg-indigo-600">
      {/* Brand Header */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center font-black text-indigo-950 text-xl shadow-md">
          C
        </div>
        <div>
          <div className="font-sans font-black text-white tracking-tight text-xl leading-none uppercase italic">
            VividArchive
          </div>
          <div className="font-mono text-[9px] text-indigo-200 uppercase tracking-widest mt-0.5">
            Admin Protocol v2
          </div>
        </div>
      </div>

      {/* Create Key Button Action */}
      <div className="px-4 mb-6">
        <button 
          onClick={onCreateKeyClick}
          className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 text-indigo-950 font-sans text-xs font-black tracking-wider uppercase rounded-2xl shadow-lg shadow-indigo-900/40 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-none"
        >
          <Plus className="w-4.5 h-4.5 stroke-[3px]" />
          Create API Key
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-2 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabSelect(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 text-sm rounded-2xl transition-all duration-200 group text-left cursor-pointer border-none ${
                isActive 
                  ? 'bg-white/12 text-white border-l-4 border-amber-400 font-bold shadow-md' 
                  : 'text-indigo-100/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-amber-400' : 'text-indigo-200 group-hover:text-white'}`} />
              <span className={`font-sans tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* System Separator and Links */}
      <div className="mt-auto px-4 pt-4 border-t border-indigo-500/30">
        <div className="bg-indigo-700/50 rounded-2xl p-4 border border-indigo-500/30 mb-5">
          <p className="text-indigo-200 text-[10px] font-black uppercase tracking-wider mb-1.5">Usage Limit</p>
          <div className="w-full bg-indigo-950/40 h-2 rounded-full mb-2 overflow-hidden">
            <div className="bg-pink-500 h-full w-3/4 rounded-full"></div>
          </div>
          <p className="text-white text-xs font-semibold">7.5k of 10k requests used</p>
        </div>

        <div className="font-mono text-[9px] text-indigo-200/50 mb-2 px-2 tracking-widest uppercase font-bold">
          System
        </div>
        <div className="flex flex-col gap-1.5 px-1">
          {systemItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 text-xs rounded-xl transition-all duration-200 group text-left cursor-pointer border-none ${
                  isActive 
                    ? 'bg-white/10 text-white border-l-3 border-amber-400 font-bold' 
                    : 'text-indigo-100/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-400' : 'text-indigo-300 group-hover:text-white'}`} />
                <span className="font-sans font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Developer Profile Avatar Badge */}
        <button 
          onClick={onProfileClick}
          className="w-full flex items-center gap-3 pt-4 border-t border-indigo-500/35 px-2 mt-4 mb-2 text-left hover:bg-white/5 rounded-xl p-1.5 transition-colors border-none bg-transparent cursor-pointer"
        >
          <div className="relative shrink-0">
            <img 
              alt="Developer Avatar" 
              className="w-9 h-9 rounded-full border-2 border-pink-500 p-0.5 object-cover bg-indigo-800" 
              src={profile.avatarUrl}
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full"></span>
          </div>
          <div className="overflow-hidden">
            <div className="font-sans font-bold text-xs truncate text-white">{profile.name}</div>
            <div className="font-mono text-[9px] text-indigo-200/80 truncate">{profile.quotaTier}</div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar Toggle Header (only visible on mobile when sidebar is closed) */}
      <div className="md:hidden bg-indigo-600 border-b border-indigo-500/20 h-16 w-full flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center font-black text-indigo-950 text-sm">C</div>
          <span className="font-sans font-black text-white tracking-tight uppercase text-sm italic">VividArchive</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-xl border border-white/20 text-indigo-100 hover:text-white hover:bg-white/10 transition-all cursor-pointer bg-transparent"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-indigo-950/40 z-40 md:hidden backdrop-blur-xs" 
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar Sidebar Container */}
      <nav className={`h-screen w-64 bg-indigo-600 border-r border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.15)] fixed left-0 top-0 z-40 transition-transform duration-300 md:translate-x-0 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {sidebarContent}
      </nav>
    </>
  );
}
