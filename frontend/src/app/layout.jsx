import StoreProvider from "./(user_website)/components/StoreProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <StoreProvider>
        {children}
        </StoreProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
