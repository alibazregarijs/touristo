import { Client, Account } from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://frankfurt.cloud.appwrite.io/v1')
  .setProject('68c5047c0008bc01200e'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
