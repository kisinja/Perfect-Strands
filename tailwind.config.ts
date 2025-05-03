import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './pages/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['var(--font-playfair)', 'serif'],
                cormorant: ['var(--font-cormorant)', 'serif'],
            },
            colors: {
                softGold: '#D4AF37', // You can tweak this to match the desired tone
                blush: '#FADADD',    // Pinky-nude blush tone (adjust as needed)
            },
            backgroundImage: {
                'hair-waves': "url('/hair-waves.svg')",
            },

        },
    },
    plugins: [],
};

export default config;