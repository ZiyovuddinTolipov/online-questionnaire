"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import { BarChart3, FileText, Home, List, LogOut, Moon, MoreHorizontal, PanelLeft, Plus, Sun, Users, X } from "lucide-react"

// Import your UI components here
// For this example, I'll assume you have similar components as shadcn/ui
// You may need to adjust these imports based on your actual component library
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/context/AuthContext"

// Simple theme provider for React
const ThemeContext = React.createContext({
    theme: "light",
    setTheme: () => { },
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem("theme") || "light"
        setTheme(savedTheme)

        // Apply theme to document
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const updateTheme = (newTheme) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
    return React.useContext(ThemeContext)
}

export default function EmployerDashboard() {
    const { logout, user } = useAuth()
    const location = useLocation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // After mounting, we can safely show the theme UI
    useEffect(() => {
        setMounted(true)
    }, [])

    const getPageTitle = () => {
        if (location.pathname.includes("employer")) return "Ish Beruvchi Paneli"
        return "Dashboard"
    }

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    const adminNavItems = [
        { path: "/admin", label: "Vakansiyalar", icon: Home },
        { path: "/admin/users", label: "Foydalanuvchilar", icon: Users },
        { path: "/admin/jobs", label: "Barcha ishlar", icon: List },
    ]

    const employerNavItems = [
        { path: "/employer", label: "Vakansiyalar", icon: List },
        { path: "/employer/jobs/new", label: "Vakansiya qo'shish", icon: Plus },
        { path: "/employer/applicants", label: "Nomzodlar", icon: FileText },
    ]

    const navItems = user?.role === "admin" ? adminNavItems : employerNavItems

    const NavLinks = () => (
        <div className="space-y-1">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                    <Link key={item.path} to={item.path}>
                        <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={`w-full justify-start ${isActive ? "bg-primary/10 text-primary" : ""}`}
                            onClick={() => setIsMobileNavOpen(false)}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Button>
                    </Link>
                )
            })}
        </div>
    )

    const MobileNavItem = ({ item, isActive }) => (
        <Link
            to={item.path}
            className="flex flex-1 flex-col items-center justify-center py-2"
            onClick={() => setIsMobileNavOpen(false)}
        >
            <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
            >
                <item.icon className="h-5 w-5" />
            </div>
            <span className="mt-1 text-xs font-medium">{item.label}</span>
        </Link>
    )

    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar for desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-20 hidden h-full w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out md:flex ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-14 items-center justify-between border-b px-4">
                    <h2 className="text-lg font-semibold">{getPageTitle()}</h2>
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                    )}
                </div>
                <div className="flex-1 overflow-auto p-4">
                    <NavLinks />
                </div>
                <div className="border-t p-4">
                    <Button variant="destructive" className="w-full justify-start" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Chiqish
                    </Button>
                </div>
            </aside>

            {/* Mobile bottom navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background md:hidden">
                <div className="flex h-16 items-center justify-around px-2">
                    {navItems.slice(0, 3).map((item) => {
                        const isActive = location.pathname === item.path
                        return <MobileNavItem key={item.path} item={item} isActive={isActive} />
                    })}

                    {/* More menu for additional items */}
                    <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                        <SheetTrigger asChild>
                            <button className="flex flex-1 flex-col items-center justify-center py-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground">
                                    <MoreHorizontal className="h-5 w-5" />
                                </div>
                                <span className="mt-1 text-xs font-medium">Boshqa</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[70vh] rounded-t-[20px] pt-6">
                            <div className="absolute left-0 right-0 top-0 flex h-7 items-center justify-center">
                                <div className="h-1 w-16 rounded-full bg-muted-foreground/20"></div>
                            </div>
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Menu</h3>
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileNavOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <NavLinks />
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user?.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {user?.role === "admin" ? "Administrator" : "Ish beruvchi"}
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="icon" onClick={logout} className="text-destructive">
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </div>

                                {mounted && (
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <span className="font-medium">{theme === "dark" ? "Tungi rejim" : "Kunduzgi rejim"}</span>
                                        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Main content */}
            <div className={`flex flex-1 flex-col ${isSidebarOpen ? "md:ml-64" : ""}`}>
                <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="md:hidden"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                        )}

                        <TooltipProvider>
                            <DropdownMenu>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage  alt={user?.name || "User"} />
                                                    <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Profil</p>
                                    </TooltipContent>
                                </Tooltip>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user?.role === "admin" ? "Administrator" : "Ish beruvchi"}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profil sozlamalari</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Chiqish
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipProvider>
                    </div>
                </header>

                <main className="flex-1 overflow-auto pb-20 md:pb-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

