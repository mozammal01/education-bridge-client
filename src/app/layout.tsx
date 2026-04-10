import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/shared/smooth-scroll";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "EduBridge - Connect with Expert Tutors",
    template: "%s | EduBridge",
  },
  description:
    "EduBridge connects learners with expert tutors. Browse profiles, view availability, and book sessions instantly. Learn anything, anytime.",
  keywords: [
    "tutoring",
    "online learning",
    "education",
    "tutors",
    "education bridge",
    "learning platform",
  ],
  authors: [{ name: "EduBridge Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EduBridge",
    title: "EduBridge - Connect with Expert Tutors",
    description:
      "Connect with expert tutors and learn anything. Browse profiles, view availability, and book sessions instantly.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduBridge - Connect with Expert Tutors",
    description:
      "Connect with expert tutors and learn anything. Browse profiles, view availability, and book sessions instantly.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <SmoothScroll>
            {children}
            <Toaster position="top-right" richColors />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
