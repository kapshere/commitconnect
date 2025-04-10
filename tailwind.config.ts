
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				connect: {
					50: '#e8f5ff',
					100: '#cce9ff',
					200: '#99d3ff',
					300: '#66bdff',
					400: '#33a7ff',
					500: '#4285f4', // Google blue
					600: '#3367d6',
					700: '#2a56c6',
					800: '#1e47ac',
					900: '#0d2f8b',
				},
				navy: {
					50: '#f0f4fa',
					100: '#d9e2f5',
					200: '#b3c6eb',
					300: '#8da9e0',
					400: '#6687d6',
					500: '#4065cb',
					600: '#3451a3',
					700: '#283d7a',
					800: '#1c2952',
					900: '#0e1429',
				},
				nordic: {
					50: '#f5f7f7',
					100: '#e6e9ea',
					200: '#d1d7d9', 
					300: '#a8b8bd',
					400: '#6e868f',
					500: '#4a6670',
					600: '#38505a',
					700: '#2c4049',
					800: '#20303a',
					900: '#192630',
				},
				earth: {
					50: '#f9f6f3',
					100: '#f3ece5',
					200: '#e7d7c9',
					300: '#d9bea6',
					400: '#c19c7a',
					500: '#a87f5d',
					600: '#8c674a',
					700: '#74563e',
					800: '#614a37',
					900: '#523f31',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 10px 2px rgba(66, 133, 244, 0.2)' }, // Google blue glow
					'50%': { boxShadow: '0 0 18px 4px rgba(66, 133, 244, 0.3)' }
				},
				'theme-fade': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'theme-fade': 'theme-fade 0.5s ease-out'
			},
			boxShadow: {
				'sm': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
				'DEFAULT': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
				'md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
				'lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
				'xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
				'glow': '0 0 15px rgba(66, 133, 244, 0.4)', // Google blue glow
				'dark': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
				'dark-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.25)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
