import { Link } from "@tanstack/react-router";
import { Menu, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { featureFlags } from "@/lib/feature-flags";
import { useFloatingNavbar } from "@/hooks/use-floating-navbar";
import { cn } from "@/lib/utils";

const NAV_LINKS: (
  | { to: string; label: string; params?: { applicationId: string } }
  | { href: string; label: string }
)[] = [
  { href: "/#services", label: "IPR Services" },
  ...(featureFlags.trademarkSearch
    ? [{ to: "/trademark-search" as const, label: "Search" }]
    : []),
  { to: "/apply" as const, label: "Apply" },
  { to: "/services/patents" as const, label: "Patents" },
  { to: "/services/copyrights" as const, label: "Copyrights" },
  { to: "/services/designs" as const, label: "Design" },
  { to: "/global-trademark" as const, label: "Global Filing" },
  { to: "/dashboard" as const, label: "Dashboard" },
  { to: "/track/$applicationId" as const, label: "Track", params: { applicationId: "TM-2026-100001" } },
  { to: "/admin" as const, label: "Admin" },
];

const linkClass =
  "text-xs font-medium text-white/75 transition-colors hover:text-white data-[status=active]:text-gold-light";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scrollVisible = useFloatingNavbar();
  const showNav = scrollVisible || open || hovered;

  return (
    <>
      {/* Top hover zone — reveals navbar when hidden */}
      <div
        className="fixed inset-x-0 top-0 z-50 h-5"
        onMouseEnter={() => setHovered(true)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-2 transition-[transform,opacity] duration-300 ease-out sm:px-4 sm:pt-3",
          showNav ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[calc(100%+0.75rem)] opacity-0",
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <header className="w-full max-w-5xl rounded-full border border-white/10 bg-navy/95 text-white shadow-[0_8px_32px_rgba(17,34,64,0.32)] backdrop-blur-xl supports-[backdrop-filter]:bg-navy/90">
          <div className="flex h-11 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4">
            <Link to="/" className="group flex shrink-0 items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gold text-white transition-transform duration-300 group-hover:scale-105">
                <Shield className="h-3.5 w-3.5" />
              </span>
              <span className="font-serif text-sm font-semibold tracking-tight text-white sm:text-base">TrademarkX</span>
            </Link>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-2 overflow-x-auto px-1 lg:flex xl:gap-3"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((item) =>
                "href" in item ? (
                  <a key={item.href} href={item.href} className={`${linkClass} shrink-0 whitespace-nowrap`}>
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    params={"params" in item ? item.params : undefined}
                    className={`${linkClass} shrink-0 whitespace-nowrap`}
                    activeProps={{ className: "text-gold-light" }}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5">
              <Button asChild size="sm" className="hidden h-8 px-3 text-xs sm:inline-flex">
                <Link to="/apply">Register</Link>
              </Button>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white lg:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[min(100vw-2rem,22rem)] border-white/10 bg-navy p-0 text-white">
                  <SheetHeader className="border-b border-white/10 px-6 py-5 text-left">
                    <SheetTitle className="font-serif text-xl text-white">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                    {NAV_LINKS.map((item) =>
                      "href" in item ? (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.to}
                          to={item.to}
                          params={"params" in item ? item.params : undefined}
                          onClick={() => setOpen(false)}
                          className="rounded-xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                          activeProps={{ className: "bg-white/10 text-gold-light" }}
                        >
                          {item.label}
                        </Link>
                      ),
                    )}
                    <Button asChild className="mt-4 w-full" size="lg">
                      <Link to="/apply" onClick={() => setOpen(false)}>
                        Start Registration
                      </Link>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </div>

      <div className="h-14 shrink-0 sm:h-16" aria-hidden="true" />
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 bg-navy text-white">
      <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-white">
              <Shield className="h-5 w-5" />
            </span>
            <span className="font-serif text-xl font-semibold text-white">TrademarkX</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Premium trademark and intellectual property services for modern businesses. Expert-led filing with
            transparent pricing and end-to-end support.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/apply" className="transition-colors hover:text-gold-light">Trademark Registration</Link></li>
            {featureFlags.trademarkSearch && (
              <li><Link to="/trademark-search" className="transition-colors hover:text-gold-light">Trademark Search</Link></li>
            )}
            <li><Link to="/services/copyrights" className="transition-colors hover:text-gold-light">Copyright Registration</Link></li>
            <li><Link to="/services/patents" className="transition-colors hover:text-gold-light">Patent Filing</Link></li>
            <li><Link to="/global-trademark" className="transition-colors hover:text-gold-light">Global Trademark Protection</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><a href="/#services" className="transition-colors hover:text-gold-light">IPR Services</a></li>
            <li><a href="/#contact" className="transition-colors hover:text-gold-light">Contact</a></li>
            <li><a href="/#faq" className="transition-colors hover:text-gold-light">FAQs</a></li>
            <li><a href="#pricing" className="transition-colors hover:text-gold-light">Pricing</a></li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>hello@trademarkx.in</li>
            <li>+91 80 4712 3400</li>
            <li>Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © 2026 TrademarkX Legal Tech Pvt. Ltd. — Filing services are facilitation only; final approval rests with
        the Trade Marks Registry, Government of India.
      </div>
    </footer>
  );
}
