import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Receitas do Fabio",
  description: "Receitinhas para o Fabio seguir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-700 text-black">
        {children}
      </body>
    </html>
  );
}
