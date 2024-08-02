import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import "./mobilemenu.css";
import { NavLink } from "./Navbar";

export default function MobileMenu({
  mobileMenuOpened,
  setMobileMenuOpened,
  links,
}: {
  mobileMenuOpened: boolean;
  setMobileMenuOpened: (value: boolean) => any;
  links: NavLink[];
}) {
  return (
    <Box
      position="fixed"
      className={
        "md:w-full right-0 mobile-menu " + (mobileMenuOpened ? "active" : "")
      }
      style={{ backgroundColor: "#111113" }}
    >
      <Flex height="100%" direction="column" justify="center" gap="15px">
        {links.map((e, i) => (
          <Link
            key={i}
            onClick={() => setMobileMenuOpened(false)}
            href={e.href}
          >
            {e.name}
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
