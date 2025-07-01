import { Shield, Scan, FolderSearch, KeyRound, Database, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const tools = [
  {
    id: "port-scanner",
    title: "Port Scanner",
    description: "Scan target systems for open ports and running services",
    icon: Scan,
    status: "Active",
    href: "/tools/port-scanner",
  },
  {
    id: "directory-brute",
    title: "Directory Brute Forcer",
    description: "Discover hidden directories and files on web servers",
    icon: FolderSearch,
    status: "Active",
    href: "/tools/directory-brute",
  },
  {
    id: "login-brute",
    title: "Login Bruteforce Tool",
    description: "Test login forms against common credential combinations",
    icon: KeyRound,
    status: "Active",
    href: "/tools/login-brute",
  },
  {
    id: "sql-injection",
    title: "SQL Injection Scanner",
    description: "Detect SQL injection vulnerabilities in web applications",
    icon: Database,
    status: "Active",
    href: "/tools/sql-injection",
  },
  {
    id: "osint-lookup",
    title: "OSINT Lookup",
    description: "Gather open source intelligence on targets and domains",
    icon: Search,
    status: "Active",
    href: "/tools/osint-lookup",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome to X-Ploit Cybersecurity Toolkit</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold text-white">X-Ploit</span>
        </div>
      </div>

      <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Security Notice</span>
        </div>
        <p className="text-gray-300 text-sm">
          This toolkit is intended for authorized security testing only. Only use these tools on systems you own or have
          explicit permission to test. Unauthorized access to computer systems is illegal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href}>
            <Card className="bg-gray-900/50 border-gray-700 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <tool.icon className="w-8 h-8 text-red-500 group-hover:text-red-400 transition-colors" />
                  <Badge variant="outline" className="border-green-500/50 text-green-400 bg-green-500/10">
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="text-white group-hover:text-red-100 transition-colors">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Tools Available</span>
              <span className="text-green-400 font-semibold">{tools.length}/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Active Scans</span>
              <span className="text-yellow-400 font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">System Load</span>
              <span className="text-green-400 font-semibold">Low</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-gray-400 text-sm">No recent activity</div>
              <div className="text-gray-500 text-xs">Activity logs will appear here when tools are used</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
