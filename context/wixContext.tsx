"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext, ReactNode, useState } from "react";
import { items } from "@wix/data";
import { members } from "@wix/members";

// Parse refresh token
const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");

// Create Wix client
const myWixClient = createClient({
    modules: {
        products,
        collections,
        currentCart,
        items,
        members,
    },
    auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
            refreshToken,
            accessToken: {
                value: "",
                expiresAt: 0,
            },
        },
    }),
});

// ✅ Define the custom context type
export type WixClientContextType = {
    myWixClient: typeof myWixClient;
    isChatWidgetOpen: boolean;
    setIsChatWidgetOpen: (open: boolean) => void;
};

// ✅ Create context with correct default value
export const WixClientContext = createContext<WixClientContextType>({
    myWixClient,
    isChatWidgetOpen: false,
    setIsChatWidgetOpen: () => { }, // no-op default
});

// ✅ Context Provider
export const WixClientContextProvider = ({ children }: { children: ReactNode }) => {
    const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

    return (
        <WixClientContext.Provider value={{ myWixClient, isChatWidgetOpen, setIsChatWidgetOpen }}>
            {children}
        </WixClientContext.Provider>
    );
};
