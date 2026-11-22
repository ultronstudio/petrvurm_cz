"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { MenuIcon } from "@/Icons/Icons";
import type { NavLink } from "./Navbar";

export default function MobileMenu({ links }: { links: NavLink[] }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="3" className="md:hidden hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary" aria-label="Otevřít hlavní menu">
          <MenuIcon className="h-6 w-6" color="white" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/70" />
        <Dialog.Content aria-describedby={undefined} className="fixed right-0 top-0 z-[70] h-full w-[86%] max-w-[380px] overflow-y-auto border-l border-white/10 bg-[#0b0c0e] p-6 text-white">
          <Dialog.Title className="sr-only">Hlavní menu</Dialog.Title>
          <Dialog.Close className="rounded-md px-2 py-1 text-sm text-white/70 hover:text-white" aria-label="Zavřít menu">Zavřít</Dialog.Close>
          <nav aria-label="Mobilní menu">
            <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {links.map((link) => (
                <li key={link.href}>
                  <Dialog.Close asChild>
                    <Link href={link.href} prefetch={false} className="block py-4 text-lg font-medium text-white/90">{link.name}</Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
            <Dialog.Close asChild>
              <Link href="/kontakt" prefetch={false} className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-black">Kontakt</Link>
            </Dialog.Close>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
