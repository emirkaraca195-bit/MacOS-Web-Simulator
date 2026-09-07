import { useState } from "react";
import { FiArrowLeft, FiExternalLink, FiSearch } from "react-icons/fi";

const GOOGLE_HOME = "https://www.google.com/webhp?igu=1";

export default function GoogleSearch() {
  const [query, setQuery] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    setIsLoading(true);
    setCurrentUrl(`https://www.google.com/search?igu=1&q=${encodeURIComponent(value)}`);
  };

  const openGoogle = () => {
    window.open(currentUrl || GOOGLE_HOME, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white text-[#202124]">
      <div className="flex items-center justify-between border-b border-black/10 bg-[#f8f9fa] px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-[#5f6368]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">G</span>
          <span>Google Arama</span>
        </div>
        <button
          type="button"
          onClick={openGoogle}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-[#5f6368] transition hover:bg-black/5"
          title="Google'ı yeni sekmede aç"
        >
          <FiExternalLink size={14} />
          Yeni sekmede aç
        </button>
      </div>

      {currentUrl ? (
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-2">
            <button
              type="button"
              onClick={() => setCurrentUrl(null)}
              className="rounded-full p-1.5 text-[#5f6368] transition hover:bg-black/5"
              title="Google ana sayfasına dön"
            >
              <FiArrowLeft size={16} />
            </button>
            <form onSubmit={search} className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-[#dfe1e5] px-3 py-1.5 shadow-sm focus-within:border-[#4285f4]">
              <FiSearch size={15} className="shrink-0 text-[#9aa0a6]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                aria-label="Google'da ara"
              />
            </form>
          </div>
          {isLoading && (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#4285f4] border-t-transparent" />
            </div>
          )}
          <iframe
            src={currentUrl}
            onLoad={() => setIsLoading(false)}
            title="Google arama sonuçları"
            className="min-h-0 flex-1 border-0"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
          <div className="mb-8 select-none text-6xl font-semibold tracking-[-0.08em]">
            <span className="text-[#4285f4]">G</span><span className="text-[#ea4335]">o</span><span className="text-[#fbbc05]">o</span><span className="text-[#4285f4]">g</span><span className="text-[#34a853]">l</span><span className="text-[#ea4335]">e</span>
          </div>
          <form onSubmit={search} className="flex w-full max-w-[560px] items-center gap-3 rounded-full border border-[#dfe1e5] px-5 py-3 shadow-sm transition hover:shadow-md focus-within:shadow-md">
            <FiSearch size={19} className="shrink-0 text-[#9aa0a6]" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Google'da ara veya bir URL yaz"
              className="min-w-0 flex-1 bg-transparent text-[15px] outline-none"
              aria-label="Google'da ara"
            />
          </form>
          <div className="mt-7 flex gap-3">
            <button type="button" onClick={search} className="rounded-md bg-[#f8f9fa] px-4 py-2 text-sm text-[#3c4043] hover:shadow-sm">Google'da Ara</button>
            <button type="button" onClick={() => window.open(GOOGLE_HOME, "_blank", "noopener,noreferrer")} className="rounded-md bg-[#f8f9fa] px-4 py-2 text-sm text-[#3c4043] hover:shadow-sm">Yeni sekmede aç</button>
          </div>
        </div>
      )}
    </div>
  );
}
