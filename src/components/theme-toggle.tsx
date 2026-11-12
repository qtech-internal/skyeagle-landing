"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

/**
 * Both icons are rendered and the stylesheet shows the one for the active
 * theme, so the server and the browser produce the same markup.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Switch between light and dark theme"
    >
      <Sun size={16} className="sun" />
      <Moon size={16} className="moon" />
    </button>
  )
}
