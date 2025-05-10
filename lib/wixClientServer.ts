import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { items } from "@wix/data";
import { cookies } from "next/headers";
import { members } from "@wix/members";
import { currentCart } from '@wix/ecom';

export const wixClientServer = async () => {


    let refreshToken;
    try {


        const cookieStore = await cookies();
        refreshToken = JSON.parse(
            cookieStore.get("refreshToken")?.value || "{}"
        );

    } catch (error) {
        console.error("Error parsing refresh token:", error);
        throw new Error("Failed to parse refresh token from cookies.");
    }


    const wixClientServer = createClient({
        modules: {
            products,
            collections,
            items,
            members,
            currentCart,
        },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: {
                refreshToken, accessToken: {
                    value: "",
                    expiresAt: 0,
                }
            },
        }),
    });

    return wixClientServer;
};