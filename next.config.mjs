// next.config.js
import withMDX from '@next/mdx';

const nextConfig = {
  // Povolí použití mdx souborů
  pageExtensions: ["js", "jsx", "ts", "tsx", "md"],

  // Další nastavení, která můžete potřebovat
  reactStrictMode: true,
  swcMinify: true, // Doporučeno pro zrychlení kompilace

  // Pokud používáte obrázky, povolte tento plugin
  images: {
    domains: ["petrvurm.cz"], // Nahraďte doménami, ze kterých chcete načítat obrázky
  },
};

const mdxConfig = withMDX({
  extension: /\.md?$/,
});

export default mdxConfig(nextConfig);