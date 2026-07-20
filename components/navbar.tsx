"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; 
import { ModeToggle } from "@/components/ui/modeToggle"; 
import { Button } from "./ui/button";
import { AddPropertyDialog } from "./AddPropertyDialog";

const NAV_LINKS = [
    { title: "Home", path: "/" },
    { title: "Dashboard", path: "/admin/dashboard" },
] as const;


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                
                {/* Logo Section */}
                <div className="shrink-0">
                    <Link href="/" className="flex items-center">
                        Real-State 
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className="text-sm font-medium text-primary hover:text-foreground transition-colors duration-200"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                    <AddPropertyDialog />
                    <ModeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-2">
                    <ModeToggle /> 
                    <AddPropertyDialog />
                    <Button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
                </div>
            </div>

            {/* Mobile Menu Panel */}
            <div
                id="mobile-menu"
                className={`md:hidden border-b border-border bg-background transition-all duration-200 ${
                isOpen ? "block opacity-100" : "hidden opacity-0"
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={closeMenu}
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}