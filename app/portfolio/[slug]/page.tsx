import { getCaseStudy, portfolioData } from "@/lib/data/portfolio";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return portfolioData.map((study) => ({
    slug: study.slug,
  }));
}

export default async function PortfolioCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-16 relative">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[var(--color-meridian-blue)]/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[var(--color-meridian-navy)]/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <Link 
          href="/#portfolio" 
          className="inline-flex items-center gap-2 text-[var(--color-meridian-muted)] hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-3 text-[var(--color-meridian-blue)] text-sm font-semibold tracking-wider uppercase mb-4">
            <span>{study.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{study.client}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            {study.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--color-meridian-muted)] max-w-3xl leading-relaxed">
            {study.description}
          </p>
        </header>

        <div className="w-full aspect-video relative rounded-3xl overflow-hidden mb-20 group">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16 mb-20">
          <div className="space-y-16">
            <section>
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-[var(--color-meridian-muted)] text-lg leading-relaxed">
                {study.challenge}
              </p>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold mb-6">The Solution</h2>
              <p className="text-[var(--color-meridian-muted)] text-lg leading-relaxed">
                {study.solution}
              </p>
            </section>
          </div>

          <div className="space-y-12">
            <section className="glass p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Key Results</h3>
              <ul className="space-y-4">
                {study.results.map((result, index) => (
                  <li key={index} className="flex gap-3 text-[var(--color-meridian-muted)]">
                    <span className="text-[var(--color-meridian-blue)] font-bold">✓</span>
                    {result}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 rounded-full border border-[var(--foreground)]/10 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {study.liveLink && (
              <a 
                href={study.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full overflow-hidden rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium py-4 transition-transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Live Site
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
              </a>
            )}
          </div>
        </div>

        {study.gallery.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-10">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {study.gallery.map((img, idx) => (
                <div key={idx} className="w-full aspect-video relative rounded-3xl overflow-hidden group">
                  <Image
                    src={img}
                    alt={`${study.title} gallery image ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Next project CTA could go here */}
      </div>
    </div>
  );
}
