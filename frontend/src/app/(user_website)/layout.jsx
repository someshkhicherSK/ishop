import { Geist } from "next/font/google";
import "../globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StoreProvider from "./components/StoreProvider";
import { ToastContainer } from "react-toastify";

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
      <body
        suppressHydrationWarning
        className={`${geistSans.variable}   antialiased`}
      >
        <StoreProvider>
          <Header />
          <ToastContainer/>
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
