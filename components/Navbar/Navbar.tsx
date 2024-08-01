import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { MenuIcon } from "@/Icons/Icons";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold" prefetch={false}>
          Petr Vurm
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link href="/o-me" className="transition-colors duration-200 hover:text-primary" prefetch={false}>
            O mě
          </Link>
          <Link href="/projekty" className="transition-colors duration-200 hover:text-primary" prefetch={false}>
            Projekty
          </Link>
          <Link href="/kontakt" className="transition-colors duration-200 hover:text-primary" prefetch={false}>
            Kontakt
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="3"
          className="md:hidden"
          aria-label="Toggle navigation"
        >
            <MenuIcon className="h-6 w-6" color="white" />
        </Button>
      </div>
    </header>
  );
}
