import Image from "next/image";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#products", label: "Products" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center ml-6">
          <Image src="/logo.png" alt="Logo" width={180} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-heading font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-heading font-medium hover:bg-secondary/90 transition-colors"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden" aria-label="Open Menu">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-heading text-lg font-medium transition-colors hover:text-primary px-2 py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-heading text-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
