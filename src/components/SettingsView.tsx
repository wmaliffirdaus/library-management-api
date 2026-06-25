import { useState, useEffect, FormEvent } from 'react';
import { Settings, Save, Sliders, Shield, User, Bell } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsViewProps {
  onAddToast: (msg: string) => void;
  scanlinesEnabled: boolean;
  setScanlinesEnabled: (val: boolean) => void;
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export default function SettingsView({ 
  onAddToast,
  scanlinesEnabled,
  setScanlinesEnabled,
  profile,
  onUpdateProfile
}: SettingsViewProps) {
  
  const [devName, setDevName] = useState<string>(profile.name);
  const [devEmail, setDevEmail] = useState<string>(profile.email);
  const [quotaTier, setQuotaTier] = useState<string>(profile.quotaTier);
  
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Sync state if initial profile changes elsewhere
  useEffect(() => {
    setDevName(profile.name);
    setDevEmail(profile.email);
    setQuotaTier(profile.quotaTier);
  }, [profile]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onUpdateProfile({
        ...profile,
        name: devName,
        email: devEmail,
        quotaTier: quotaTier
      });
      onAddToast("Developer coordinates and visual preferences committed successfully!");
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-sans text-3xl font-bold text-cyber-text mb-2 tracking-tight flex items-center gap-2.5">
          <Settings className="w-8 h-8 text-cyber-cyan" /> Portal Preferences
        </h1>
        <p className="text-cyber-text-muted text-xs leading-relaxed">
          Configure security protocols, developer identification labels, and HUD holographic visualization variables.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Module: Account Coordinates */}
        <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 space-y-4">
          <h3 className="font-sans font-bold text-cyber-text text-sm flex items-center gap-2 border-b border-cyber-border/20 pb-2">
            <User className="w-4 h-4 text-cyber-cyan" /> Developer Identification
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                Profile Codename
              </label>
              <input 
                type="text" 
                value={devName}
                onChange={(e) => setDevName(e.target.value)}
                className="w-full bg-[#06080c] border border-cyber-border/60 rounded px-3 py-2 text-xs text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                Transmission Address
              </label>
              <input 
                type="email" 
                value={devEmail}
                onChange={(e) => setDevEmail(e.target.value)}
                className="w-full bg-[#06080c] border border-cyber-border/60 rounded px-3 py-2 text-xs text-cyber-text font-mono focus:outline-none focus:border-cyber-cyan"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
              Indexing Quota Tier
            </label>
            <select
              value={quotaTier}
              onChange={(e) => setQuotaTier(e.target.value)}
              className="bg-[#06080c] border border-cyber-border/60 text-cyber-cyan font-mono text-xs rounded px-3 py-2 w-full focus:outline-none focus:border-cyber-cyan"
            >
              <option value="Developer Prime">Developer Prime Tier (10M requests / month)</option>
              <option value="Declassified Admin">Declassified Admin Tier (50M requests / month)</option>
              <option value="Cyber-Vault Overseer">Cyber-Vault Overseer (Unlimited Access)</option>
            </select>
          </div>
        </div>

        {/* Module: Visual HUD Options */}
        <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 space-y-4">
          <h3 className="font-sans font-bold text-cyber-text text-sm flex items-center gap-2 border-b border-cyber-border/20 pb-2">
            <Sliders className="w-4 h-4 text-cyber-purple" /> HUD Render Configuration
          </h3>
          
          <div className="space-y-4 pt-1">
            {/* Toggle scanlines */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-sans font-semibold text-xs text-cyber-text block">Holographic Scanlines</span>
                <span className="text-[11px] text-cyber-text-muted/60 leading-relaxed font-sans">
                  Overlay animated frequency cathode-ray lines inside Book card covers.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setScanlinesEnabled(!scanlinesEnabled)}
                className={`w-11 h-6 rounded-full p-1 transition-colors relative cursor-pointer outline-none border ${
                  scanlinesEnabled ? 'bg-cyber-cyan/30 border-cyber-cyan' : 'bg-cyber-panel border-cyber-border/60'
                }`}
              >
                <span 
                  className={`block w-3.5 h-3.5 rounded-full transition-transform ${
                    scanlinesEnabled ? 'translate-x-5 bg-cyber-cyan' : 'translate-x-0 bg-cyber-text-muted'
                  }`}
                />
              </button>
            </div>

            {/* Simulated Debug Console */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-sans font-semibold text-xs text-cyber-text block">Telemetry Debug Overlay</span>
                <span className="text-[11px] text-cyber-text-muted/60 leading-relaxed font-sans">
                  Echo declassification query handshakes into visual alerts.
                </span>
              </div>
              <button
                type="button"
                className="w-11 h-6 rounded-full p-1 bg-cyber-cyan/30 border border-cyber-cyan relative cursor-help"
                title="Strictly Locked by Cyber-Archive security"
              >
                <span className="block w-3.5 h-3.5 rounded-full bg-cyber-cyan translate-x-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Form Action Row */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-cyber-cyan text-cyber-bg hover:bg-cyber-cyan/90 font-mono text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? "COMMITING..." : "COMMIT PREFERENCES"}
            <Save className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
