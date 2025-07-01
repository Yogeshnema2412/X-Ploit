"use client"

import { Shield, Home, Scan, FolderSearch, KeyRound, Database, Search, Settings, Info } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Port Scanner",
    url: "/tools/port-scanner",
    icon: Scan,
  },
  {
    title: "Directory Brute Forcer",
    url: "/tools/directory-brute",
    icon: FolderSearch,
  },
  {
    title: "Login Bruteforce",
    url: "/tools/login-brute",
    icon: KeyRound,
  },
  {
    title: "SQL Injection Scanner",
    url: "/tools/sql-injection",
    icon: Database,
  },
  {
    title: "OSINT Lookup",
    url: "/tools/osint-lookup",
    icon: Search,
  },
]

const footerItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-950 border-gray-800">
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-red-500" />
          <div>
            <h2 className="text-xl font-bold text-white">X-Ploit</h2>
            <p className="text-xs text-gray-400">Security Toolkit</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-gray-300 hover:text-white hover:bg-red-500/10 data-[active=true]:bg-red-500/20 data-[active=true]:text-red-400"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 p-4">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="text-gray-400 hover:text-white hover:bg-gray-800">
                <Link href={item.url}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
