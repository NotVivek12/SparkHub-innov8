import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export const ThemeToggle = () => {
  const { isDark, toggle } = useThemeStore()

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  )
}