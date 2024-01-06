import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });
import "@styles/global.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}