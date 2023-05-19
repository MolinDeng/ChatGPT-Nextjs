import Sidebar from "@/app/components/Sidebar";
import "./globals.css";
import { SessionProvider } from "./components/SessionProvider";
import { getServerSession } from "next-auth";
import Login from "./components/Login";
import GoogleProvider from "next-auth/providers/google";

import { Inter } from "next/font/google";
import ToasterProvider from "./components/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT Messenger",
  description: "Powered by OpenAI and Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ! import authOptions from route.ts is not valid when deployinf
  const session = await getServerSession({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
    ],
  }); // ! this would be a server side page
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {!session ? (
            <Login /> // ! client component
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>
              <ToasterProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
