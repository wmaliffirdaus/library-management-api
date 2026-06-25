import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Shield, 
  MapPin, 
  Calendar, 
  HardDrive, 
  Key, 
  CheckCircle, 
  Edit3, 
  Save, 
  X, 
  Sparkles, 
  AlertCircle,
  Database,
  RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onAddToast: (msg: string) => void;
}

const AVATAR_PRESETS = [
  {
    name: 'Unit-734 Default',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZbdUaJtGOr893XJDF7bme80OTHsD8Ge9P7hWLqv-oh8TJrvSgX0xcRtCe6T-Fu5U9VuFuKCwKJdm2rF_w-C5sMbD6R9jGrV9PRiOA_6IpM1Mw5odwC0TC0ha4rNJ7V1EJ54IJUjzYkccSvplGvo9ZowtLB7Nb3CcaoQptlQbIyR_ZhhR4DBQ1sV7Z_hRo5XpdXb4Zl9laUUifIJQ-JZmIUa3m3e3lIRUgBTIglHagOXxGWiOF2yqOLqeVrfHK6ctMqvWCh4THPzaA'
  },
  {
    name: 'Neon Voyager',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'SecOps Analyst',
    url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Grid Operator',
    url: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Quantum Engineer',
    url: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?auto=format&fit=crop&q=80&w=150'
  }
];

export default function ProfileModal({ 
  isOpen, 
  onClose, 
  profile, 
  onSave,
  onAddToast
}: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editLocation, setEditLocation] = useState(profile.location);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarUrl);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if initial profile changes
  useEffect(() => {
    if (isOpen) {
      setEditName(profile.name);
      setEditEmail(profile.email);
      setEditBio(profile.bio);
      setEditLocation(profile.location);
      setSelectedAvatar(profile.avatarUrl);
      setIsEditing(false);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onSave({
        ...profile,
        name: editName,
        email: editEmail,
        bio: editBio,
        location: editLocation,
        avatarUrl: selectedAvatar
      });
      setIsSaving(false);
      setIsEditing(false);
      onAddToast("Developer Identity metrics updated successfully!");
    }, 500);
  };

  const usagePercent = Math.round((profile.usedRequests / profile.maxRequests) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-indigo-950/40 dark:bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-cyber-surface border border-cyber-border rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 relative flex flex-col max-h-[90vh]"
      >
        {/* Decorative Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cyber-border/40 bg-cyber-panel/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
              <User className="w-4.5 h-4.5 text-pink-500" />
            </div>
            <div>
              <h2 className="font-sans font-black text-cyber-text tracking-tight uppercase text-base">Account Identity Overview</h2>
              <p className="font-mono text-[9px] text-cyber-text-muted/60 uppercase tracking-wider">Access privileges & metadata authorization</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-cyber-panel rounded-full text-cyber-text-muted hover:text-cyber-text transition-colors border-none bg-transparent cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Section: Profile Header Badge */}
          <div className="bg-gradient-to-br from-indigo-600/5 to-pink-600/5 border border-cyber-border/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              {profile.status}
            </div>

            {/* Avatar block */}
            <div className="relative group shrink-0">
              <img 
                alt="Profile Avatar" 
                className="w-20 h-20 rounded-2xl border-2 border-pink-500 p-1 object-cover bg-cyber-panel" 
                src={selectedAvatar}
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-1 right-1 bg-indigo-600 border border-cyber-surface w-4 h-4 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            {/* Basic Stats Info */}
            <div className="text-center sm:text-left flex-1 min-w-0 space-y-1">
              <h3 className="font-sans font-black text-xl text-cyber-text tracking-tight truncate">
                {profile.name}
              </h3>
              <p className="font-mono text-xs text-cyber-cyan font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                <Shield className="w-3.5 h-3.5" /> {profile.quotaTier}
              </p>
              <p className="text-xs text-cyber-text-muted/80 font-sans leading-relaxed mt-1 italic max-w-md line-clamp-2">
                "{profile.bio}"
              </p>
            </div>
          </div>

          {/* If EDITING mode is false, display profile data beautifully */}
          {!isEditing ? (
            <div className="space-y-6">
              
              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-cyber-panel/40 border border-cyber-border/20 rounded-xl p-4 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5 text-indigo-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-wider block">TRANSMISSION CORRIDOR</span>
                    <span className="font-sans font-bold text-xs text-cyber-text truncate block">{profile.email}</span>
                  </div>
                </div>

                <div className="bg-cyber-panel/40 border border-cyber-border/20 rounded-xl p-4 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-amber-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-wider block">RELAY SECTOR LOCATION</span>
                    <span className="font-sans font-bold text-xs text-cyber-text truncate block">{profile.location}</span>
                  </div>
                </div>

                <div className="bg-cyber-panel/40 border border-cyber-border/20 rounded-xl p-4 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4.5 h-4.5 text-pink-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-wider block">REGISTERED TIMESTAMP</span>
                    <span className="font-sans font-bold text-xs text-cyber-text truncate block">{profile.registered}</span>
                  </div>
                </div>

                <div className="bg-cyber-panel/40 border border-cyber-border/20 rounded-xl p-4 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <Key className="w-4.5 h-4.5 text-cyan-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-wider block">ENCRYPTED NODE ID</span>
                    <span className="font-mono font-bold text-xs text-cyber-text truncate block">{profile.nodeKey}</span>
                  </div>
                </div>

              </div>

              {/* API and System Quota Stats */}
              <div className="bg-cyber-panel/40 border border-cyber-border/30 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4.5 h-4.5 text-cyber-cyan" />
                    <span className="font-sans font-black text-xs uppercase tracking-wide text-cyber-text">Monthly Database Index Quota</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-cyber-cyan">{usagePercent}% Used</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-cyber-border-muted h-3 rounded-full overflow-hidden border border-cyber-border/40 p-0.5">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>

                {/* Numeric feedback */}
                <div className="flex justify-between items-center text-[10px] font-mono text-cyber-text-muted/70">
                  <span>Usage: {profile.usedRequests.toLocaleString()} requests</span>
                  <span>Limit: {profile.maxRequests.toLocaleString()} requests</span>
                </div>
              </div>

              {/* Security & Access clearance footer */}
              <div className="bg-[#ef4444]/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs text-cyber-text">Secure Clearance Directive</h4>
                  <p className="text-[11px] text-cyber-text-muted leading-relaxed mt-0.5 font-sans">
                    Your developer profile credentials are bound to transmission certificates. Please keep your transmission address and codename authenticated inside VividArchive protocols.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* EDITING mode: Form to update account credentials */
            <form onSubmit={handleSave} className="space-y-5">
              
              {/* Profile Codename */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Profile Codename
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted w-4.5 h-4.5" />
                  <input 
                    type="text" 
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-[#06080c] border border-cyber-border/70 rounded-xl px-3 py-2.5 pl-10 text-xs text-cyber-text font-sans focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan-dim/20"
                    placeholder="Enter profile handle"
                  />
                </div>
              </div>

              {/* Transmission Address */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Transmission Address (Email)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted w-4.5 h-4.5" />
                  <input 
                    type="email" 
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-[#06080c] border border-cyber-border/70 rounded-xl px-3 py-2.5 pl-10 text-xs text-cyber-text font-sans focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan-dim/20"
                    placeholder="Enter transmission corridor"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Sector Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-muted w-4.5 h-4.5" />
                  <input 
                    type="text" 
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full bg-[#06080c] border border-cyber-border/70 rounded-xl px-3 py-2.5 pl-10 text-xs text-cyber-text font-sans focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan-dim/20"
                    placeholder="Enter physical relay sector"
                  />
                </div>
              </div>

              {/* Short Bio / Status */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Status Briefing (Bio)
                </label>
                <textarea 
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={2}
                  className="w-full bg-[#06080c] border border-cyber-border/70 rounded-xl px-3 py-2.5 text-xs text-cyber-text font-sans focus:outline-none focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan-dim/20 resize-none leading-relaxed"
                  placeholder="Tell us about your mission..."
                />
              </div>

              {/* Choose Cyber-Avatar presets */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Select Visual Holographic Overlay (Avatar)
                </label>
                <div className="grid grid-cols-5 gap-3.5 pt-1">
                  {AVATAR_PRESETS.map((av) => {
                    const isSelected = selectedAvatar === av.url;
                    return (
                      <button
                        type="button"
                        key={av.name}
                        onClick={() => setSelectedAvatar(av.url)}
                        className={`p-1 rounded-2xl border-2 transition-all hover:scale-105 shrink-0 bg-cyber-panel flex flex-col items-center justify-center cursor-pointer ${
                          isSelected ? 'border-pink-500 shadow-md' : 'border-cyber-border/40 hover:border-cyber-border'
                        }`}
                        title={av.name}
                      >
                        <img 
                          src={av.url} 
                          alt={av.name}
                          className="w-10 h-10 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-cyber-border/40 bg-cyber-panel/30">
          <div className="flex items-center gap-1.5 text-cyber-text-muted/60 font-mono text-[9px] uppercase tracking-wider">
            <Database className="w-3.5 h-3.5" /> Synchronized Node
          </div>

          <div className="flex items-center gap-2.5">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 font-sans font-bold text-xs text-cyber-text-muted hover:text-cyber-text bg-transparent hover:bg-cyber-panel border border-cyber-border/50 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-sans font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-200 flex items-center gap-1.5 border-none cursor-pointer"
                >
                  {isSaving ? "Saving..." : "Save Identity"}
                  <Save className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all duration-200 flex items-center gap-1.5 border-none cursor-pointer"
                >
                  Edit Profile
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 font-sans font-bold text-xs text-white bg-slate-500 hover:bg-slate-600 border-none rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
