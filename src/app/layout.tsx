import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AnimationWrapper } from "@/components/layout/AnimationWrapper";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { FloatingChatbot } from "@/components/chatbot/FloatingChatbot";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: "AdviseInt - Generative AI Solutions",
  description: "Your trusted partner in AI-powered innovation.",
};

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID}/>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar/>
              <main className="flex-1">
                <AnimationWrapper>{children}</AnimationWrapper>
              </main>
            <Footer/>
          </div>
          <Toaster/>
          <FloatingChatbot/>
        </ThemeProvider>
      </body>
    </html>
  );
}
