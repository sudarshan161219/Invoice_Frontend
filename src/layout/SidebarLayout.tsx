import "./index.css";
// React
import { useState, useEffect, type FC, type ReactElement } from "react";

// Routing
import { Link, Outlet, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
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

import { MainHeading } from "@/components/mainHeading/MainHeading";
// Icons
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  // Plus,
} from "lucide-react";
import darkLogo from "../assets/dark.svg";
import lightLogo from "../assets/light.svg";

import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

// Accessibility
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const SidebarLayout: FC = (): ReactElement => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

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
        <div className="hidden md:inline  m-4 ">
          <img
            className="ml-3"
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Billoop logo"
            width={80}
            height={80}
          />
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
    <div className="flex h-screen relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 bg-background text-foreground border-r p-4">
        <SidebarContent className="w-full" />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        {/* <div className="relative"> */}
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-4 left-4  z-50 md:hidden"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <img
          src={darkLogo}
          alt="Billoop logo"
          width={60}
          height={60}
          className="top-6 left-14 absolute  z-50 md:hidden"
        />

        {/* </div> */}
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
        <header className="h-16 border-b px-6 flex items-center justify-end md:justify-between">
          <MainHeading />
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="text-sm  bg-background text-foreground border-r">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {user?.email}
                </div>
              </TooltipContent>
            </Tooltip>
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
