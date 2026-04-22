import { Geist } from "next/font/google";
import "../globals.css";

import { ToastContainer } from 'react-toastify';
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "i_shop_project",
  description: "Create by  Vikash Kumar...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable}   antialiased md:overflow-hidden`}>
        <ToastContainer />
        <LayoutWrapper children={children}/>
      </body>
    </html>
  );
}
