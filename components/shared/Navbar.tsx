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


/* ==============================
   NAVIGATION ITEMS
================================ */

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


/* ==============================
   USER MENU ITEMS
================================ */

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


/* ==============================
   USER TYPE
================================ */

type NavbarUser = {
  name: string;
  email: string;
  profilePhoto?: string | null;
};

type NavbarProps = {
  user?: NavbarUser | null;
};


/* ==============================
   COMPONENT
================================ */

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* ======================
            LEFT - LOGO
        ======================= */}

        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            {/* Logo Placeholder */}
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              F
            </div>

            <span className="hidden text-xl font-bold sm:block">
              FixItNow
            </span>
          </Link>
        </div>


        {/* ======================
            CENTER - DESKTOP MENU
        ======================= */}

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


        {/* ======================
            RIGHT SIDE
        ======================= */}

        <div className="flex items-center gap-2">

          {/* USER PROFILE */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-auto items-center gap-2 px-2"
                >
                  <Avatar className="size-9">
                    <AvatarImage
                      src={user.profilePhoto || ""}
                      alt={user.name}
                    />

                    <AvatarFallback>
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="hidden text-left lg:block">
                    <p className="max-w-32 truncate text-sm font-medium">
                      {user.name}
                    </p>

                    <p className="max-w-32 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>


              <DropdownMenuContent
                align="end"
                className="w-56"
              >
                {/* USER INFO */}
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>

                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />


                {/* USER MENU ARRAY */}
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


                {/* LOGOUT */}
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

            /* LOGIN / REGISTER */
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


          {/* ======================
              MOBILE MENU
          ======================= */}

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
                <SheetTitle className="text-left">
                  FixItNow
                </SheetTitle>
              </SheetHeader>


              {/* MOBILE NAVIGATION */}

              <nav className="mt-8 flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" &&
                      pathname.startsWith(item.href));

                  return (
                    <SheetClose
                      key={item.href}
                      asChild
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-accent",
                          isActive &&
                            "bg-accent text-accent-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>


              {/* MOBILE USER OPTIONS */}

              <div className="mt-6 border-t pt-6">
                {user ? (
                  <>
                    <div className="mb-5 flex items-center gap-3 px-2">
                      <Avatar>
                        <AvatarImage
                          src={user.profilePhoto || ""}
                          alt={user.name}
                        />

                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>


                    <div className="flex flex-col gap-1">
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
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Button
                        variant="outline"
                        asChild
                      >
                        <Link href="/login">
                          Login
                        </Link>
                      </Button>
                    </SheetClose>

                    <SheetClose asChild>
                      <Button asChild>
                        <Link href="/register">
                          Register
                        </Link>
                      </Button>
                    </SheetClose>
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