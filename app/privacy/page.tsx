export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-6 max-w-3xl py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-[var(--color-meridian-muted)]">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mb-4">
          At Meridian Web Co., we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[var(--foreground)]">Information We Collect</h2>
        <p className="mb-4">
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-4 text-[var(--foreground)]">Contact Us</h2>
        <p className="mb-4">
          If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:meridianwebco1@gmail.com" className="text-[var(--color-meridian-blue)] hover:underline">meridianwebco1@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
