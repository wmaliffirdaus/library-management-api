import { useState } from 'react';
import { UserPlus, Key, Terminal, Copy, Check, ShieldAlert, Loader2, LifeBuoy } from 'lucide-react';
import { ApiKey } from '../types';

interface GettingStartedViewProps {
  apiKeys: ApiKey[];
  isRegistered: boolean;
  onRegister: () => void;
  onGenerateKey: (name: string, type: 'live' | 'test') => void;
  setActiveTab: (tab: any) => void;
  onAddToast: (msg: string) => void;
}

export default function GettingStartedView({
  apiKeys,
  isRegistered,
  onRegister,
  onGenerateKey,
  setActiveTab,
  onAddToast
}: GettingStartedViewProps) {
  
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [copiedStep2, setCopiedStep2] = useState<boolean>(false);
  const [copiedStep3, setCopiedStep3] = useState<boolean>(false);

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setTimeout(() => {
      onRegister();
      setIsRegistering(false);
      onAddToast("Primary Developer Identity registered in database catalog!");
    }, 800);
  };

  const handleForgeStep2 = () => {
    onGenerateKey("QuickStart_Token", "live");
    onAddToast("Forged quickstart token! Check active tokens table.");
  };

  const handleCopyStep2Key = (keyText: string) => {
    navigator.clipboard.writeText(keyText);
    setCopiedStep2(true);
    onAddToast("Quickstart key copied!");
    setTimeout(() => setCopiedStep2(false), 2000);
  };

  const handleCopyStep3Snippet = () => {
    const codeSnippet = `curl -X GET "https://api.cyber-archive.dev/v2/catalog/recent" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedStep3(true);
    onAddToast("First Request cURL snippet copied!");
    setTimeout(() => setCopiedStep3(false), 2000);
  };

  // Get active key token if exists, else show placeholder
  const activeToken = apiKeys.length > 0 ? apiKeys[0].token : 'cyb_arc_live_xxxxxxxxxxxxxxxxxxxx';

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-fade-in">
      
      {/* Hero Headline Intro */}
      <div className="text-center pt-4 space-y-4">
        <h1 className="font-sans text-3xl md:text-5xl font-bold text-cyber-cyan tracking-tight cyber-glow">
          Initialize Your Journey
        </h1>
        <p className="text-cyber-text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans">
          Welcome to the Cyber-Archive protocol. Follow this streamlined 3-step sequence to register your developer credentials and query the database in under three minutes.
        </p>
      </div>

      {/* STEP 1 Card: Create Account */}
      <div className="bg-cyber-surface rounded-lg p-6 md:p-8 border border-cyber-border/40 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/25 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Step Circular Icon */}
          <div className="w-16 h-16 rounded-full bg-cyber-panel border border-cyber-cyan/15 flex items-center justify-center shrink-0 group-hover:border-cyber-cyan/40 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.1)] transition-all">
            <UserPlus className="w-7 h-7 text-cyber-cyan" />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-bold tracking-widest bg-cyber-cyan/10 text-cyber-cyan px-2.5 py-0.5 rounded-sm border border-cyber-cyan/25 uppercase">
                STEP 1
              </span>
              <h2 className="font-sans font-bold text-cyber-text text-lg">Create Account</h2>
            </div>
            
            <p className="text-xs text-cyber-text-muted leading-relaxed">
              Establish your developer identity within the archive indexing node cluster. This registers your profile and declassifies standard-tier data corridors.
            </p>

            <div>
              {isRegistered ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded font-mono text-xs font-semibold">
                  <Check className="w-4 h-4" />
                  IDENTITY REGISTERED (UNIT-734)
                </div>
              ) : (
                <button
                  onClick={handleRegisterClick}
                  disabled={isRegistering}
                  className="bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/5 font-mono text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 rounded transition-all cursor-pointer disabled:opacity-50"
                >
                  {isRegistering ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      REGISTERING IDENTITY...
                    </span>
                  ) : (
                    "REGISTER IDENTITY"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2 Card: Generate API Key */}
      <div className="bg-cyber-surface rounded-lg p-6 md:p-8 border border-cyber-border/40 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-purple/25 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Step Circular Icon */}
          <div className="w-16 h-16 rounded-full bg-cyber-panel border border-cyber-purple-dim/15 flex items-center justify-center shrink-0 group-hover:border-cyber-purple/40 group-hover:shadow-[0_0_12px_rgba(182,0,248,0.1)] transition-all">
            <Key className="w-7 h-7 text-cyber-purple" />
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-bold tracking-widest bg-cyber-purple/10 text-cyber-purple px-2.5 py-0.5 rounded-sm border border-cyber-purple-dim/25 uppercase">
                STEP 2
              </span>
              <h2 className="font-sans font-bold text-cyber-text text-lg">Generate API Key</h2>
            </div>
            
            <p className="text-xs text-cyber-text-muted leading-relaxed">
              Forge a dynamic cryptographic token to interface your external script compilers with the books endpoint. Store your access keys securely.
            </p>

            {apiKeys.length === 0 ? (
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={handleForgeStep2}
                  className="bg-cyber-purple text-white hover:bg-cyber-purple/90 font-mono text-[10px] font-bold tracking-widest uppercase px-5 py-2.5 rounded transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Forge Quickstart Token
                </button>
                <span className="font-mono text-[10px] text-cyber-text-muted/40 uppercase">OR generate one in Developer Dashboard</span>
              </div>
            ) : (
              <div className="bg-[#06080c] border border-cyber-border/40 rounded p-4 flex items-center justify-between gap-3 font-mono text-xs w-full overflow-hidden">
                <span className="text-cyber-text-muted/80 truncate pr-2 select-all tracking-wider font-semibold">
                  {activeToken}
                </span>
                <button
                  onClick={() => handleCopyStep2Key(activeToken)}
                  className="text-cyber-cyan hover:text-cyber-cyan/80 p-1 rounded transition-colors shrink-0 cursor-pointer"
                  title="Copy Token Key"
                >
                  {copiedStep2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* STEP 3 Card: Execute First Request */}
      <div className="bg-cyber-surface rounded-lg p-6 md:p-8 border border-cyber-border/40 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Step Circular Icon */}
          <div className="w-16 h-16 rounded-full bg-cyber-panel border border-cyber-border/20 flex items-center justify-center shrink-0 group-hover:border-cyber-cyan/40 transition-all">
            <Terminal className="w-7 h-7 text-cyber-cyan" />
          </div>

          <div className="flex-1 space-y-4 w-full overflow-hidden">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-bold tracking-widest bg-cyber-cyan/5 text-cyber-text-muted/80 px-2.5 py-0.5 rounded-sm border border-cyber-border/40 uppercase">
                STEP 3
              </span>
              <h2 className="font-sans font-bold text-cyber-text text-lg">Your First Request</h2>
            </div>
            
            <p className="text-xs text-cyber-text-muted leading-relaxed">
              Compile and trigger a manual connection request in your console shell to fetch declassified index entries. Verify credentials mapping.
            </p>

            {/* Interactive Bash Container */}
            <div className="bg-[#050608] rounded-md border border-cyber-border/30 overflow-hidden relative group/code transition-all hover:border-cyber-cyan/30">
              <div className="absolute right-3 top-3 flex items-center gap-2">
                <span className="font-mono text-[9px] text-cyber-text-muted/30">BASH</span>
                <button
                  onClick={handleCopyStep3Snippet}
                  className="text-cyber-text-muted hover:text-cyber-cyan p-1 hover:bg-cyber-panel rounded transition-colors shrink-0 cursor-pointer"
                  title="Copy Code Snippet"
                >
                  {copiedStep3 ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              
              <pre className="p-4 font-mono text-[11px] text-cyber-text-muted overflow-x-auto leading-relaxed select-all">
                <code>
                  <span className="text-cyber-cyan">curl</span> -X GET <span className="text-cyber-purple">"https://api.cyber-archive.dev/v2/catalog/recent"</span> \<br />
                  {`  `} -H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br />
                  {`  `} -H <span className="text-green-400">"Content-Type: application/json"</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Support Footer */}
      <div className="text-center pt-8 border-t border-cyber-border/10">
        <p className="text-xs text-cyber-text-muted/80 mb-4 font-sans">
          Encountered an anomaly in your credential pipeline mapping?
        </p>
        <button
          onClick={() => setActiveTab('support')}
          className="inline-flex items-center gap-2 text-cyber-cyan hover:text-cyber-cyan/80 transition-colors font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer"
        >
          <LifeBuoy className="w-4 h-4" />
          Access Support Channels
        </button>
      </div>

    </div>
  );
}
