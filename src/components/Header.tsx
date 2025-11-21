import { Link, useRouterState } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";
import {
  LogOut,
  User,
  Menu,
  Settings,
  Code,
  List,
  Music,
  ListMusic,
  Upload,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserAvatar } from "~/hooks/useUserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import * as React from "react";
import { usePlaylist } from "./playlist-provider";

const navigationLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Browse",
    href: "/browse",
  },
];

interface HeaderProps {
  onOpenPlaylist?: () => void;
}

export function Header({ onOpenPlaylist }: HeaderProps = {}) {
  const { data: session, isPending } = authClient.useSession();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { avatarUrl } = useUserAvatar();
  const { playlist, showPlayer } = usePlaylist();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-2xl mx-auto px-8 flex h-14 items-center">
        <div className="mr-4 flex gap-16">
          <Link to="/" className="mr-6 flex items-center space-x-2 group">
            <div className="relative">
              <Code className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Full Stack Campus
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2 text-sm">
            {navigationLinks.map((link) => {
              const isActive = currentPath === link.href || (link.href === "/" && currentPath === "/");
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? "text-foreground" 
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{link.title}</span>
                  <span className={`absolute inset-0 rounded-lg bg-primary/5 transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}></span>
                  <span className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 blur-sm transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}></span>
                </Link>
              );
            })}
            {session && (
              <Link
                to="/upload"
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                  currentPath === "/upload"
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Upload className={`h-4 w-4 relative z-10 transition-transform ${
                  currentPath === "/upload" ? "scale-110" : "group-hover:scale-110"
                }`} />
                <span className="relative z-10">Upload</span>
                <span className={`absolute inset-0 rounded-lg bg-primary/5 transition-opacity duration-200 ${
                  currentPath === "/upload" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}></span>
                <span className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-purple-600/10 blur-sm transition-opacity duration-200 ${
                  currentPath === "/upload" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}></span>
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Code className="h-6 w-6 text-primary" />
                <span className="font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Full Stack Campus</span>
              </Link>
              <nav className="flex flex-col gap-2 mt-6">
                {navigationLinks.map((link) => {
                  const isActive = currentPath === link.href || (link.href === "/" && currentPath === "/");
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`relative block px-4 py-2.5 rounded-lg text-lg transition-all duration-200 group ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">{link.title}</span>
                      <span className={`absolute inset-0 rounded-lg bg-primary/5 transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}></span>
                    </Link>
                  );
                })}
                {session && (
                  <>
                    <Link
                      to="/upload"
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-lg transition-all duration-200 group ${
                        currentPath === "/upload"
                          ? "text-foreground"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Upload className={`h-5 w-5 relative z-10 transition-transform ${
                        currentPath === "/upload" ? "scale-110" : "group-hover:scale-110"
                      }`} />
                      <span className="relative z-10">Upload</span>
                      <span className={`absolute inset-0 rounded-lg bg-primary/5 transition-opacity duration-200 ${
                        currentPath === "/upload" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}></span>
                    </Link>
                    <Link
                      to="/my-songs"
                      className={`relative block px-4 py-2.5 rounded-lg text-lg transition-all duration-200 group ${
                        currentPath === "/my-songs"
                          ? "text-foreground"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">My Songs</span>
                      <span className={`absolute inset-0 rounded-lg bg-primary/5 transition-opacity duration-200 ${
                        currentPath === "/my-songs" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}></span>
                    </Link>
                    <Link
                      to="/playlists"
                      className={`relative block px-4 py-2.5 rounded-lg text-lg transition-all duration-200 group ${
                        currentPath === "/playlists"
                          ? "text-foreground"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">My Playlists</span>
                      <span className={`absolute inset-0 rounded-lg bg-primary/5 transition-opacity duration-200 ${
                        currentPath === "/playlists" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}></span>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center gap-4">
            {/* Playlist button - show at all times */}
            {onOpenPlaylist && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  showPlayer(); // Show the music player if hidden
                  onOpenPlaylist(); // Open the playlist sheet
                }}
                className="relative"
              >
                <List className="h-4 w-4" />
                {playlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {playlist.length}
                  </span>
                )}
                <span className="sr-only">Open playlist</span>
              </Button>
            )}

            {isPending ? (
              <div className="flex h-9 w-9 items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : session ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl || undefined} />
                        <AvatarFallback className="bg-primary/10">
                          {session?.user?.name?.charAt(0)?.toUpperCase() || (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Account
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/my-songs">
                        <Music className="mr-2 h-4 w-4" />
                        <span>My Songs</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/playlists">
                        <ListMusic className="mr-2 h-4 w-4" />
                        <span>My Playlists</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => authClient.signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  className={buttonVariants({ variant: "outline" })}
                  to="/sign-in"
                  search={{ redirect: undefined }}
                >
                  Sign In
                </Link>
                <Link
                  className={buttonVariants({ variant: "default" })}
                  to="/sign-up"
                  search={{ redirect: undefined }}
                >
                  Sign Up
                </Link>
              </>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
