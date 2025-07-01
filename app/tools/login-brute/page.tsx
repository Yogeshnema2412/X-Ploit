"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { KeyRound, Play, Square, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LoginBrute() {
  const [target, setTarget] = useState("")
  const [username, setUsername] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [results, setResults] = useState<Array<{ username: string; password: string; status: string }>>([])

  const startScan = () => {
    if (!target || !username) return

    setIsScanning(true)
    setLogs([])
    setResults([])

    const newLogs = [
      `Starting login brute force on ${target}`,
      `Target username: ${username}`,
      `Loading password list...`,
      `Testing credentials...`,
    ]

    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`])
      }, index * 500)
    })

    // Simulate testing passwords
    const commonPasswords = ["password", "123456", "admin", "password123", "qwerty"]

    commonPasswords.forEach((password, index) => {
      setTimeout(
        () => {
          setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Trying ${username}:${password}`])

          // Simulate a successful login on the 3rd attempt
          const status = index === 2 ? "Success" : "Failed"
          setResults((prev) => [...prev, { username, password, status }])

          if (status === "Success") {
            setLogs((prev) => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] ✓ Valid credentials found: ${username}:${password}`,
            ])
            setIsScanning(false)
          }
        },
        (index + 4) * 800,
      )
    })

    // Stop scanning after all attempts if no success
    setTimeout(() => {
      if (isScanning) {
        setLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Brute force completed. No valid credentials found.`,
        ])
        setIsScanning(false)
      }
    }, 8000)
  }

  const stopScan = () => {
    setIsScanning(false)
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Brute force stopped by user.`])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <KeyRound className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Login Bruteforce Tool</h1>
          <p className="text-gray-400">Test login forms with common credentials</p>
        </div>
      </div>

      <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Critical Warning</span>
        </div>
        <p className="text-gray-300 text-sm">
          This tool is for authorized penetration testing only. Unauthorized access attempts are illegal and may result
          in criminal charges. Only use on systems you own or have explicit written permission to test.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Attack Configuration</CardTitle>
            <CardDescription className="text-gray-400">Configure brute force parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">
                Target Login URL
              </Label>
              <Input
                id="target"
                placeholder="https://example.com/login"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex gap-2 pt-4">
              {!isScanning ? (
                <Button
                  onClick={startScan}
                  disabled={!target || !username}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Attack
                </Button>
              ) : (
                <Button onClick={stopScan} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  Stop Attack
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Attack Logs</CardTitle>
            <CardDescription className="text-gray-400">Real-time brute force progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={logs.join("\n")}
              readOnly
              className="bg-gray-800 border-gray-600 text-green-400 font-mono text-sm min-h-[200px] resize-none"
              placeholder="Attack logs will appear here..."
            />
          </CardContent>
        </Card>
      </div>

      {results.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Credential Attempts</CardTitle>
            <CardDescription className="text-gray-400">Tested username and password combinations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Username</TableHead>
                  <TableHead className="text-gray-300">Password</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="text-white font-mono">{result.username}</TableCell>
                    <TableCell className="text-white font-mono">{result.password}</TableCell>
                    <TableCell>
                      <Badge
                        variant={result.status === "Success" ? "default" : "secondary"}
                        className={result.status === "Success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                      >
                        {result.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
