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

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between w-full">
      {/* Header */}
      <div>
        <div className="text-xl font-semibold mb-6 px-2 pt-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user?.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className=" text-sm">{user?.name}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <ScrollArea className="h-[calc(100vh-120px)] pr-2">
          <nav className="flex flex-col gap-1">
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
      {/* <div className="logout-container"> */}
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 cursor-pointer "
        onClick={handleLogout}
      >
        <LogOut size={18} />
        Logout
      </Button>
      {/* </div> */}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-background text-foreground border-r p-4">
        <SidebarContent />
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
          <div className="h-full p-4">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main layout (Topbar + Outlet) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b px-4 flex items-center justify-end">
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
