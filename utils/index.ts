export const slides = [
    {
        id: 1,
        title: "Luxury Human Hair Wigs",
        description: "Buy 2 wigs, get a FREE Wig Serum",
        img: "https://images.unsplash.com/photo-1629805484751-2a3d9ee04def?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWFuJTIwaGFpciUyMHdpZ3N8ZW58MHx8MHx8fDA%3D",
        url: "/shop?name=human-hair",
        bg: "bg-gradient-to-r from-amber-50 to-[#D7C1B3]", // Warm tones matching brunette wig
        btnText: "Shop Now",
        btnStyle: "bg-rose-600 hover:bg-rose-700 text-white"
    },
    {
        id: 2,
        title: "New Collection: Lace Front Wigs",
        description: "Buy 2 wigs, get a FREE Wig Serum",
        img: "https://images.unsplash.com/photo-1595218841793-d38b949402d2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGh1bWFuJTIwaGFpciUyMHdpZ3N8ZW58MHx8MHx8fDA%3D",
        url: "/shop?name=lace-front",
        bg: "bg-gradient-to-r from-violet-50 to-indigo-50", // Cool tones matching blonde wig
        btnText: "Explore Styles",
        btnStyle: "bg-indigo-600 hover:bg-indigo-700 text-white"
    },
    {
        id: 3,
        title: "Customizable Wigs",
        description: "Buy 2 wigs, get a FREE Wig Serum",
        img: "https://images.unsplash.com/photo-1724362180927-efc8dbf5eadb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvbWFuJTIwaW4lMjB3aWd8ZW58MHx8MHx8fDA%3D",
        url: "/shop?name=custom",
        bg: "bg-gradient-to-r from-emerald-50 to-teal-50", // Earth tones matching auburn wig
        btnText: "Get Yours",
        btnStyle: "bg-teal-600 hover:bg-teal-700 text-white"
    },
];

export const formatPrice = (
    value: number,
    currency: string = "KES",
    locale: string = "en-US",
) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};