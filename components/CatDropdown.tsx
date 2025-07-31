"use client";
import { useWixClient } from '@/hooks/useWixCient';
import { collections } from '@wix/stores';
import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from 'next/navigation';

interface CatDropdownProps {
    handleFilterChange: (name: string, value: string) => void;
}

const CatDropdown = ({ handleFilterChange }: CatDropdownProps) => {
    // get the selected category from the url
    const searchParams = useSearchParams();
    const searchedCategory = searchParams.get("cat") || "Pick a Category";
    const wixClient = useWixClient();
    const [categories, setCategories] = useState<collections.Collection[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(searchedCategory);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await wixClient.collections
                    .queryCollections()
                    .find();
                setCategories(res.items);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, [wixClient]);

    const handleSelect = (slug: string, name: string) => {
        setSelectedCategory(name.toUpperCase());
        handleFilterChange("cat", slug);
    };

    if (categories.length === 0) {
        return <div className="h-10 w-40 bg-[#fce7f3] rounded-full animate-pulse"></div>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span
                    className="flex items-center gap-2 border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 w-full py-3 px-6 rounded-full border text-[#3b1f2b] font-medium tracking-wider"
                >
                    {selectedCategory}
                    <ChevronDown className="h-4 w-4 text-[#D4AF37]" />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto bg-white border-[#D4AF37]/20 shadow-lg rounded-xl py-1">
                {categories.map((category) => (
                    <DropdownMenuItem
                        key={category._id}
                        onClick={() => handleSelect(category.slug || "", category.name || "")}
                        className="cursor-pointer hover:bg-[#D4AF37]/10 focus:bg-[#D4AF37]/10 text-[#3b1f2b] px-4 py-2 uppercase text-sm font-medium"
                    >
                        {category.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CatDropdown;