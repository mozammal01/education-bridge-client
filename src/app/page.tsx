import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-background via-secondary/30 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 flex flex-col items-center gap-8 p-8 text-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/25">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-primary">Skill</span>
            <span className="text-foreground">Bridge</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl text-muted-foreground max-w-md">
          Connect with Expert Tutors, Learn Anything
        </p>

        {/* Setup Status */}
        <div className="mt-8 p-6 bg-card rounded-2xl border shadow-sm max-w-lg">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            ✅ Step 1 Complete: Project Setup
          </h2>
          <ul className="text-left text-sm text-muted-foreground space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Brand colors configured (Teal/Emerald theme)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Custom fonts added (Outfit & DM Sans)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              TypeScript types defined
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Mock data & constants ready
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              Folder structure created
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-4">
          <Button size="lg" className="shadow-lg shadow-primary/25">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          <span className="px-3 py-1 bg-muted rounded-full">Next.js 16</span>
          <span className="px-3 py-1 bg-muted rounded-full">React 19</span>
          <span className="px-3 py-1 bg-muted rounded-full">TypeScript</span>
          <span className="px-3 py-1 bg-muted rounded-full">Tailwind CSS 4</span>
          <span className="px-3 py-1 bg-muted rounded-full">Shadcn UI</span>
        </div>
      </main>
    </div>
  );
}
