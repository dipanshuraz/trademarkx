import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">TrademarkX</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/trademark-search" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Search</Link>
          <Link to="/apply" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Apply</Link>
          <Link to="/dashboard" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Dashboard</Link>
          <Link to="/admin" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/trademark-search">Search</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/apply">Start Registration</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </span>
            TrademarkX
          </div>
          <p className="mt-3 text-sm text-muted-foreground">India's modern platform for trademark registration. Government compliant filing with end-to-end expert support.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Trademark Search</li>
            <li>Trademark Filing</li>
            <li>Objection Response</li>
            <li>Renewal & Assignment</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Class Guide</li>
            <li>Government Fees</li>
            <li>Knowledge Hub</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © 2026 TrademarkX Legal Tech Pvt. Ltd. — Filing services are facilitation only; final approval rests with the Trade Marks Registry, Government of India.
      </div>
    </footer>
  );
}
