import Link from "next/link";
import {
  GitHubIcon,
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/Icons/Icons";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 flex items-center justify-between">
        <p className="text-sm text-white">
          &copy;&nbsp;{new Date().getFullYear()}&nbsp;Petr Vurm <strong>&middot;</strong> Vytvořeno s ❤️ k web developmentu
        </p>
        <div className="flex space-x-4">
          <Link href="https://github.com/ultronstudio" target="_blank" className="cursor-pointer" prefetch={false}>
            <GitHubIcon className="h-6 w-6 fill-white hover:fill-black" />
          </Link>
          <Link href="https://www.linkedin.com/in/petrvurm/" target="_blank" className="cursor-pointer" prefetch={false}>
            <LinkedInIcon className="h-6 w-6 fill-white hover:fill-[#0a66c2]" />
          </Link>
          <Link href="https://www.facebook.com/vurmpetr" target="_blank" className="cursor-pointer" prefetch={false}>
            <FacebookIcon className="h-6 w-6 fill-white hover:fill-[#0866FF]" />
          </Link>
          <Link href="https://www.instagram.com/ultronek/" target="_blank" className="cursor-pointer" prefetch={false}>
            <InstagramIcon className="h-6 w-6 fill-white hover:fill-instagram-gradient" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
