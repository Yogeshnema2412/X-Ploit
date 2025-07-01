"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, Square, AlertTriangle, Globe, Server, Mail } from "lucide-react"

export default function OSINTLookup() {
  const [target, setTarget] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [domainInfo, setDomainInfo] = useState<any>(null)
  const [whoisData, setWhoisData] = useState<any>(null)
  const [dnsRecords, setDnsRecords] = useState<any[]>([])

  const startLookup = () => {
    if (!target) return

    setIsScanning(true)
    setLogs([])
    setDomainInfo(null)
    setWhoisData(null)
    setDnsRecords([])

    const newLogs = [
      `Starting OSINT lookup for ${target}`,
      `Gathering domain information...`,
      `Performing WHOIS lookup...`,
      `Collecting DNS records...`,
      `Checking subdomain information...`,
    ]

    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`])
      }, index * 800)
    })

    // Simulate gathering information
    setTimeout(() => {
      setDomainInfo({
        domain: target,
        registrar: "Example Registrar Inc.",
        creationDate: "2020-01-15",
        expirationDate: "2025-01-15",
        status: "Active",
        nameservers: ["ns1.example.com", "ns2.example.com"],
      })
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Domain information collected`])
    }, 3000)

    setTimeout(() => {
      setWhoisData({
        registrant: "Privacy Protected",
        organization: "Example Corp",
        country: "United States",
        email: "admin@example.com",
        phone: "+1.5551234567",
      })
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] WHOIS data retrieved`])
    }, 4000)

    setTimeout(() => {
      setDnsRecords([
        { type: "A", name: target, value: "192.168.1.100", ttl: "3600" },
        { type: "MX", name: target, value: "mail.example.com", ttl: "3600" },
        { type: "NS", name: target, value: "ns1.example.com", ttl: "86400" },
        { type: "TXT", name: target, value: "v=spf1 include:_spf.google.com ~all", ttl: "3600" },
      ])
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] DNS records collected`])
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] OSINT lookup completed successfully`])
      setIsScanning(false)
    }, 5000)
  }

  const stopLookup = () => {
    setIsScanning(false)
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] OSINT lookup stopped by user.`])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="w-8 h-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-bold text-white">OSINT Lookup</h1>
          <p className="text-gray-400">Gather open source intelligence on domains</p>
        </div>
      </div>

      <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-semibold">Information Notice</span>
        </div>
        <p className="text-gray-300 text-sm">
          OSINT gathering uses publicly available information. Always respect privacy and terms of service when
          collecting intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Lookup Configuration</CardTitle>
            <CardDescription className="text-gray-400">Configure OSINT gathering parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target" className="text-gray-300">
                Target Domain
              </Label>
              <Input
                id="target"
                placeholder="example.com"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex gap-2 pt-4">
              {!isScanning ? (
                <Button onClick={startLookup} disabled={!target} className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Start Lookup
                </Button>
              ) : (
                <Button onClick={stopLookup} variant="destructive">
                  <Square className="w-4 h-4 mr-2" />
                  Stop Lookup
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Lookup Logs</CardTitle>
            <CardDescription className="text-gray-400">Real-time OSINT gathering progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={logs.join("\n")}
              readOnly
              className="bg-gray-800 border-gray-600 text-green-400 font-mono text-sm min-h-[200px] resize-none"
              placeholder="Lookup logs will appear here..."
            />
          </CardContent>
        </Card>
      </div>

      {(domainInfo || whoisData || dnsRecords.length > 0) && (
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Intelligence Results</CardTitle>
            <CardDescription className="text-gray-400">Gathered information about the target domain</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="domain" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="domain" className="data-[state=active]:bg-red-600">
                  <Globe className="w-4 h-4 mr-2" />
                  Domain Info
                </TabsTrigger>
                <TabsTrigger value="whois" className="data-[state=active]:bg-red-600">
                  <Server className="w-4 h-4 mr-2" />
                  WHOIS Data
                </TabsTrigger>
                <TabsTrigger value="dns" className="data-[state=active]:bg-red-600">
                  <Mail className="w-4 h-4 mr-2" />
                  DNS Records
                </TabsTrigger>
              </TabsList>

              <TabsContent value="domain" className="mt-4">
                {domainInfo && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400 text-sm">Domain:</span>
                        <p className="text-white font-mono">{domainInfo.domain}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Status:</span>
                        <Badge className="ml-2 bg-green-600">{domainInfo.status}</Badge>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Registrar:</span>
                        <p className="text-white">{domainInfo.registrar}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Creation Date:</span>
                        <p className="text-white">{domainInfo.creationDate}</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="whois" className="mt-4">
                {whoisData && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400 text-sm">Registrant:</span>
                        <p className="text-white">{whoisData.registrant}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Organization:</span>
                        <p className="text-white">{whoisData.organization}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Country:</span>
                        <p className="text-white">{whoisData.country}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Email:</span>
                        <p className="text-white font-mono">{whoisData.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="dns" className="mt-4">
                {dnsRecords.length > 0 && (
                  <div className="space-y-2">
                    {dnsRecords.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {record.type}
                          </Badge>
                          <span className="text-white font-mono">{record.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-mono text-sm">{record.value}</p>
                          <p className="text-gray-400 text-xs">TTL: {record.ttl}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
