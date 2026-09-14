import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/service/getMe";


const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getMe()

  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", inter.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* <Navbar/> */}
        <Toaster position="top-right" richColors />
        {/* Navbar */}
        {children}

        {/* Footer */}
      </body>
    </html>
  );
}