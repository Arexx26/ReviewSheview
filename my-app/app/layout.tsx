import { Providers } from "./providers";
import AppLayout from '@/components/AppLayout'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlickMate",
  description: "Your personal movie and TV series companion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  )
}
