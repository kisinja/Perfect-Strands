"use client"

import Image from "next/image"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const NavProfile = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="relative">
                <Image
                    src="/profileIcon.svg"
                    alt="Profile Icon"
                    width={42}
                    height={42}
                    className="rounded-full cursor-pointer hover:bg-gray-100 p-2 transition-colors active:bg-white"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                />
            </DropdownMenuTrigger>
            {
                isProfileOpen && (
                    <DropdownMenuContent className="w-48 absolute right-0 top-8 bg-white shadow-lg rounded-md p-2 z-20 flex flex-col gap-2">
                        <DropdownMenuItem className="cursor-pointer">
                            <span>Hello, user</span>
                        </DropdownMenuItem>
                        <div>
                            <Button variant="default" className="w-full cursor-pointer">Sign Out</Button>
                        </div>
                    </DropdownMenuContent>
                )
            }
        </DropdownMenu>
    )
}

export default NavProfile