import { useState, FormEvent } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  PlusCircle, 
  Trash2, 
  X,
  Lock,
  Zap,
  Globe
} from 'lucide-react';
import { ApiKey, Metric } from '../types';

interface DeveloperDashboardViewProps {
  apiKeys: ApiKey[];
  onGenerateKey: (name: string, type: 'live' | 'test') => void;
  onRevokeKey: (id: string) => void;
  setActiveTab: (tab: any) => void;
  onAddToast: (msg: string) => void;
}

export default function DeveloperDashboardView({ 
  apiKeys, 
  onGenerateKey, 
  onRevokeKey, 
  setActiveTab,
  onAddToast
}: DeveloperDashboardViewProps) {
  
  // Quick Connect console copy feedback
  const [isCurlCopied, setIsCurlCopied] = useState<boolean>(false);
  
  // API Key Generator Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newKeyName, setNewKeyName] = useState<string>('');
  const [newKeyType, setNewKeyType] = useState<'live' | 'test'>('live');

  // Copy individual key's token
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCopyCurl = () => {
    const curlCommand = `curl -X GET \\\n  "https://api.cyber-archive.io/v2/books" \\\n  -H "Authorization: Bearer ca_live_f78a2e19a842b892"`;
    navigator.clipboard.writeText(curlCommand);
    setIsCurlCopied(true);
    onAddToast("curl code snippet copied to clipboard!");
    setTimeout(() => setIsCurlCopied(false), 2000);
  };

  const handleCopyToken = (id: string, token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedKeyId(id);
    onAddToast("API access key token copied!");
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = newKeyName.trim() || 'Custom_Service_Token';
    onGenerateKey(name, newKeyType);
    setNewKeyName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dashboard Welcome Header */}
      <div>
        <h1 className="font-sans text-3xl md:text-5xl font-bold text-cyber-text mb-2 tracking-tight">
          Welcome Back, Unit-734
        </h1>
        <p className="text-cyber-text-muted font-mono text-xs flex items-center gap-1">
          System status: <span className="text-cyber-cyan font-bold tracking-widest uppercase">Nominal</span> 
          <span className="text-cyber-border/80 mx-2">|</span> 
          Last login: 14:02:44 UTC
        </p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Metrics overview block */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Telemetry Indicator: Request Volume */}
          <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 flex flex-col justify-between shadow-[inset_0_0_20px_rgba(0,219,233,0.03)] relative overflow-hidden group hover:border-cyber-cyan/30 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[11px] text-cyber-text-muted uppercase tracking-wider">24h Requests</span>
              <TrendingUp className="text-cyber-cyan w-4 h-4" />
            </div>
            <div>
              <div className="font-sans font-bold text-cyber-cyan text-3xl md:text-4xl cyber-glow tracking-tight">
                1.24M
              </div>
              <div className="mt-3 text-[10px] text-cyber-text-muted/70 font-mono flex items-center gap-1">
                <TrendingUp className="text-cyber-cyan w-3 h-3" />
                <span className="text-cyber-cyan font-semibold">+12.4%</span> vs yesterday
              </div>
            </div>
          </div>

          {/* Telemetry Indicator: Latency */}
          <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 flex flex-col justify-between shadow-[inset_0_0_20px_rgba(182,0,248,0.03)] relative overflow-hidden group hover:border-cyber-purple/30 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[11px] text-cyber-text-muted uppercase tracking-wider">Avg Latency</span>
              <Zap className="text-cyber-purple w-4 h-4" />
            </div>
            <div>
              <div className="font-sans font-bold text-cyber-purple text-3xl md:text-4xl cyber-glow-purple tracking-tight">
                42ms
              </div>
              <div className="mt-3 text-[10px] text-cyber-text-muted/70 font-mono flex items-center gap-1">
                <TrendingDown className="text-cyber-purple w-3 h-3" />
                <span className="text-cyber-purple font-semibold">-3ms</span> latency reduction
              </div>
            </div>
          </div>

          {/* Telemetry Indicator: Error Rate */}
          <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[11px] text-cyber-text-muted uppercase tracking-wider">Error Rate</span>
              <AlertCircle className="text-cyber-cyan w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="font-sans font-bold text-cyber-text text-3xl md:text-4xl tracking-tight">
                0.01%
              </div>
              <div className="mt-3 text-[10px] text-cyber-text-muted/70 font-mono flex items-center gap-1">
                <Globe className="text-green-400 w-3 h-3" />
                <span>System operational</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Console Snippet */}
        <div className="md:col-span-4 bg-cyber-surface border border-cyber-border/50 rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-[11px] text-cyber-cyan uppercase tracking-wider mb-3 flex items-center gap-2 font-bold">
              <Terminal className="w-4 h-4" /> Quick Connect
            </h3>
            
            <div className="bg-[#06080c] rounded p-3.5 border border-cyber-border/30 font-mono text-[11px] overflow-x-auto relative group">
              <button 
                onClick={handleCopyCurl}
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 bg-cyber-panel hover:bg-cyber-panel-high border border-cyber-border/50 text-cyber-text-muted hover:text-cyber-cyan rounded transition-all cursor-pointer" 
                title="Copy Curl Command"
              >
                {isCurlCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              
              <pre className="text-cyber-text-muted leading-relaxed select-all">
                <span className="text-cyber-cyan">curl</span> -X GET \<br />
                {`  `} "https://api.cyber-archive.io/v2/books" \<br />
                {`  `} -H "Authorization: Bearer <span className="text-cyber-purple">YOUR_API_KEY</span>"
              </pre>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('documentation')}
            className="mt-4 font-mono text-[10px] text-cyber-cyan hover:text-cyber-cyan/80 transition-colors flex items-center gap-1 font-bold uppercase tracking-widest self-start cursor-pointer group"
          >
            View Full Docs 
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Column: Keys Management Table */}
        <div className="md:col-span-12 bg-cyber-surface border border-cyber-border/40 rounded-lg">
          
          {/* Keys Header panel */}
          <div className="p-6 border-b border-cyber-border/30 flex justify-between items-center bg-cyber-panel/30">
            <div>
              <h3 className="font-sans font-bold text-cyber-text text-base">Active Access Keys</h3>
              <p className="text-xs text-cyber-text-muted mt-1 leading-relaxed">
                Tokens forged to authenticate requests from your external script systems.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/5 font-mono text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" /> Generate New Key
            </button>
          </div>

          {/* Table display */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-cyber-panel/40 border-b border-cyber-border/30 text-[10px] text-cyber-text-muted uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-bold">Key Name</th>
                  <th className="p-4 font-bold">Token</th>
                  <th className="p-4 font-bold">Created</th>
                  <th className="p-4 font-bold">Last Used</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border/20">
                {apiKeys.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-cyber-text-muted/40 font-mono text-xs">
                      -- No active access keys cataloged. Click "Generate New Key" to forge authentication credentials --
                    </td>
                  </tr>
                ) : (
                  apiKeys.map((key) => {
                    const isLive = key.type === 'live';
                    // Render starred out token
                    const visibleToken = `${key.token.substring(0, 8)}****************${key.token.substring(key.token.length - 4)}`;
                    
                    return (
                      <tr key={key.id} className="hover:bg-cyber-panel-high/15 transition-all">
                        {/* Name Column */}
                        <td className="p-4 flex items-center gap-2.5 text-cyber-text font-sans font-semibold">
                          <span className={`w-2 h-2 rounded-full shadow-md ${
                            isLive 
                              ? 'bg-cyber-cyan shadow-cyber-cyan/50 animate-pulse' 
                              : 'bg-cyber-purple shadow-cyber-purple/50'
                          }`}></span>
                          {key.name}
                        </td>
                        
                        {/* Token Column */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <code className="bg-[#06080c] px-2.5 py-1 rounded text-cyber-text-muted/80 tracking-widest border border-cyber-border/20 text-[11px]">
                              {visibleToken}
                            </code>
                            <button 
                              onClick={() => handleCopyToken(key.id, key.token)}
                              className="text-cyber-text-muted hover:text-cyber-cyan p-1 hover:bg-cyber-panel rounded transition-all cursor-pointer" 
                              title="Copy Full Token"
                            >
                              {copiedKeyId === key.id ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                        
                        {/* Created Date */}
                        <td className="p-4 text-cyber-text-muted/60">{key.created}</td>
                        
                        {/* Last Used Timestamp */}
                        <td className="p-4 text-cyber-text-muted/60">{key.lastUsed}</td>
                        
                        {/* Revoke Button Action */}
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => {
                              onRevokeKey(key.id);
                              onAddToast(`Revoked key: ${key.name}`);
                            }}
                            className="text-cyber-text-muted hover:text-cyber-error p-1.5 hover:bg-cyber-error/10 rounded transition-all cursor-pointer" 
                            title="Revoke Token Keys"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Interactive API Key Provisioner Dialog / Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Backdrop overlay */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Content container */}
          <div className="bg-cyber-panel border border-cyber-border rounded-lg max-w-md w-full relative z-10 overflow-hidden shadow-2xl animate-scale-up">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"></div>
            
            {/* Modal Header */}
            <div className="p-5 border-b border-cyber-border/30 flex justify-between items-center bg-[#0d1117]">
              <h4 className="font-sans font-bold text-cyber-text text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyber-cyan" />
                Forge Cryptographic Token
              </h4>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-cyber-text-muted hover:text-cyber-cyan cursor-pointer p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form block */}
            <form onSubmit={handleFormSubmit} className="p-5 space-y-4 font-sans">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Key Nickname
                </label>
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Prod_Application_Server"
                  className="w-full bg-[#06080c] border border-cyber-border/70 rounded px-3 py-2 text-xs text-cyber-text placeholder:text-cyber-text-muted/30 focus:outline-none focus:border-cyber-cyan font-mono"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Credential Security Tier
                </label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Option: Live Production */}
                  <button
                    type="button"
                    onClick={() => setNewKeyType('live')}
                    className={`p-3 rounded border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                      newKeyType === 'live'
                        ? 'border-cyber-cyan bg-cyber-cyan/5 text-cyber-cyan'
                        : 'border-cyber-border/55 text-cyber-text-muted hover:border-cyber-cyan/35'
                    }`}
                  >
                    <span className="font-bold text-xs">Live (Production)</span>
                    <span className="font-mono text-[9px] opacity-70">ca_live_ token prefix</span>
                  </button>

                  {/* Option: Test Sandbox */}
                  <button
                    type="button"
                    onClick={() => setNewKeyType('test')}
                    className={`p-3 rounded border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                      newKeyType === 'test'
                        ? 'border-cyber-purple bg-cyber-purple/5 text-cyber-purple'
                        : 'border-cyber-border/55 text-cyber-text-muted hover:border-cyber-purple/35'
                    }`}
                  >
                    <span className="font-bold text-xs">Test (Sandbox)</span>
                    <span className="font-mono text-[9px] opacity-70">ca_test_ token prefix</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-cyber-purple/5 border border-cyber-purple-dim/15 rounded text-[11px] text-cyber-text-muted leading-relaxed">
                Forge algorithm initializes a secure SHA256 entropy hash. Ensure secure transit storage of this live private credentials block.
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-cyber-border/20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-cyber-border/70 text-cyber-text-muted hover:text-cyber-text font-mono text-[11px] tracking-wider uppercase rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyber-cyan hover:bg-cyber-cyan/95 text-cyber-bg font-mono text-[11px] font-bold tracking-wider uppercase rounded cursor-pointer transition-colors"
                >
                  Forge Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Static Footer Security Alert */}
      <div className="mt-12 text-center">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-border/40 to-transparent mb-4 w-full max-w-md mx-auto"></div>
        <p className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-widest">
          SYSTEM TERMINAL / SECURE ACCESS PORT ESTABLISHED
        </p>
      </div>

    </div>
  );
}
