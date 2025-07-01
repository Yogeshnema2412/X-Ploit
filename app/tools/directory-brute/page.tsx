"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderSearch, Play, Square, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DirectoryBrute() {
  const [target, setTarget] = useState("")
  const [wordlist, setWordlist] = useState("common")
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [results, setResults] = useState<Array<{ path: string; status: number; size: string }>>([])

  const startScan = () => {
    if (!target) return

    setIsScanning(true)
    setLogs([])
    setResults([])

    const newLogs = [
      `Starting directory brute force on ${target}`,
      `Using wordlist: ${wordlist}`,
      `Scanning directories...`,
    ]

    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`])
      }, index * 500)
    })

    // Simulate results
    setTimeout(() => {
      const mockResults = [
        { path: "/admin", status: 200, size: "2.1KB" },
        { path: "/login", status: 200, size: "1.8KB" },
        { path: "/backup", status: 403, size: "0KB" },
        { path: "/config", status: 301, size: "0KB" },
        { path: "/uploads", status: 200, size: "4.2KB" },
      ]
      setResults(mockResults)
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Scan completed. Found ${mockResults.length} directories.`,
      ])
      setIsScanning(false)
    }, 4000)
  }

  const stopScan = () => {
    setIsScanning(false)
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Scan stopped by user.`])
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-600"
    if (status >= 300 && status < 400) return "bg-yellow-600"
    if (status >= 400 && status < 500) return "bg-red-600"
    return "bg-gray-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FolderSearch className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">Directory Brute Forcer</h1>
          <p className="text-gray-400">Discover hidden directories and files</p>
        </div>
      </div>

      <div className="bg-yellow-950/20 border border-yellow-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">Legal Warning</span>
        </div>
        <p className="text-gray-300 text-sm">
          Only perform directory enumeration on websites you own or have explicit permission to test.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Scan Configuration</CardTitle>
            <CardDescription className="text-gray-400">Configure directory brute force parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">
                Target URL
              </Label>
              <Input
                id="target"
                placeholder="https://example.com"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wordlist" className="text-gray-300">
                Wordlist
              </Label>
              <Select value={wordlist} onValueChange={setWordlist}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="common">Common Directories</SelectItem>
                  <SelectItem value="medium">Medium Wordlist</SelectItem>
                  <SelectItem value="large">Large Wordlist</SelectItem>
                  <SelectItem value="custom">Custom Wordlist</SelectItem>
                </SelectContent>
              </Select>
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
            <CardTitle className="text-white">Discovered Directories</CardTitle>
            <CardDescription className="text-gray-400">Found directories and their response codes</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Path</TableHead>
                  <TableHead className="text-gray-300">Status Code</TableHead>
                  <TableHead className="text-gray-300">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="text-white font-mono">{result.path}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(result.status)} text-white`}>{result.status}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{result.size}</TableCell>
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
