"use client"

import { Ship, Sun, MoonIcon, Menu, X } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"

interface NavbarProps {
  isScrolled: boolean
  // isDark: boolean;
  // setIsDark: (value: boolean) => void;
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (value: boolean) => void
  navItems: string[]
}
// Paling atas file
const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  // isDark,
  // setIsDark,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  navItems,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light"
    }
    return true
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ease-in-out font-poppins ${
        isScrolled ? "py-2 px-4" : "py-6 px-6"
      }`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled
            ? "max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-lg px-6 py-3"
            : "max-w-7xl mx-auto px-0 py-0"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 group cursor-pointer">
            <Ship className="w-6 h-6 text-gray-900 dark:text-white" />
            <span
              className={`font-semibold text-2xl transition-colors duration-200 ${
                isScrolled ? "text-gray-900 dark:text-white" : "text-white"
              }`}
            >
              Eksporia.id
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const map: { [key: string]: string } = {
                Beranda: "home",
                Potensi: "potensi",
                Informasi: "informasi",
                Peta: "map",
                Profil: "about",
              }
              const sectionId = map[item] || item.toLowerCase()
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-blue-600" : "bg-white"}`}
                  ></span>
                </a>
              )
            })}
          </div>

          {/* Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isScrolled
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  : "bg-white/10 text-white hover:bg-white/20"
              } backdrop-blur-sm`}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {isDarkMode ? (
                  <>
                    <Sun />
                  </>
                ) : (
                  <>
                    <MoonIcon />
                  </>
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                isScrolled ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300" : "bg-white/10 text-white"
              } backdrop-blur-sm`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 transition-all duration-300 transform ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-sm mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="space-y-4">
            {navItems.map((item) => {
              const map: { [key: string]: string } = {
                Beranda: "home",
                Potensi: "potensi",
                Informasi: "informasi",
                Peta: "map",
                Profil: "about",
              }
              const sectionId = map[item] || item.toLowerCase()
              return (
                <a
                  key={item}
                  href={`#${sectionId}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  {item}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
