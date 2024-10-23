import Header from "@/components/Header";
import "@radix-ui/colors/gray.css";
import "@/styles/globals.css";
import "@/styles/input.css";
import "@/styles/dialog.css";
import "@/styles/popover.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Header />
          <div>{modal}</div>

          <main>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
