"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Route } from "lucide-react"
import { useState } from "react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navigationItems = [
    { path: "/", label: "新規プラン", icon: Home },
    { path: "/plan", label: "旅行プラン", icon: Route }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* ロゴ・ブランド（タップ可能） */}
        <div 
          className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80 active:opacity-60"
          onClick={() => {
            router.push("/")
            setMobileMenuOpen(false)
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              router.push("/")
              setMobileMenuOpen(false)
            }
          }}
          aria-label="ホームページに戻る"
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TravelSync
          </h1>
        </div>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center gap-1" aria-label="メインナビゲーション">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => router.push(item.path)}
                className="flex items-center gap-2 min-h-[44px] px-4"
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* モバイルメニューボタン */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden min-h-[44px] min-w-[44px] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 shadow-lg"
          role="navigation"
          aria-label="モバイルナビゲーション"
        >
          <div className="container px-4 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start gap-3 min-h-[48px] text-left"
                  onClick={() => {
                    router.push(item.path)
                    setMobileMenuOpen(false)
                  }}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}