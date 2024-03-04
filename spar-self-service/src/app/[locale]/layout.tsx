import Favicon from "/public/img/favicon.ico";
import "@/commons/styles/globals.css";
import {Header} from "../components";
import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {AuthProvider} from "../store/auth-context";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300","400", "700"],
});

export const metadata: Metadata = {
  title: "Social Payments Account Registry",
  description: "SPAR ID Account Mapper",
  icons: [{rel: "icon", url: Favicon.src}],
};
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({children, params: {locale}}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
