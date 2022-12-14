import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
    theme: {
        extend: {
            fontFamily: {
                sans: "ui-sans-serif, Open Sans",
                head: "ui-sans-serif, Poppins"
            },
            colors: {
                'gfa': {
                    '50': '#F5B0FA',
                    '100': '#F39CF9',
                    '200': '#EE76F7',
                    '300': '#EA4FF4',
                    '400': '#E729F2',
                    '500': '#DA0EE4',
                    '600': '#B60CBE',
                    '700': '#920997',
                    '800': '#6D0771',
                    '900': '#48054A'
                },
                'gfa-dark': "#08080B",
                'gfa-white': "#f2f2f2",
                'gfa-pink': "#ED2D73"
            }
        }
    },
    shortcuts: {
        'button': "focus:outline-none text-white bg-gfa-700 hover:bg-gfa-500 focus:ring-4 focus:ring-gfa-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2",
        'fat-text': "text-gfa-pink font-head font-extrabold",
        'input-gfa': "text-gfa-white bg-gfa-dark border-gfa-500 border-1 rounded-sm p-3px focus:border-4 focus:p-0 focus:outline-none w-20 placeholder-opacity-25 placeholder-gfa-white"
    },
    safelist: 'w-16 w-18 w-20 w-24 w-32 h-16 h-18 h-20 h-24 h-32',
    corePlugins: {
        container: false
    }
})