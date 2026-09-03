export default function TermsOfService() {
  return (
    <div className="container mx-auto px-6 max-w-3xl py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-[var(--color-meridian-muted)]">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-4">
          Welcome to Meridian Web Co. These Terms of Service ("Terms") govern your use of our website and services.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[var(--foreground)]">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[var(--foreground)]">Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the materials (information or software) on Meridian Web Co.'s website for personal, non-commercial transitory viewing only.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[var(--foreground)]">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at: <a href="mailto:meridianwebco1@gmail.com" className="text-[var(--color-meridian-blue)] hover:underline">meridianwebco1@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
