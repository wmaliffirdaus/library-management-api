import { useState, FormEvent } from 'react';
import { HelpCircle, Send, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface SupportViewProps {
  onAddToast: (msg: string) => void;
}

export default function SupportView({ onAddToast }: SupportViewProps) {
  const [ticketTitle, setTicketTitle] = useState<string>('');
  const [ticketCategory, setTicketCategory] = useState<string>('API Routing');
  const [ticketPriority, setTicketPriority] = useState<string>('Standard');
  const [ticketDetails, setTicketDetails] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicketId, setSubmittedTicketId] = useState<string | null>(null);

  const faqs = [
    { q: 'How do I query a RESTRICTED book?', a: 'Restricted archives require a Bearer token mapped with declassified override authority. Live key scopes default to Standard tier. Elevate your key scope by contacting security.' },
    { q: 'What is the standard rate-limit on /books?', a: 'The Cyber-Archive API limits standard requests to 60 transactions per minute per declassification token. Quota triggers return 429 rate exception codes.' },
    { q: 'How often are visual catalog indexes refreshed?', a: 'Index cells synchronize every 24 hours UTC. Manual declassification overlays can be requested dynamically inside the settings terminal.' },
  ];

  const handleTicketSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !ticketDetails.trim()) {
      onAddToast("Please fill out all transmission fields first!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const hexId = `TCK-${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}`;
      setSubmittedTicketId(hexId);
      onAddToast(`Ticket submitted successfully: ${hexId}`);
    }, 700);
  };

  const handleResetForm = () => {
    setTicketTitle('');
    setTicketDetails('');
    setSubmittedTicketId(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      
      {/* Intro Header */}
      <div>
        <h1 className="font-sans text-3xl font-bold text-cyber-text mb-2 tracking-tight flex items-center gap-2.5">
          <HelpCircle className="w-8 h-8 text-cyber-cyan" /> Secure Support Corridor
        </h1>
        <p className="text-cyber-text-muted text-xs leading-relaxed max-w-2xl">
          Transmit diagnostic exceptions, coordinate clearance overlays, or query knowledge cells directly regarding the Cyber-Archive protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Ticket transmitter console (7 columns) */}
        <div className="lg:col-span-7 bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent"></div>
          
          <h3 className="font-sans font-bold text-cyber-text text-sm mb-6 flex items-center gap-2 border-b border-cyber-border/20 pb-3">
            <Send className="w-4 h-4 text-cyber-cyan" /> Transmit Diagnostics Ticket
          </h3>

          {submittedTicketId ? (
            <div className="text-center py-8 space-y-5 animate-scale-up">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-cyber-text text-sm">TRANSMISSION BROADCAST SUCCESS</h4>
                <p className="text-xs text-cyber-text-muted leading-relaxed font-sans max-w-sm mx-auto">
                  Your diagnostics logs have been encoded and dispatched to the cyber support overlay networks.
                </p>
              </div>
              <div className="inline-block bg-[#06080c] border border-cyber-border/40 px-4 py-2 rounded text-xs font-mono font-bold tracking-widest text-cyber-cyan">
                ID: {submittedTicketId}
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2 border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/5 font-mono text-[10px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors"
                >
                  Create New Ticket
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4 font-sans">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Diagnostic Alert Subject
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Rate limit 429 override on catalog querying"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full bg-[#06080c] border border-cyber-border/60 rounded px-3 py-2 text-xs text-cyber-text font-sans focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                    Anomaly Classification
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="bg-[#06080c] border border-cyber-border/60 text-cyber-text font-sans text-xs rounded px-3 py-2 w-full focus:outline-none focus:border-cyber-cyan"
                  >
                    <option value="API Routing">API Route Handlers</option>
                    <option value="Key Security">Key Security / Cryptography</option>
                    <option value="Catalog Indexing">Catalog Database indexing</option>
                    <option value="Hologram Rendering">Hologram HUD rendering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                    Priority Level
                  </label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                    className="bg-[#06080c] border border-cyber-border/60 text-cyber-text font-sans text-xs rounded px-3 py-2 w-full focus:outline-none focus:border-cyber-cyan"
                  >
                    <option value="Standard">Standard (24h sync)</option>
                    <option value="Urgent">Urgent (4h sync)</option>
                    <option value="Critical">Critical Node Interruption (Immediate)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-wider block">
                  Exception Stack Logs / Details
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Provide precise details or copy stack trace logs describing the declassification handshake error..."
                  value={ticketDetails}
                  onChange={(e) => setTicketDetails(e.target.value)}
                  className="w-full bg-[#06080c] border border-cyber-border/60 rounded px-3 py-2 text-xs text-cyber-text font-sans focus:outline-none focus:border-cyber-cyan resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyber-cyan text-cyber-bg hover:bg-cyber-cyan/90 font-mono text-xs font-semibold tracking-wider uppercase px-6 py-2.5 rounded shadow-[0_0_12px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      DISPATCHING TICKET...
                    </span>
                  ) : (
                    "DISPATCH TICKET"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right column: FAQ knowledge cells (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-6 space-y-4">
            <h3 className="font-sans font-bold text-cyber-text text-sm flex items-center gap-2 border-b border-cyber-border/20 pb-3">
              <AlertCircle className="w-4 h-4 text-cyber-purple" /> Declassified Protocols FAQ
            </h3>

            <div className="space-y-4 pt-1">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1.5 font-sans">
                  <h4 className="font-semibold text-xs text-cyber-cyan leading-snug">
                    Q: {faq.q}
                  </h4>
                  <p className="text-[11px] text-cyber-text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
