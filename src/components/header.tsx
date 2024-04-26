"use client";

export default function Header() {
  return (
    <header className="block lg:fixed z-40 bg-slate-900 w-full">
      <nav
        className="mx-auto flex max-w-full items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-2xl font-semibold">TSConfig Guide</span>
          </a>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
            Share
          </button>
        </div>
      </nav>
    </header>
  );
}
