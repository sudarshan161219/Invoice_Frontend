import "./index.css";
// React
import { useState, useEffect, type FC, type ReactElement } from "react";

// Routing
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// UI Components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// Icons
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  Plus,
} from "lucide-react";
import darkLogo from "../assets/dark.svg";

import { useAuth } from "@/hooks/useAuth";

// Accessibility
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const SidebarLayout: FC = (): ReactElement => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  // Automatically close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Handle logout action
  const handleLogout = () => {
    console.log("Logging out...");
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/clients", label: "Clients", icon: <Users size={18} /> },
    { path: "/invoices", label: "Invoices", icon: <FileText size={18} /> },
    { path: "/settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const SidebarContent = ({ className }: { className?: string }) => (
    <div className={`flex flex-col h-full justify-center ${className}`}>
      {/* Header */}
      <div>
        <div className=" mb-6 px-2 pt-2">
          <img src={darkLogo} alt="Billoop logo" width={95} height={95} />
        </div>

        {/* Navigation Links */}
        <ScrollArea className="h-[calc(100vh-120px)]  pr-2">
          <nav className="flex flex-col gap-1 w-full">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "secondary" : "ghost"}
                  className="justify-start gap-2 w-full"
                  asChild
                >
                  <Link to={item.path}>
                    {item.icon}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </ScrollArea>
      </div>

      {/* Logout Button */}
      <div className="logout-container">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 cursor-pointer "
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 bg-background text-foreground border-r p-4">
        <SidebarContent className="w-full" />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-4 left-4 z-50 md:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader>
            <SheetTitle>
              <SheetDescription>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetDescription>
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 ">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main layout (Topbar + Outlet) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b px-4 flex items-center justify-end md:justify-between">
          <span className="heading-span hidden">Overview</span>
          <div className="flex items-center gap-3">
            <Button variant="link" className="cursor-pointer">
              <Plus /> New Invoice
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
