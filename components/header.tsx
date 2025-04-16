"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, BarChart2, Settings, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import Logo from "@/public/logo.svg"

export default function Header() {
  const [username, setUsername] = useState("username")
  const [userRole, setUserRole] = useState("Role")
  const [open, setOpen] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const shopNameRef = useRef<HTMLSpanElement>(null)
  const rightSectionRef = useRef<HTMLDivElement>(null)

  // Check if truncation is needed based on available space
  useEffect(() => {
    const checkTruncation = () => {
      if (headerRef.current && shopNameRef.current && rightSectionRef.current) {
        const headerWidth = headerRef.current.offsetWidth
        const logoWidth = 40 // Approximate width of logo + slash + padding
        const menuWidth = 32 // Approximate width of menu button
        const rightSectionWidth = rightSectionRef.current.offsetWidth
        const availableWidth = headerWidth - logoWidth - menuWidth - rightSectionWidth - 20 // 20px buffer

        const shopNameWidth = shopNameRef.current.scrollWidth

        setIsTruncated(shopNameWidth > availableWidth)
      }
    }

    checkTruncation()
    window.addEventListener("resize", checkTruncation)

    return () => {
      window.removeEventListener("resize", checkTruncation)
    }
  }, [])

  return (
    <header ref={headerRef} className="flex h-14 items-center border-b bg-neutral-950 px-2 sm:px-4 lg:px-6">
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        {/* Mobile menu button */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-neutral-300 hover:bg-neutral-800 hover:text-white h-8 w-8"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-neutral-950 text-white">
            <DrawerHeader>
              <DrawerTitle className="text-white flex items-center">
                <Image
                  src={Logo || "/placeholder.svg"}
                  alt="TU Store Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 mr-2"
                />
                {username}&apos;s shop
              </DrawerTitle>
              <DrawerDescription className="text-neutral-400">Point of Sale System</DrawerDescription>
              <div className="flex items-center mt-1">
                <Badge
                  variant="default"
                  className="border-neutral-700 text-xs font-normal text-neutral-300 rounded-full"
                >
                  {userRole}
                </Badge>
              </div>
            </DrawerHeader>
            <div className="px-4">
              <Separator className="bg-neutral-800" />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                Feedback
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                Help
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
            <DrawerFooter className="border-t border-neutral-800">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/friendly-neighborhood-grocer.png" alt="Usuario" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{username}@example.com</p>
                </div>
              </div>
              <Button variant="default" className="bg-neutral-100 text-black hover:bg-neutral-300">
                Log out
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Link href="#" className="flex items-center">
          <Image
            src={Logo || "/placeholder.svg"}
            alt="TU Store Logo"
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </Link>
        <div className="flex items-center text-white">
          <span className="mx-1 sm:mx-2 text-neutral-500">/</span>
          <span
            ref={shopNameRef}
            className={`font-medium ${isTruncated ? "truncate max-w-[120px] sm:max-w-[160px]" : "whitespace-nowrap"}`}
          >
            {username}&apos;s shop
          </span>
          <Badge
            variant="default"
            className="ml-1 sm:ml-2 border-neutral-700 text-[10px] sm:text-xs font-normal text-neutral-300 rounded-full px-1.5 py-0 sm:px-2 sm:py-0 md:flex hidden"
          >
            {userRole}
          </Badge>
        </div>
      </div>

      <div ref={rightSectionRef} className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-4">
        <nav className="hidden md:flex md:items-center md:gap-1">
          <Button variant="ghost" size="sm" className="text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white">
            Feedback
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white">
            Help
          </Button>
        </nav>

        <Button variant="ghost" size="icon" className="text-neutral-300 hover:bg-neutral-800 hover:text-white h-8 w-8">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="/friendly-neighborhood-grocer.png" alt="Usuario" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{username}</p>
                <p className="text-xs leading-none text-muted-foreground">{username}@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <BarChart2 className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
