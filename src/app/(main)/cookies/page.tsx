import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn how EduBridge uses cookies to improve your experience",
};

export default function CookiePolicyPage() {
  const lastUpdated = "April 10, 2026";

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-muted-foreground">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. What are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
            when you visit a website. They are widely used to make websites work or work more efficiently, 
            as well as to provide information to the owners of the site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. How We Use Cookies</h2>
          <p>
            EduBridge uses cookies for several reasons. Some cookies are required for technical reasons 
            in order for our platform to operate, and we refer to these as "essential" or "strictly necessary" cookies. 
            Others enable us to track and target the interests of our users to enhance the experience on our platform.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our site and to use some of its features, such as access to secure areas.</li>
            <li><strong>Performance and Functionality Cookies:</strong> These are used to enhance the performance and functionality of our site but are non-essential to its use.</li>
            <li><strong>Analytics and Customization Cookies:</strong> These collect information that is used either in aggregate form to help us understand how our site is being used or how effective our marketing campaigns are.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Managing Your Cookie Preferences</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend 
            your web browser controls to accept or refuse cookies. If you choose to reject cookies, 
            you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
        </section>

        <section className="space-y-4 text-sm bg-muted p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-bold text-foreground mb-2">Questions?</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, 
            please email us at <a href="mailto:privacy@edubridge.com" className="text-primary font-bold">privacy@edubridge.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
