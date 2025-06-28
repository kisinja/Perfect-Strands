import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = searchQuery.trim().toLowerCase();
        if (name) {
            router.push(`/shop?name=${name}`);
            setIsFocused(false);
        }
    };

    return (
        <form
            className={`relative flex items-center transition-all duration-200 ${isFocused ? 'w-64' : 'w-48'
                }`}
            onSubmit={handleSearch}
        >
            {/* Search Icon Positioned Absolutely */}
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

            <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm ${isFocused && 'bg-white'
                    }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {
                searchQuery.trim().length > 0 && (
                    <button type="submit" className="absolute right-[2px] p-1 text-sm text-gray-500 hover:text-black rounded-full">
                        Go
                    </button>
                )
            }
        </form>
    );
};

export default SearchInput;