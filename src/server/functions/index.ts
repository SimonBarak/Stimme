import { TableClient } from "@azure/data-tables";

// Function to update user in Azure Table Storage
export async function updateUserInAzureTable(
  tableClient: TableClient,
  userId: string,
  stripeCustomerId: string
) {
  const partitionKey = "user"; // Modify this if your partition key is different
  const rowKey = userId;

  try {
    // Fetch the existing user entity
    const userEntity = await tableClient.getEntity(partitionKey, rowKey);

    if (userEntity) {
      // Check if partitionKey and rowKey exist, and if not, log an error
      if (!userEntity.partitionKey || !userEntity.rowKey) {
        console.error("PartitionKey or RowKey is missing from the user entity");
        return;
      }

      // Update the user entity with stripeCustomerId
      userEntity.stripeCustomerId = stripeCustomerId;

      // Update the entity in the table
      await tableClient.updateEntity(
        {
          partitionKey: userEntity.partitionKey,
          rowKey: userEntity.rowKey,
          stripeCustomerId: stripeCustomerId,
        },
        "Replace"
      );
      console.log("User updated with Stripe customer ID:", stripeCustomerId);
    }
  } catch (error) {
    console.error(
      "Error fetching or updating the user entity in Azure Table:",
      error
    );
  }
}
