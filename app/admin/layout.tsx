"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { MotionDiv } from "@/components/MotionDiv";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Articles", href: "/admin/articles", icon: FileText },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex transition-colors duration-300">
            {/* Sidebar */}
            <MotionDiv
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="fixed inset-y-0 left-0 z-50 bg-white dark:bg-black/50 backdrop-blur-xl border-r border-gray-200 dark:border-zinc-800 flex flex-col transition-all duration-300"
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-zinc-800">
                    {isSidebarOpen ? (
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                            Admin Panel
                        </span>
                    ) : null}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                                    }`}
                            >
                                {isActive && (
                                    <MotionDiv
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <item.icon size={20} className="relative z-10" />
                                {isSidebarOpen && (
                                    <span className="font-medium relative z-10">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
                    <button
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors ${!isSidebarOpen && "justify-center"}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </MotionDiv>

            {/* Main Content */}
            <MotionDiv
                animate={{ paddingLeft: isSidebarOpen ? 280 : 80 }}
                className="flex-1 transition-all duration-300"
            >
                <main className="p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </MotionDiv>
        </div>
    );
}
