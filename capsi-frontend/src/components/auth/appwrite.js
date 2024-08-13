// appwrite.js
import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('6668902e00191db25171'); // Your project ID

const account = new Account(client);

export { client, account };
