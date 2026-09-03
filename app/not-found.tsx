import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[var(--color-meridian-blue)]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter text-[var(--color-meridian-navy)] dark:text-white/5 mb-4 relative z-10">
        404
      </h1>
      
      <div className="relative z-10 max-w-md">
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-[var(--color-meridian-muted)] mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium hover:scale-105 active:scale-95 transition-transform"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
