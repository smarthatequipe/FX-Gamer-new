"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu } from "lucide-react"
import { useState } from "react"
import { Search } from "@/components/search"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">FXGAMES</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full max-w-sm mx-4">
            <Search />
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/noticias" className="transition-colors hover:text-foreground/80">
              Notícias
            </Link>
            <Link href="/reviews" className="transition-colors hover:text-foreground/80">
              Reviews
            </Link>
            <Link href="/guias" className="transition-colors hover:text-foreground/80">
              Guias
            </Link>
            <Link href="/sobre" className="transition-colors hover:text-foreground/80">
              Sobre
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>
          </div>

          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/noticias" className="transition-colors hover:text-foreground/80">
              Notícias
            </Link>
            <Link href="/reviews" className="transition-colors hover:text-foreground/80">
              Reviews
            </Link>
            <Link href="/guias" className="transition-colors hover:text-foreground/80">
              Guias
            </Link>
            <Link href="/sobre" className="transition-colors hover:text-foreground/80">
              Sobre
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}