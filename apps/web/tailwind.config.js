/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-variant": "#e1e3e4",
        "surface-tint": "#a93441",
        "surface-container-lowest": "#ffffff",
        "secondary-fixed-dim": "#f6be39",
        "primary-fixed-dim": "#ffb3b4",
        "on-primary-fixed": "#40000b",
        "on-tertiary-fixed-variant": "#005046",
        "secondary-fixed": "#ffdfa0",
        "on-secondary-fixed": "#261a00",
        "on-error-container": "#93000a",
        "surface": "#f8f9fa",
        "error-container": "#ffdad6",
        "surface-container": "#edeeef",
        "tertiary": "#003a32",
        "tertiary-fixed-dim": "#90d3c5",
        "tertiary-container": "#005348",
        "surface-container-low": "#f3f4f5",
        "surface-container-high": "#e7e8e9",
        "on-primary-fixed-variant": "#881c2b",
        "on-surface": "#191c1d",
        "on-tertiary-container": "#83c5b7",
        "inverse-surface": "#2e3132",
        "on-error": "#ffffff",
        "error": "#ba1a1a",
        "outline": "#8b7171",
        "surface-dim": "#d9dadb",
        "secondary": "#795900",
        "primary-fixed": "#ffdada",
        "surface-bright": "#f8f9fa",
        "primary-container": "#8b1e2d",
        "inverse-on-surface": "#f0f1f2",
        "on-primary-container": "#ff9da0",
        "on-secondary-fixed-variant": "#5c4300",
        "on-secondary": "#ffffff",
        "on-tertiary-fixed": "#00201b",
        "background": "#f8f9fa",
        "secondary-container": "#ffc641",
        "on-surface-variant": "#574142",
        "on-background": "#191c1d",
        "on-secondary-container": "#715300",
        "surface-container-highest": "#e1e3e4",
        "on-tertiary": "#ffffff",
        "inverse-primary": "#ffb3b4",
        "on-primary": "#ffffff",
        "primary": "#6b0119",
        "outline-variant": "#debfbf",
        "tertiary-fixed": "#acf0e0"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "section-padding": "80px",
        "container-max": "1200px",
        "margin-mobile": "16px",
        "base-unit": "8px",
        "gutter": "24px"
      },
      fontFamily: {
        "body-md": ["Source Sans 3"],
        "label-md": ["Work Sans"],
        "display-lg": ["Libre Franklin"],
        "headline-md": ["Libre Franklin"],
        "headline-lg-mobile": ["Libre Franklin"],
        "label-sm": ["Work Sans"],
        "headline-lg": ["Libre Franklin"],
        "body-lg": ["Source Sans 3"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
