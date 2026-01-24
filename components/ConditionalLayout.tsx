"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Don't show header/footer on admin or auth pages
    const isAdminOrAuth = pathname.startsWith('/admin') || pathname.startsWith('/auth');

    if (isAdminOrAuth) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
