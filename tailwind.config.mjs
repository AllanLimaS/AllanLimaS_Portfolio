/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#ffffff",
        "on-background": "#141414",
        "surface": "#ffffff",
        "on-surface": "#141414",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fafafa",
        "surface-container": "#f7f7f7",
        "surface-container-high": "#ebebeb",
        "surface-container-highest": "#e0e0e0",
        "on-surface-variant": "#666666",
        "outline": "#cccccc",
        "outline-variant": "#ebebeb",
        "primary": "#A34336",
        "on-primary": "#ffffff",
        "primary-container": "#A34336",
        "on-primary-container": "#ffffff",
        "secondary": "#8C3428",
        "on-secondary": "#ffffff",
        "secondary-container": "#8C3428",
        "on-secondary-container": "#ffffff",
        "tertiary": "#141414",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#ebebeb",
        "on-tertiary-container": "#141414",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#410002",
        "surface-variant": "#f4ddda",
        "inverse-surface": "#362f2e",
        "inverse-on-surface": "#fbeeec",
        "inverse-primary": "#ffb4aa",
        "shadow": "#000000",
        "surface-tint": "#A34336",
        "scrim": "#000000",
        "surface-bright": "#ffffff",
        "surface-dim": "#e0e0e0"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-mobile": "24px",
        "gutter": "32px",
        "margin-desktop": "64px",
        "unit": "4px",
        "container-max": "1440px",
        "xxl": "160px"
      },
      fontFamily: {
        "label-sm": ["JetBrains Mono"],
        "body-md": ["Geist"],
        "body-lg": ["Geist"],
        "display-lg": ["Hanken Grotesk"],
        "display-lg-mobile": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"]
      },
      fontSize: {
        "label-sm": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "display-lg": ["64px", { "lineHeight": "72px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
        "display-lg-mobile": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.03em", "fontWeight": "700" }],
        "headline-md": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600" }]
      }
    }
  }
}
