/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    logs: false,
    themes: [
      {
        devsoverflow: {
          "primary": "#e64c4c",
          "secondary": "#4c70e6",
          "accent": "#f42525",
          "neutral": "#78716c",
          "base-100": "#040711",
          "info": "#3b82f6",
          "success": "#84cc16",
          "warning": "#f97316",
          "error": "#ef4444"
        }
      }
    ]
  }
}
