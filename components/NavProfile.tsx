"use client"

import Image from "next/image"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixCient";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
        }
        router.push('/auth/login');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative">
                <Image
                    src="/profileIcon.svg"
                    alt="Profile Icon"
                    width={42}
                    height={42}
                    className="rounded-full cursor-pointer hover:bg-gray-100 p-2 transition-colors active:bg-white"
                    onClick={handleClick}
                />
            </DropdownMenuTrigger>
            {
                isProfileOpen && (
                    <DropdownMenuContent className="w-48 absolute right-0 top-8 bg-white shadow-lg rounded-md p-2 z-20 flex flex-col gap-2">
                        {
                            isLoggedIn ? (
                                <>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <span>Hello, user</span>
                                    </DropdownMenuItem>
                                    <div>
                                        <Button variant="default" className="w-full cursor-pointer" onClick={handleLogout}>
                                            {isLoading ? "Logging out..." : "Logout"}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <DropdownMenuItem className="cursor-pointer">
                                    <span>
                                        <Link href="#">Sign In</Link>
                                    </span>
                                </DropdownMenuItem>
                            )
                        }
                    </DropdownMenuContent>
                )
            }
        </DropdownMenu>
    )
}

export default NavProfile