import type { Config } from 'tailwindcss'
import tailwindTypography from '@tailwindcss/typography'
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [daisyui, tailwindTypography],
  daisyui: {
    themes: ['emerald', 'synthwave']
  }
} satisfies Config
