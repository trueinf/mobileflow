import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { NavbarMenu } from "./layout/NavbarMenu";

interface HeaderProps {
  selectedPersona: string | null;
  onPersonaChange: (persona: string) => void;
}

export function Header({ selectedPersona, onPersonaChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <svg
              width="120"
              height="32"
              viewBox="0 0 120 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16z"
                fill="#00A9CE"
              />
              <path
                d="M16 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z"
                fill="white"
              />
              <text
                x="38"
                y="22"
                fill="#00A9CE"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="20"
                fontWeight="600"
              >
                Optus
              </text>
            </svg>
          </a>

          {/* Primary Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#shop"
              className="text-foreground hover:text-[#00A9CE] transition-colors"
            >
              Shop
            </a>
            {selectedPersona ? (
              <NavbarMenu selectedPersona={selectedPersona} />
            ) : (
              <>
                <a
                  href="#plans"
                  className="text-foreground hover:text-[#00A9CE] transition-colors"
                >
                  Plans
                </a>
                <a
                  href="#deals"
                  className="text-foreground hover:text-[#00A9CE] transition-colors"
                >
                  Deals
                </a>
                <a
                  href="#support"
                  className="text-foreground hover:text-[#00A9CE] transition-colors"
                >
                  Support
                </a>
              </>
            )}
          </nav>

          {/* Persona Switcher (appears after selection) */}
          {selectedPersona && (
            <div className="hidden lg:block">
              <PersonaSwitcher
                selectedPersona={selectedPersona}
                onPersonaChange={onPersonaChange}
              />
            </div>
          )}

          {/* Search & Account */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 w-[200px] bg-input-background border-0"
              />
            </div>

            {/* Sign In / My Account */}
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Sign in</span>
            </Button>
          </div>
        </div>

        {/* Mobile Persona Switcher */}
        {selectedPersona && (
          <div className="lg:hidden pb-4">
            <PersonaSwitcher
              selectedPersona={selectedPersona}
              onPersonaChange={onPersonaChange}
            />
          </div>
        )}
      </div>
    </header>
  );
}
