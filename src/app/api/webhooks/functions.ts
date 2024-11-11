import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";

const credential = new AzureNamedKeyCredential(
  process.env.AUTH_AZURE_ACCOUNT ?? "",
  process.env.AUTH_AZURE_ACCESS_KEY ?? ""
);

const userUpdateClient = new TableClient(
  process.env.AUTH_AZURE_TABLES_ENDPOINT ?? "",
  "test",
  credential
);

export async function updateUserIsPro(stripeCustomerId: string): Promise<void> {
  try {
    // Retrieve the user entity by filtering with stripeCustomerId
    const entities = userUpdateClient.listEntities({
      queryOptions: { filter: `stripeCustomerId eq '${stripeCustomerId}'` },
    });

    // Fetch the first (and expectedly only) entity matching the stripeCustomerId
    const user = (await entities.next()).value;

    if (!user) {
      throw new Error(
        `User with stripeCustomerId ${stripeCustomerId} not found.`
      );
    }
    // Update the isPro field to true
    await userUpdateClient.updateEntity(
      {
        partitionKey: user.partitionKey,
        rowKey: user.rowKey,
        isPro: true,
      },
      "Merge"
    );

    console.log(
      `User with stripeCustomerId ${stripeCustomerId} is now updated to Pro.`
    );
  } catch (error) {
    console.error("Error updating user to Pro:", error);
    throw error;
  }
}
