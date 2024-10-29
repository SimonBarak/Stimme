import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/nodemailer";
import { TableStorageAdapter } from "@auth/azure-tables-adapter";
import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";

const credential = new AzureNamedKeyCredential(
  process.env.AUTH_AZURE_ACCOUNT ?? "",
  process.env.AUTH_AZURE_ACCESS_KEY ?? ""
);
const authClient = new TableClient(
  process.env.AUTH_AZURE_TABLES_ENDPOINT ?? "",
  "auth",
  credential
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: TableStorageAdapter(authClient),
});
