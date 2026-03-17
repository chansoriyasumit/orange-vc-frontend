'use client';

import Link from 'next/link';
import { useAuth } from '@/src/features/auth/lib/AuthContext';
import { AppButton } from '@/src/shared/components/ui/AppButton';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, User, LogOut, LayoutDashboard, ChevronDown, Linkedin, Instagram, Facebook, Youtube, Globe, Phone, Users, Headset } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function Header() {
  const { isAuthenticated, signOut, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Detect if we're on homepage
  const isHomepage = pathname === '/';

  // Get user's initials for avatar
  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.email?.[0]?.toUpperCase() || 'U';

  // Get user's display name
  const displayName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : user?.firstName || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-border/40'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/logo/orangevclogo.png" 
              alt="OrangeVC Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span
              className={`font-heading font-bold text-xl transition-colors ${
                scrolled || !isHomepage ? 'text-rich-black' : 'text-rich-black'
              }`}
            >
              Orange<span className="text-tomato">VC</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled || !isHomepage
                  ? 'text-rich-black/70 hover:text-rich-black'
                  : 'text-rich-black/70 hover:text-rich-black'
              }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Phone Number - Desktop Only */}
            <a 
              href="tel:+19096342861"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ml-2 pl-4 border-l border-rich-black/20 ${
                scrolled || !isHomepage
                  ? 'text-rich-black/70 hover:text-tomato'
                  : 'text-rich-black/70 hover:text-tomato'
              }`}
              aria-label="Call us"
            >
              <Headset className="w-4 h-4" />
              <span className="hidden lg:inline">+1 (909) 634-2861</span>
            </a>
            
            {/* Social Links - Desktop Only */}
            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-rich-black/20">
              {/* <a 
                href="https://www.orangevirtualconnect.com/" 
                target="_blank" 
                rel="noreferrer"
                className={`transition-colors ${
                  scrolled || !isHomepage
                    ? 'text-rich-black/60 hover:text-tomato'
                    : 'text-rich-black/60 hover:text-tomato'
                }`}
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a> */}
              <a 
                href="https://www.linkedin.com/company/orange-virtual-global-solutions-pvt-ltd" 
                target="_blank" 
                rel="noreferrer"
                className={`transition-colors ${
                  scrolled || !isHomepage
                    ? 'text-rich-black/60 hover:text-tomato'
                    : 'text-rich-black/60 hover:text-tomato'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/orangevirtualconnect/" 
                target="_blank" 
                rel="noreferrer"
                className={`transition-colors ${
                  scrolled || !isHomepage
                    ? 'text-rich-black/60 hover:text-tomato'
                    : 'text-rich-black/60 hover:text-tomato'
                }`}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/orangevirtualconnect" 
                target="_blank" 
                rel="noreferrer"
                className={`transition-colors ${
                  scrolled || !isHomepage
                    ? 'text-rich-black/60 hover:text-tomato'
                    : 'text-rich-black/60 hover:text-tomato'
                }`}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@OrangeVirtualConnect" 
                target="_blank" 
                rel="noreferrer"
                className={`transition-colors ${
                  scrolled || !isHomepage
                    ? 'text-rich-black/60 hover:text-tomato'
                    : 'text-rich-black/60 hover:text-tomato'
                }`}
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 h-9 px-3"
                      >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tomato to-tomato-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{initials}</span>
                        </div>
                        <span className="text-sm font-medium text-rich-black/70">
                          {displayName}
                        </span>
                        <ChevronDown className="w-4 h-4 text-rich-black/50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium text-rich-black">{displayName}</p>
                        <p className="text-xs text-rich-black/60 truncate">{user?.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <AppButton variant="ghost" size="sm" href="/auth/signin">
                      Log In
                    </AppButton>
                    <AppButton variant="primary" size="sm" href="/pricing">
                      Subscribe Now
                    </AppButton>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <AppButton variant="ghost" size="sm">
              <Menu className="w-6 h-6" />
            </AppButton>
          </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-rich-black/70 hover:text-rich-black transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="border-t border-platinum pt-6 mt-4">
                  {!isLoading && (
                    <>
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <div className="px-2 py-2 border-b border-platinum mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tomato to-tomato-600 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">{initials}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-rich-black">{displayName}</p>
                                <p className="text-xs text-rich-black/60 truncate">{user?.email}</p>
                              </div>
                            </div>
                          </div>
                          <AppButton 
                            variant="outline" 
                            fullWidth 
                            href="/dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </AppButton>
                          <div className='h-4'></div>
                          <AppButton
                            onClick={() => {
                              handleSignOut();
                              setMobileMenuOpen(false);
                            }}
                            variant="outline"
                            fullWidth
                            className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </AppButton>
                        </div>
                      ) : (
                        <>
                          <AppButton 
                            variant="outline" 
                            fullWidth
                            href="/auth/signin"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Log In
                          </AppButton>
                          <div className='h-4'></div>
                          <AppButton 
                            variant="primary" 
                            fullWidth
                            href="/pricing"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Subscribe Now
                          </AppButton>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Social Links - Mobile */}
                <div className="border-t border-platinum pt-6 mt-4">
                  <p className="text-sm font-medium text-rich-black/60 mb-4">Follow Us</p>
                  <div className="flex items-center gap-4">
                    <a 
                      href="https://www.orangevirtualconnect.com/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-rich-black/60 hover:text-tomato transition-colors"
                      aria-label="Website"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/orange-virtual-global-solutions-pvt-ltd" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-rich-black/60 hover:text-tomato transition-colors"
                      aria-label="LinkedIn"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.instagram.com/orangevirtualconnect/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-rich-black/60 hover:text-tomato transition-colors"
                      aria-label="Instagram"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.facebook.com/orangevirtualconnect" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-rich-black/60 hover:text-tomato transition-colors"
                      aria-label="Facebook"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.youtube.com/@OrangeVirtualConnect" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-rich-black/60 hover:text-tomato transition-colors"
                      aria-label="YouTube"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
