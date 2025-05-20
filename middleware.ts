import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const url = request.nextUrl.clone(); // clone to preserve the original

  const res = NextResponse.next();

  // Inject full URL as x-url header for use in generateMetadata
  res.headers.set("x-url", url.toString());

  // If refreshToken cookie is already present, return early
  if (cookies.get("refreshToken")) {
    return res;
  }

  // Generate visitor tokens with Wix SDK
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });

  const tokens = await wixClient.auth.generateVisitorTokens();

  // Set refresh token as cookie
  res.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return res;
};

// Optional: limit to specific paths (e.g., only for /shop)
export const config = {
  matcher: ["/shop"],
};