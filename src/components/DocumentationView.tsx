import { useState, useEffect } from 'react';
import { Sliders, Lock, Play, Copy, Check, Loader2, RefreshCw } from 'lucide-react';
import { Book, ApiKey } from '../types';
import { mockBooks } from '../data/mockBooks';

interface DocumentationViewProps {
  apiKeys: ApiKey[];
  onAddToast: (msg: string) => void;
}

export default function DocumentationView({ apiKeys, onAddToast }: DocumentationViewProps) {
  // Input fields for Try It Out API Console
  const [limit, setLimit] = useState<number>(20);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [epochStart, setEpochStart] = useState<string>('2084-11-04');
  const [selectedKey, setSelectedKey] = useState<string>('');
  
  // Console state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Available unique genres for the interactive dropdown
  const genres = ['All', 'Cyberpunk', 'Sci-Fi', 'Technical', 'Metaverse Theory'];

  // Initialize selectedKey with the first active key if available
  useEffect(() => {
    if (apiKeys.length > 0 && !selectedKey) {
      setSelectedKey(apiKeys[0].token);
    }
  }, [apiKeys, selectedKey]);

  // Initial Response generation
  useEffect(() => {
    generateResponse(true);
  }, []);

  const generateResponse = (immediate = false) => {
    // Check key if not immediate
    if (!immediate && !selectedKey) {
      setApiError("UNAUTHORIZED: Request blocked. No Bearer token provided in header.");
      setJsonResponse(null);
      return;
    }

    setApiError(null);
    if (immediate) {
      runQuery();
    } else {
      setIsLoading(true);
      setTimeout(() => {
        runQuery();
        setIsLoading(false);
        onAddToast("GET /api/v2/books - Query transmitted successfully.");
      }, 700);
    }
  };

  const runQuery = () => {
    // Filter books based on params
    let filtered = [...mockBooks];

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(b => b.genre.toLowerCase() === selectedGenre.toLowerCase());
    }

    // Filter by publication date (epoch_start)
    if (epochStart) {
      const startYear = parseInt(epochStart.substring(0, 4));
      if (!isNaN(startYear)) {
        filtered = filtered.filter(b => b.publicationYear >= startYear);
      }
    }

    // Limit records
    const finalBooks = filtered.slice(0, Math.min(limit, 100));

    setJsonResponse({
      status: 200,
      data: finalBooks.map(b => ({
        id: b.id,
        title: b.title,
        author: b.author,
        genre: b.genre,
        archived_at: b.archivedAt
      })),
      meta: {
        total_count: filtered.length,
        has_more: filtered.length > limit,
        limit_applied: limit
      }
    });
  };

  const handleCopy = () => {
    if (!jsonResponse) return;
    navigator.clipboard.writeText(JSON.stringify(jsonResponse, null, 2));
    setIsCopied(true);
    onAddToast("JSON response copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Endpoint Title Section */}
      <div className="animate-fade-in">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="bg-cyber-cyan/10 text-cyber-cyan font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-sm border border-cyber-cyan/20 shadow-[0_0_8px_rgba(0,240,255,0.15)] uppercase">
            GET
          </span>
          <h1 className="font-sans text-3xl md:text-5xl font-bold text-cyber-text tracking-tight">
            /books
          </h1>
        </div>
        <p className="font-sans text-sm md:text-base text-cyber-text-muted max-w-3xl leading-relaxed">
          Retrieves a paginated list of catalog entries from the digital vault archive database. 
          Use query parameters to search and filter results by genre, author, or specific temporal epochs.
        </p>
      </div>

      {/* Main Sandbox Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Params & Details */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Query Parameters Section */}
          <section className="bg-cyber-surface rounded-lg border border-cyber-border/40 overflow-hidden relative p-6">
            {/* Glossy top divider decoration */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <h2 className="font-sans text-lg font-bold text-cyber-text mb-6 flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-cyber-cyan" />
              Interactive Query Parameters
            </h2>

            <div className="divide-y divide-cyber-border/20 space-y-4">
              
              {/* Param: limit */}
              <div className="pt-4 first:pt-0 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm text-cyber-cyan font-semibold">limit</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-panel text-cyber-text-muted border border-cyber-border/30">
                      integer
                    </span>
                    <span className="text-[10px] font-mono text-cyber-text-muted/60 uppercase">Optional</span>
                  </div>
                  <p className="text-xs text-cyber-text-muted leading-relaxed">
                    The maximum number of records to return. Default is{' '}
                    <code className="bg-cyber-panel/80 px-1.5 py-0.5 rounded text-cyber-purple font-mono">20</code>, maximum is{' '}
                    <code className="bg-cyber-panel/80 px-1.5 py-0.5 rounded text-cyber-purple font-mono">100</code>.
                  </p>
                </div>
                <div className="shrink-0">
                  <input 
                    type="number" 
                    min={1} 
                    max={100}
                    value={limit}
                    onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 20))}
                    className="w-24 bg-cyber-panel border border-cyber-border/70 rounded px-2.5 py-1 text-xs text-cyber-cyan focus:outline-none focus:border-cyber-cyan font-mono"
                  />
                </div>
              </div>

              {/* Param: genre */}
              <div className="pt-4 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm text-cyber-cyan font-semibold">genre</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-panel text-cyber-text-muted border border-cyber-border/30">
                      string
                    </span>
                    <span className="text-[10px] font-mono text-cyber-text-muted/60 uppercase">Optional</span>
                  </div>
                  <p className="text-xs text-cyber-text-muted leading-relaxed">
                    Filter catalog by a specific literary classification. Supports standard cyberpunk and technical classifications.
                  </p>
                </div>
                <div className="shrink-0">
                  <select 
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-40 bg-cyber-panel border border-cyber-border/70 rounded px-2.5 py-1 text-xs text-cyber-cyan focus:outline-none focus:border-cyber-cyan font-sans"
                  >
                    {genres.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Param: epoch_start */}
              <div className="pt-4 pb-2 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-sm text-cyber-cyan font-semibold">epoch_start</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyber-panel text-cyber-text-muted border border-cyber-border/30">
                      iso-8601
                    </span>
                    <span className="text-[10px] font-mono text-cyber-text-muted/60 uppercase">Optional</span>
                  </div>
                  <p className="text-xs text-cyber-text-muted leading-relaxed">
                    Filter by archives archived on or after this specific date timestamp. Enter a year or complete ISO date.
                  </p>
                </div>
                <div className="shrink-0">
                  <input 
                    type="text" 
                    placeholder="YYYY-MM-DD"
                    value={epochStart}
                    onChange={(e) => setEpochStart(e.target.value)}
                    className="w-40 bg-cyber-panel border border-cyber-border/70 rounded px-2.5 py-1 text-xs text-cyber-cyan focus:outline-none focus:border-cyber-cyan font-mono"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Authorization Selector Section */}
          <div className="p-5 rounded-lg border border-cyber-purple-dim/30 bg-cyber-purple/5 space-y-4">
            <div className="flex gap-4 items-start">
              <Lock className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
              <div>
                <h3 className="font-sans font-semibold text-cyber-text text-sm">Authorization Token</h3>
                <p className="text-xs text-cyber-text-muted leading-relaxed">
                  This endpoint requires a valid cryptographic Bearer token. Choose an active API Key from your developer profile to authenticate requests:
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center pl-9">
              <label className="font-mono text-[11px] text-cyber-text-muted uppercase">Selected Key:</label>
              {apiKeys.length === 0 ? (
                <div className="text-xs text-cyber-error font-mono font-medium">
                  [!] No API Keys exist. Go to Developer Dashboard to forge a key first.
                </div>
              ) : (
                <select
                  value={selectedKey}
                  onChange={(e) => setSelectedKey(e.target.value)}
                  className="bg-cyber-panel border border-cyber-border/60 text-cyber-cyan font-mono text-xs rounded px-3 py-1.5 focus:outline-none focus:border-cyber-cyan max-w-xs"
                >
                  <option value="">-- No Authentication --</option>
                  {apiKeys.map(k => (
                    <option key={k.id} value={k.token}>
                      {k.name} ({k.token.substring(0, 10)}...)
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Execution Controller & JSON Viewer */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Action trigger row */}
          <div className="flex justify-end gap-3 items-center">
            {selectedKey && (
              <span className="text-[10px] font-mono text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                Key Ready
              </span>
            )}
            <button
              onClick={() => generateResponse(false)}
              disabled={isLoading}
              className="bg-cyber-cyan text-cyber-bg hover:bg-cyber-cyan/90 font-mono text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              Try It Out
            </button>
          </div>

          {/* Console / Response Viewer Container */}
          <div className="bg-cyber-surface rounded-lg border border-cyber-border/50 overflow-hidden shadow-2xl flex flex-col relative">
            
            {/* Header console panel bar */}
            <div className="bg-cyber-panel/80 border-b border-cyber-border/30 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-border/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-border/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-border/80"></span>
              </div>
              <div className="font-mono text-[10px] text-cyber-text-muted/70 tracking-widest uppercase">
                {isLoading ? "TRANSMITTING REQUEST..." : apiError ? "ERROR RESPONSE" : "RESPONSE - 200 OK"}
              </div>
              <div className="flex items-center gap-1">
                {jsonResponse && (
                  <button 
                    onClick={handleCopy}
                    className="text-cyber-text-muted hover:text-cyber-cyan p-1 hover:bg-cyber-panel rounded transition-colors cursor-pointer" 
                    title="Copy to clipboard"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>

            {/* Console Screen Body */}
            <div className="p-4 overflow-y-auto h-[450px] font-mono text-xs leading-relaxed bg-[#06080c] relative">
              <div className="cyber-scanline opacity-10"></div>
              
              {isLoading ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-cyber-cyan-dim font-mono text-xs">
                  <Loader2 className="w-8 h-8 animate-spin text-cyber-cyan" />
                  <span>Syncing with Cyber-Archive database...</span>
                </div>
              ) : apiError ? (
                <div className="text-red-400 font-mono whitespace-pre-wrap leading-relaxed py-2">
                  <div className="font-bold border-b border-red-500/30 pb-1 mb-2">
                    [x] API EXCEPTION ENCOUNTERED
                  </div>
                  {apiError}
                  <div className="mt-4 text-cyber-text-muted/60 text-[11px] leading-relaxed">
                    Make sure an active key token is passed in the Authorization request header. 
                    Visit the "Developer Dashboard" tab to generate a dynamic live key.
                  </div>
                </div>
              ) : jsonResponse ? (
                <pre className="text-cyber-text-muted overflow-x-auto whitespace-pre-wrap">
                  {/* Custom pseudo-color highlighted formatted print */}
                  <code>
                    <span className="text-cyber-border">{`{`}</span>
                    {`\n  `}
                    <span className="text-cyber-purple">"status"</span>
                    <span className="text-cyber-border">:</span>{' '}
                    <span className="text-cyber-cyan">200</span>
                    <span className="text-cyber-border">,</span>
                    {`\n  `}
                    <span className="text-cyber-purple">"data"</span>
                    <span className="text-cyber-border">:</span>{' '}
                    <span className="text-cyber-border">[</span>
                    
                    {jsonResponse.data.map((book: any, idx: number) => (
                      <span key={book.id}>
                        {`\n    `}
                        <span className="text-cyber-border">{`{`}</span>
                        {`\n      `}
                        <span className="text-cyber-purple">"id"</span>
                        <span className="text-cyber-border">:</span>{' '}
                        <span className="text-green-400">"{book.id}"</span>
                        <span className="text-cyber-border">,</span>
                        {`\n      `}
                        <span className="text-cyber-purple">"title"</span>
                        <span className="text-cyber-border">:</span>{' '}
                        <span className="text-green-400">"{book.title}"</span>
                        <span className="text-cyber-border">,</span>
                        {`\n      `}
                        <span className="text-cyber-purple">"author"</span>
                        <span className="text-cyber-border">:</span>{' '}
                        <span className="text-green-400">"{book.author}"</span>
                        <span className="text-cyber-border">,</span>
                        {`\n      `}
                        <span className="text-cyber-purple">"genre"</span>
                        <span className="text-cyber-border">:</span>{' '}
                        <span className="text-green-400">"{book.genre}"</span>
                        <span className="text-cyber-border">,</span>
                        {`\n      `}
                        <span className="text-cyber-purple">"archived_at"</span>
                        <span className="text-cyber-border">:</span>{' '}
                        <span className="text-green-400">"{book.archived_at}"</span>
                        {`\n    `}
                        <span className="text-cyber-border">{`}`}</span>
                        {idx < jsonResponse.data.length - 1 ? <span className="text-cyber-border">,</span> : ''}
                      </span>
                    ))}
                    
                    {`\n  `}
                    <span className="text-cyber-border">]</span>
                    <span className="text-cyber-border">,</span>
                    {`\n  `}
                    <span className="text-cyber-purple">"meta"</span>
                    <span className="text-cyber-border">:</span>{' '}
                    <span className="text-cyber-border">{`{`}</span>
                    {`\n    `}
                    <span className="text-cyber-purple">"total_count"</span>
                    <span className="text-cyber-border">:</span>{' '}
                    <span className="text-cyber-cyan">{jsonResponse.meta.total_count}</span>
                    <span className="text-cyber-border">,</span>
                    {`\n    `}
                    <span className="text-cyber-purple">"has_more"</span>
                    <span className="text-cyber-border">:</span>{' '}
                    <span className="text-cyber-cyan">{jsonResponse.meta.has_more ? 'true' : 'false'}</span>
                    <span className="text-cyber-border">,</span>
                    {`\n    `}
                    <span className="text-cyber-purple">"limit_applied"</span>
                    <span className="text-cyber-border">:</span>{' '}
                    <span className="text-cyber-cyan">{jsonResponse.meta.limit_applied}</span>
                    {`\n  `}
                    <span className="text-cyber-border">{`}`}</span>
                    {`\n`}
                    <span className="text-cyber-border">{`}`}</span>
                  </code>
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center text-cyber-text-muted/40 font-mono text-[11px] text-center">
                  -- Run the 'Try It Out' query or compile a manual request to capture JSON response logs --
                </div>
              )}
            </div>

            {/* Console Bottom Action Help */}
            <div className="bg-cyber-panel/40 border-t border-cyber-border/20 px-4 py-2 font-mono text-[10px] text-cyber-text-muted/50 flex justify-between items-center">
              <span>PROTOCOL: REST v2.4</span>
              <span>HOST: API.CYBER-ARCHIVE.IO</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
