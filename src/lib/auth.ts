import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("skillswap");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, { client }),

    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    try {
                        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: user.name,
                                email: user.email,
                                image: user.image,
                            }),
                        });
                    } catch (err) {
                        console.error("Failed to sync user to custom backend:", err);
                    }
                },
            },
        },
    },
});