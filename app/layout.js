import "./globals.css";

import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata = {
  title: "Image Uploader",
  description: "An App to upload image to S3",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <SessionProvider session={session}>
          <div className="flex flex-col h-full">
            <Header session={session} />
            <div className="bg-slate-100 flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
