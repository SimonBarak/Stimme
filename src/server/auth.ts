import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/nodemailer";
import { TableStorageAdapter } from "@auth/azure-tables-adapter";
import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";
import Stripe from "stripe";

const credential = new AzureNamedKeyCredential(
  process.env.AUTH_AZURE_ACCOUNT ?? "",
  process.env.AUTH_AZURE_ACCESS_KEY ?? ""
);

const tableClient = new TableClient(
  process.env.AUTH_AZURE_TABLES_ENDPOINT ?? "",
  process.env.AUTH_AZURE_TABLE_NAME ?? "testAuth",
  credential
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: TableStorageAdapter(tableClient),
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     // Return a specific URL or `null` to skip the redirect to the "Check your email" page
  //     return "/edit"; // Set your custom redirect URL here
  //   },
  // },
  events: {
    signIn: async ({ user }) => {
      console.log(user);
    },
    createUser: async ({ user }) => {
      // @ts-ignore
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      try {
        // Create a Stripe customer
        console.log("email", user.email);
        const customer = await stripe.customers.create({
          // @ts-ignore
          email: user.email,
        });

        await tableClient.updateEntity(
          {
            partitionKey: "user",
            // @ts-ignore
            rowKey: user.id, // Make sure this matches the user's unique ID in the table
            stripeCustomerId: customer.id,
            isPro: false,
          },
          "Merge"
        );

        console.log(
          `User ${user.email} updated with Stripe customer ID: ${customer.id}`
        );
      } catch (error) {
        console.error(
          "Error creating Stripe customer or updating user:",
          error
        );
      }
    },
  },
});
