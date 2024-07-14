import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FOCUS",
  description: "FOCUS",
  // icons: {
  //   icon: "/icons/logo.svg",
  // },
};



export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
        },
        
        variables: {
          colorText: "#fff",
          colorPrimary: "#830EF9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}
    >
      <html lang="en">
          <body className={`${inter.className} bg-dark-1` }>
            <Toaster />
            {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
