"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Scan, Play, Square, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PortScanner() {
  const [target, setTarget] = useState("")
  const [portRange, setPortRange] = useState("1-1000")
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [results, setResults] = useState<Array<{ port: number; status: string; service: string }>>([])

  const startScan = () => {
    if (!target) return

    setIsScanning(true)
    setLogs([])
    setResults([])

    // Simulate scanning process
    const newLogs = [`Starting port scan on ${target}`, `Port range: ${portRange}`, `Scanning in progress...`]

    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`])
      }, index * 500)
    })

    // Simulate results after 3 seconds
    setTimeout(() => {
      const mockResults = [
        { port: 22, status: "Open", service: "SSH" },
        { port: 80, status: "Open", service: "HTTP" },
        { port: 443, status: "Open", service: "HTTPS" },
        { port: 3306, status: "Filtered", service: "MySQL" },
      ]
      setResults(mockResults)
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Scan completed. Found ${mockResults.filter((r) => r.status === "Open").length} open ports.`,
      ])
      setIsScanning(false)
    }, 3000)
  }

  const stopScan = () => {
    setIsScanning(false)
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Scan stopped by user.`])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Scan className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Port Scanner</h1>
          <p className="text-gray-400">Discover open ports and running services</p>
        </div>
      </div>

      <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">Legal Warning</span>
        </div>
        <p className="text-gray-300 text-sm">
          Only scan systems you own or have explicit permission to test. Unauthorized port scanning may be illegal in
          your jurisdiction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Scan Configuration</CardTitle>
            <CardDescription className="text-gray-400">Configure your port scanning parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">
                Target IP/Domain
              </Label>
              <Input
                id="target"
                placeholder="192.168.1.1 or example.com"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ports" className="text-gray-300">
                Port Range
              </Label>
              <Input
                id="ports"
                placeholder="1-1000 or 80,443,22"
                value={portRange}
                onChange={(e) => setPortRange(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex gap-2 pt-4">
              {!isScanning ? (
                <Button onClick={startScan} disabled={!target} className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Start Scan
                </Button>
              ) : (
                <Button onClick={stopScan} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  Stop Scan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Scan Logs</CardTitle>
            <CardDescription className="text-gray-400">Real-time scanning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={logs.join("\n")}
              readOnly
              className="bg-gray-800 border-gray-600 text-green-400 font-mono text-sm min-h-[200px] resize-none"
              placeholder="Scan logs will appear here..."
            />
          </CardContent>
        </Card>
      </div>

      {results.length > 0 && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Scan Results</CardTitle>
            <CardDescription className="text-gray-400">Discovered ports and services</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Port</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Service</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="text-white font-mono">{result.port}</TableCell>
                    <TableCell>
                      <Badge
                        variant={result.status === "Open" ? "default" : "secondary"}
                        className={result.status === "Open" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}
                      >
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{result.service}</TableCell>
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
