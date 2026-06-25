import { useState, useMemo } from 'react';
import { Search, Book, BookOpen, SlidersHorizontal, ChevronLeft, ChevronRight, RefreshCw, X } from 'lucide-react';
import { Book as BookType } from '../types';
import { mockBooks } from '../data/mockBooks';

interface BookCatalogViewProps {
  onAddToast: (msg: string) => void;
}

export default function BookCatalogView({ onAddToast }: BookCatalogViewProps) {
  // Filters & query states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedCentury, setSelectedCentury] = useState<string>('Any');
  const [selectedLang, setSelectedLang] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const genres = ['All', 'Cyberpunk', 'Sci-Fi', 'Technical', 'Metaverse Theory'];
  const centuries = ['Any', '21st', '22nd'];
  const languages = ['All', 'EN', 'JP', 'BIN'];

  // Clear filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedCentury('Any');
    setSelectedLang('All');
    setCurrentPage(1);
    onAddToast("Vault filters cleared.");
  };

  // Live filtering logic using useMemo
  const filteredBooks = useMemo(() => {
    return mockBooks.filter((book) => {
      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === '' || 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.id.toLowerCase().includes(query);

      // Genre matching
      const matchesGenre = selectedGenre === 'All' || 
        book.genre.toLowerCase() === selectedGenre.toLowerCase();

      // Century matching
      const matchesCentury = selectedCentury === 'Any' || 
        book.century.toLowerCase() === selectedCentury.toLowerCase();

      // Language matching
      const matchesLang = selectedLang === 'All' || 
        book.language.toLowerCase() === selectedLang.toLowerCase();

      return matchesSearch && matchesGenre && matchesCentury && matchesLang;
    });
  }, [searchQuery, selectedGenre, selectedCentury, selectedLang]);

  // Pagination calculation
  const totalItems = filteredBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  // Safe page pointer adjustment if filters shrink results below current page
  const activePage = currentPage > totalPages ? 1 : currentPage;

  const paginatedBooks = useMemo(() => {
    const startIdx = (activePage - 1) * itemsPerPage;
    return filteredBooks.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredBooks, activePage]);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    onAddToast(`Navigated to page ${pageNum} in Digital Vault.`);
  };

  const getStatusStyle = (status: BookType['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30';
      case 'RESTRICTED':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'PRE-ORDER':
        return 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30';
      default:
        return 'bg-cyber-text-muted/20 text-cyber-text-muted border-cyber-border';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div>
        <h1 className="font-sans text-3xl md:text-5xl font-bold text-cyber-text mb-2 tracking-tight">
          Digital Vault Explorer
        </h1>
        <p className="text-cyber-text-muted text-sm md:text-base max-w-3xl leading-relaxed">
          Query the global digital catalog of literature. Interface with over 10M+ holographic records via live query operations.
          <span className="text-cyber-cyan font-mono text-xs bg-cyber-cyan/10 px-2 py-0.5 rounded ml-2 font-semibold">
            GET /api/v2/books
          </span>
        </p>
      </div>

      {/* Interactive Search & Filter Bar */}
      <div className="bg-cyber-surface border border-cyber-border/40 p-4 rounded-lg flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-cyan w-5 h-5" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="QUERY: Title, Author, or ISBN..."
            className="w-full bg-cyber-panel/80 border border-cyber-border/60 text-cyber-text py-3 pl-12 pr-4 font-mono text-xs placeholder-cyber-text-muted/40 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan/25 rounded-md transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cyber-text-muted hover:text-cyber-cyan transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown filters rows */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
          {/* Filter: Genre */}
          <select 
            value={selectedGenre}
            onChange={(e) => { setSelectedGenre(e.target.value); setCurrentPage(1); }}
            className="bg-cyber-panel border border-cyber-border/50 text-cyber-text text-xs rounded px-4 py-2.5 hover:border-cyber-cyan/50 focus:outline-none focus:border-cyber-cyan font-sans transition-colors cursor-pointer"
          >
            {genres.map(g => (
              <option key={g} value={g}>Genre: {g}</option>
            ))}
          </select>

          {/* Filter: Century */}
          <select 
            value={selectedCentury}
            onChange={(e) => { setSelectedCentury(e.target.value); setCurrentPage(1); }}
            className="bg-cyber-panel border border-cyber-border/50 text-cyber-text text-xs rounded px-4 py-2.5 hover:border-cyber-cyan/50 focus:outline-none focus:border-cyber-cyan font-sans transition-colors cursor-pointer"
          >
            {centuries.map(c => (
              <option key={c} value={c}>Century: {c}</option>
            ))}
          </select>

          {/* Filter: Language */}
          <select 
            value={selectedLang}
            onChange={(e) => { setSelectedLang(e.target.value); setCurrentPage(1); }}
            className="bg-cyber-panel border border-cyber-border/50 text-cyber-text text-xs rounded px-4 py-2.5 hover:border-cyber-cyan/50 focus:outline-none focus:border-cyber-cyan font-sans transition-colors cursor-pointer"
          >
            {languages.map(l => (
              <option key={l} value={l}>Lang: {l}</option>
            ))}
          </select>

          {/* Clear Filters Quick Action */}
          {(searchQuery || selectedGenre !== 'All' || selectedCentury !== 'Any' || selectedLang !== 'All') && (
            <button 
              onClick={resetFilters}
              className="bg-cyber-panel-high/80 hover:bg-cyber-cyan hover:text-cyber-bg p-2.5 rounded border border-cyber-border text-cyber-text transition-all duration-200 flex items-center justify-center cursor-pointer"
              title="Reset Filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filtering Status Indicator */}
      <div className="flex items-center justify-between font-mono text-[11px] text-cyber-text-muted/60 px-1">
        <span>Vault Query Scan: {filteredBooks.length} records matched.</span>
        <span>Displaying {paginatedBooks.length} items.</span>
      </div>

      {/* Grid Results */}
      {paginatedBooks.length === 0 ? (
        <div className="text-center py-20 bg-cyber-surface/30 rounded-lg border border-dashed border-cyber-border/40">
          <Book className="w-12 h-12 text-cyber-text-muted/30 mx-auto mb-4" />
          <h3 className="text-cyber-text font-semibold text-sm mb-1 uppercase tracking-wider">No Archives Found</h3>
          <p className="text-cyber-text-muted text-xs max-w-xs mx-auto mb-6 leading-relaxed">
            There are no literature cells cataloged under the queried parameters inside this secure terminal block.
          </p>
          <button 
            onClick={resetFilters}
            className="border border-cyber-cyan/40 text-cyber-cyan hover:bg-cyber-cyan/5 px-4 py-2 rounded text-xs font-mono font-medium transition-colors"
          >
            Declassify Query Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-cyber-surface border border-cyber-border/40 rounded-lg p-1.5 group hover:-translate-y-1 hover:border-cyber-cyan/50 hover:shadow-[0_4px_20px_rgba(0,240,255,0.08)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Cover Container */}
              <div className="h-60 bg-[#06080c] rounded-md mb-4 overflow-hidden border border-cyber-border/20 relative flex items-center justify-center shrink-0">
                <div className="cyber-scanline opacity-15"></div>
                
                {/* Holographic glowing center icon */}
                <div className="absolute inset-0 flex items-center justify-center text-cyber-cyan/10 group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-16 h-16 text-cyber-cyan/5 text-[64px]" />
                </div>
                
                {/* Custom graphic details to make cover beautiful */}
                <div className="text-center z-10 px-4 space-y-2">
                  <Book className="w-10 h-10 text-cyber-cyan/40 mx-auto group-hover:text-cyber-cyan/70 transition-colors" />
                  <div className="font-mono text-[9px] text-cyber-text-muted/40 uppercase tracking-widest">{book.genre} Cell</div>
                </div>

                {/* Status Overlay Ribbon */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider border ${getStatusStyle(book.status)}`}>
                    {book.status}
                  </span>
                </div>
              </div>

              {/* Text metadata block */}
              <div className="px-3 pb-3 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-sans text-sm font-bold text-cyber-text mb-1 truncate group-hover:text-cyber-cyan transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-cyber-text-muted/80 mb-4 font-mono truncate">
                    {book.author} • {book.publicationYear} Ed.
                  </p>
                </div>
                
                <div>
                  {/* Neon micro divider */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-border/40 to-transparent w-full mb-3"></div>
                  
                  {/* Format & Identification bar */}
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-cyber-text-muted/60">
                      ID: <span className="text-cyber-cyan/80 font-semibold">{book.id}</span>
                    </span>
                    <span className="text-cyber-text-muted/50 truncate max-w-[130px]" title={book.format}>
                      FMT: {book.format}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination component */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 font-mono text-xs">
          <button 
            disabled={activePage === 1}
            onClick={() => handlePageChange(activePage - 1)}
            className="p-2 text-cyber-text-muted hover:text-cyber-cyan disabled:opacity-30 disabled:hover:text-cyber-text-muted transition-colors border border-cyber-border/40 rounded hover:border-cyber-cyan/40 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCurrent = activePage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center border rounded transition-all cursor-pointer ${
                  isCurrent 
                    ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold' 
                    : 'text-cyber-text-muted border-transparent hover:text-cyber-text hover:bg-cyber-panel-high/50 hover:border-cyber-border/50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            disabled={activePage === totalPages}
            onClick={() => handlePageChange(activePage + 1)}
            className="p-2 text-cyber-text-muted hover:text-cyber-cyan disabled:opacity-30 disabled:hover:text-cyber-text-muted transition-colors border border-cyber-border/40 rounded hover:border-cyber-cyan/40 cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
