"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Database, Play, Square, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SQLInjection() {
  const [target, setTarget] = useState("")
  const [parameter, setParameter] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [results, setResults] = useState<Array<{ payload: string; response: string; vulnerable: boolean }>>([])

  const startScan = () => {
    if (!target) return

    setIsScanning(true)
    setLogs([])
    setResults([])

    const newLogs = [
      `Starting SQL injection scan on ${target}`,
      `Testing parameter: ${parameter || "auto-detected"}`,
      `Loading SQL injection payloads...`,
      `Testing for vulnerabilities...`,
    ]

    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`])
      }, index * 500)
    })

    // Simulate testing different payloads
    const payloads = [
      { payload: "' OR '1'='1", response: "Normal response", vulnerable: false },
      { payload: "' UNION SELECT NULL--", response: "Error: syntax error", vulnerable: false },
      { payload: "'; DROP TABLE users--", response: "Database error", vulnerable: true },
      { payload: "' AND 1=1--", response: "SQL syntax error", vulnerable: true },
    ]

    payloads.forEach((test, index) => {
      setTimeout(
        () => {
          setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Testing payload: ${test.payload}`])
          setResults((prev) => [...prev, test])

          if (test.vulnerable) {
            setLogs((prev) => [
              ...prev,
              `[${new Date().toLocaleTimeString()}] ⚠️ Potential SQL injection vulnerability detected!`,
            ])
          }
        },
        (index + 4) * 1000,
      )
    })

    setTimeout(() => {
      const vulnerableCount = payloads.filter((p) => p.vulnerable).length
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Scan completed. Found ${vulnerableCount} potential vulnerabilities.`,
      ])
      setIsScanning(false)
    }, 8000)
  }

  const stopScan = () => {
    setIsScanning(false)
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] SQL injection scan stopped by user.`])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Database className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">SQL Injection Scanner</h1>
          <p className="text-gray-400">Detect SQL injection vulnerabilities</p>
        </div>
      </div>

      <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold">Legal Warning</span>
        </div>
        <p className="text-gray-300 text-sm">
          SQL injection testing should only be performed on applications you own or have explicit permission to test.
          Unauthorized testing may cause data loss or system damage and is illegal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Scan Configuration</CardTitle>
            <CardDescription className="text-gray-400">Configure SQL injection testing parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">
                Target URL
              </Label>
              <Input
                id="target"
                placeholder="https://example.com/search?q=test"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parameter" className="text-gray-300">
                Parameter (optional)
              </Label>
              <Input
                id="parameter"
                placeholder="id, search, etc."
                value={parameter}
                onChange={(e) => setParameter(e.target.value)}
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
            <CardDescription className="text-gray-400">Real-time vulnerability testing progress</CardDescription>
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
            <CardTitle className="text-white">Vulnerability Results</CardTitle>
            <CardDescription className="text-gray-400">SQL injection payload test results</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Payload</TableHead>
                  <TableHead className="text-gray-300">Response</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="text-white font-mono text-sm">{result.payload}</TableCell>
                    <TableCell className="text-gray-300 text-sm">{result.response}</TableCell>
                    <TableCell>
                      <Badge
                        variant={result.vulnerable ? "destructive" : "secondary"}
                        className={result.vulnerable ? "bg-red-600 text-white" : "bg-green-600 text-white"}
                      >
                        {result.vulnerable ? "Vulnerable" : "Safe"}
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
