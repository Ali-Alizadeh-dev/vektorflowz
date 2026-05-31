import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-base text-muted">
        <div className="flex items-center gap-3">
          <span className="relative inline-block w-5 h-5">
            <span className="absolute inset-0 rounded-md bg-accent" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-bg">
              V
            </span>
          </span>
          <span className="text-fg font-medium">Vektorflowz</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/impressum" className="hover:text-fg transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-fg transition-colors">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
