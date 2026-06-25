import { Activity, ShieldCheck, Heart, Server, Cpu, Database, HardDrive } from 'lucide-react';

export default function ApiStatusView() {
  const services = [
    { name: 'Archival Catalog DB', icon: Database, uptime: '100%', latency: '14ms', status: 'Operational' },
    { name: 'Key Provisioner Engine', icon: Cpu, uptime: '100%', latency: '2ms', status: 'Operational' },
    { name: 'REST v2 Route Handlers', icon: Server, uptime: '99.98%', latency: '26ms', status: 'Operational' },
    { name: 'Holographic Memory Array Relays', icon: HardDrive, uptime: '100%', latency: '8ms', status: 'Operational' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Banner status */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center text-green-400 shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.15)] animate-pulse">
          <ShieldCheck className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="font-sans font-bold text-green-400 text-lg uppercase tracking-wider">All Archival Sectors Operational</h2>
          <p className="text-xs text-cyber-text-muted mt-1 leading-relaxed">
            The database telemetry engine indicates all core routers and declassification nodes are working at maximum efficiency. Uptime: 99.99%.
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Active service nodes list */}
        <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 space-y-4">
          <h3 className="font-sans font-bold text-cyber-text text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-cyan" /> Service Status
          </h3>
          
          <div className="divide-y divide-cyber-border/20 space-y-3 pt-2">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#06080c] rounded border border-cyber-border/20 text-cyber-cyan/70">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-sans font-semibold text-xs text-cyber-text">{srv.name}</div>
                      <div className="font-mono text-[10px] text-cyber-text-muted/60">Latency: {srv.latency}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-green-400 font-bold font-mono tracking-wide">{srv.status}</div>
                    <div className="text-[9px] font-mono text-cyber-text-muted/50">Uptime: {srv.uptime}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Operational Telemetry Graphics */}
        <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-cyber-text text-base flex items-center gap-2">
              <Heart className="w-5 h-5 text-cyber-purple animate-pulse" /> Uptime Timeline (Last 30 Days)
            </h3>
            <p className="text-xs text-cyber-text-muted leading-relaxed">
              Consolidated query resolution indexes tracked over declassification routers.
            </p>

            {/* Simulated server blocks timeline */}
            <div className="grid grid-cols-10 gap-1.5 pt-4">
              {Array.from({ length: 30 }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-10 rounded border transition-all hover:scale-105 cursor-help ${
                    idx === 22 
                      ? 'bg-yellow-500/20 border-yellow-500/40' // Single minor maintenance node
                      : 'bg-green-500/25 border-green-500/40 shadow-[0_0_4px_rgba(34,197,94,0.1)]'
                  }`}
                  title={`Router Day -${30 - idx}: 100% operational`}
                />
              ))}
            </div>
            
            <div className="flex justify-between text-[9px] font-mono text-cyber-text-muted/60 pt-2">
              <span>30 days ago</span>
              <span>100% active</span>
              <span>Today</span>
            </div>
          </div>

          <div className="border-t border-cyber-border/20 pt-4 mt-6">
            <h4 className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider mb-2 font-bold">Node Geographic Latencies</h4>
            <div className="space-y-1.5 text-[10px] font-mono text-cyber-text-muted/80">
              <div className="flex justify-between">
                <span>Sector-Asia East Relay [Tokyo]</span>
                <span className="text-cyber-cyan font-bold">14ms</span>
              </div>
              <div className="flex justify-between">
                <span>Sector-US West Router [Oregon]</span>
                <span className="text-cyber-cyan font-bold">42ms</span>
              </div>
              <div className="flex justify-between">
                <span>Sector-EU Central Node [Frankfurt]</span>
                <span className="text-cyber-cyan font-bold">88ms</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
