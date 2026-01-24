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
        { name: "Главная", href: "/admin", icon: LayoutDashboard },
        { name: "Статьи", href: "/admin/articles", icon: FileText },
        { name: "Настройки", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <MotionDiv
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300"
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
                    {isSidebarOpen ? (
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                            Админ-панель
                        </span>
                    ) : null}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                                    ? "text-blue-600 bg-blue-50"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {isActive && (
                                    <MotionDiv
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-blue-50 rounded-xl"
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

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors ${!isSidebarOpen && "justify-center"}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Выйти</span>}
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
