import { Logo } from "@/components/shared";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side - form */}
      <div className="flex flex-col">
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          {children}
        </div>
      </div>

      {/* right side - decorative */}
      <div className="hidden lg:flex relative bg-linear-to-br from-primary via-primary to-primary/80 p-12 items-center justify-center">
        {/* bg shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md text-white">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Connect with expert tutors, book sessions instantly, and achieve your learning goals faster than ever.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Access to 500+ verified tutors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Flexible scheduling options</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </div>
              <span>Secure payment & booking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
