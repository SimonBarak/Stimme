import NextAuth, { type AuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/nodemailer";
import Mailgun from "next-auth/providers/mailgun";
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
  // providers: [
  //   Mailgun({
  //     // If your environment variable is named differently than default
  //     apiKey: process.env.AUTH_MAILGUN_KEY,
  //     from: "no-reply@company.com",
  //   }),
  // ],
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: TableStorageAdapter(authClient),
} satisfies AuthConfig);

// import NextAuth from "next-auth";

// import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
// import EmailProvider from "next-auth/providers/nodemailer";
// import Mailgun from "next-auth/providers/mailgun";

// const credential = new AzureNamedKeyCredential(
//   process.env.AZURE_ACCOUNT ?? "",
//   process.env.AZURE_ACCESS_KEY ?? ""
// );
// const authClient = new TableClient(
//   process.env.AZURE_TABLES_ENDPOINT ?? "",
//   "auth",
//   credential
// );

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     EmailProvider({
//       server: process.env.EMAIL_SERVER,
//       from: process.env.EMAIL_FROM,
//     }),
//   ],
//   adapter: TableStorageAdapter(authClient),
// });
