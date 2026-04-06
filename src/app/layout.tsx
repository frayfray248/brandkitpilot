import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "BrandKitPilot - Professional Brand Messaging in Minutes",
    description: "Turn what makes your business special into clear, compelling messaging. AI-powered brand kit generation for entrepreneurs and small business owners.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <header>
                    <Header />
                </header>
                <main className="flex-1 bg-base-200">
                    {children}
                </main>
                <footer>
                    <Footer />
                </footer>

            </body>
        </html>
    );
}
