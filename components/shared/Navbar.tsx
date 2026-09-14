"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Settings,
  User,
  UserPlus,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/(auth)/_action/authActions";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Technicians",
    href: "/technicians",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const userMenuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profileImage: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
};

type NavbarProps = {
  user?: IUser | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();

  // actual logged-in user data
  const currentUser = user?.data;

  const initials =
    currentUser?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            F
          </div>

          <span className="hidden text-xl font-bold sm:block">
            FixItNow
          </span>
        </Link>

        {/* CENTER MENU */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" &&
                    pathname.startsWith(item.href));

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-auto items-center gap-2 px-2"
                >
                  <Avatar className="size-9">

                    <AvatarImage
                      src={currentUser.profileImage || ""}
                      alt={currentUser.name}
                    />

                    <AvatarFallback>
                      {initials}
                    </AvatarFallback>

                  </Avatar>

                  <div className="hidden text-left lg:block">
                    <p className="max-w-32 truncate text-sm font-medium">
                      {currentUser.name}
                    </p>

                    <p className="max-w-32 truncate text-xs text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">

                    <span>
                      {currentUser.name}
                    </span>

                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {currentUser.email}
                    </span>

                    <span className="text-xs font-normal text-muted-foreground">
                      {currentUser.role}
                    </span>

                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.href}
                      asChild
                    >
                      <Link
                        href={item.href}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Icon className="size-4" />

                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <form action={logoutAction}>
                  <DropdownMenuItem
                    asChild
                    className="text-destructive focus:text-destructive"
                  >
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center gap-2"
                    >
                      <LogOut className="size-4" />

                      Logout
                    </button>
                  </DropdownMenuItem>
                </form>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">

              <Button
                variant="ghost"
                asChild
              >
                <Link href="/login">
                  <LogIn className="size-4" />

                  Login
                </Link>
              </Button>

              <Button asChild>
                <Link href="/register">
                  <UserPlus className="size-4" />

                  Register
                </Link>
              </Button>

            </div>
          )}

          {/* MOBILE */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="size-5" />

                <span className="sr-only">
                  Open menu
                </span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  FixItNow
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-2">
                {menuItems.map((item) => (
                  <SheetClose
                    key={item.href}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className="rounded-md px-4 py-3 text-sm font-medium hover:bg-accent"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-6 border-t pt-6">

                {currentUser ? (
                  <>
                    <div className="mb-5 flex items-center gap-3">
                      <Avatar>

                        <AvatarImage
                          src={currentUser.profileImage || ""}
                          alt={currentUser.name}
                        />

                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>

                      </Avatar>

                      <div>
                        <p className="text-sm font-medium">
                          {currentUser.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {currentUser.email}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {currentUser.role}
                        </p>
                      </div>
                    </div>

                    {userMenuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <SheetClose
                          key={item.href}
                          asChild
                        >
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 rounded-md px-4 py-3 text-sm hover:bg-accent"
                          >
                            <Icon className="size-4" />

                            {item.label}
                          </Link>
                        </SheetClose>
                      );
                    })}

                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm text-destructive hover:bg-accent"
                      >
                        <LogOut className="size-4" />

                        Logout
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">

                    <Button
                      variant="outline"
                      asChild
                    >
                      <Link href="/login">
                        Login
                      </Link>
                    </Button>

                    <Button asChild>
                      <Link href="/register">
                        Register
                      </Link>
                    </Button>

                  </div>
                )}

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
};

export default Navbar;