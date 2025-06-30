"use client";

import Image from "next/image";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixCient";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

const NavProfile = () => {
    const wixClient = useWixClient();
    const isLoggedIn = wixClient.auth.loggedIn();
    const router = useRouter();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            Cookies.remove("refreshToken");
            const { logoutUrl } = await wixClient.auth.logout(window.location.href);
            setIsProfileOpen(false);
            toast.success("Logged out successfully");
            router.push(logoutUrl);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = () => {
        if (isLoggedIn) {
            setIsProfileOpen(!isProfileOpen);
        } else {
            toast.info("Please login to continue");
            router.push("/auth/login");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative">
                <Image
                    src="/profileIcon.svg"
                    alt="Profile Icon"
                    width={42}
                    height={42}
                    className="rounded-full cursor-pointer hover:bg-pink-100 p-1.5 transition-colors"
                    onClick={handleClick}
                />
            </DropdownMenuTrigger>

            {isProfileOpen && (
                <DropdownMenuContent className="w-48 absolute right-0 top-10 bg-white rounded-xl shadow-lg p-3 z-20 flex flex-col gap-3 border border-pink-100">
                    {isLoggedIn ? (
                        <>
                            <DropdownMenuItem className="cursor-default text-sm text-gray-600">
                                Hello, user
                            </DropdownMenuItem>

                            <Button
                                variant="destructive"
                                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-white w-full py-2 rounded-md text-sm"
                                onClick={handleLogout}
                            >
                                {isLoading ? "Logging out..." : "Logout"}
                            </Button>
                        </>
                    ) : (
                        <DropdownMenuItem className="cursor-pointer text-sm text-pink-600 hover:underline">
                            <Link href="/auth/login">Sign In</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default NavProfile;