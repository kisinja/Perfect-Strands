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
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface CatDropdownProps {
    handleFilterChange: (name: string, value: string) => void;
}

const CatDropdown = ({ handleFilterChange }: CatDropdownProps) => {
    const wixClient = useWixClient();
    const [categories, setCategories] = useState<collections.Collection[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

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
        setSelectedCategory(name);
        handleFilterChange("cat", slug); // Pass both name and value
    };

    if (categories.length === 0) {
        return <p className='text-xs text-gray-500'>Loading categories...</p>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-200 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
                >
                    {selectedCategory}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
                {/* <DropdownMenuItem
                    onClick={() => handleSelect("", "All Categories")}
                    className="cursor-pointer hover:bg-[#D4AF37]/10 focus:bg-[#D4AF37]/10"
                >
                    All Categories
                </DropdownMenuItem> */}
                {categories.map((category) => (
                    <DropdownMenuItem
                        key={category._id}
                        onClick={() => handleSelect(category.slug || "", category.name || "")}
                        className="cursor-pointer hover:bg-[#D4AF37]/10 focus:bg-[#D4AF37]/10"
                    >
                        {category.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default CatDropdown;