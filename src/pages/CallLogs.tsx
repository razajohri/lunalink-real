import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useVapi } from "@/contexts/VapiContext";
import { VapiCall } from "@/services/VapiService";
import { Search, Download, Eye, Filter } from "lucide-react";
import Layout from "@/components/Layout";

const CallLogs = () => {
  const { service, isConfigured, credentials } = useVapi();
  const [calls, setCalls] = useState<VapiCall[]>([]);
  const [filteredCalls, setFilteredCalls] = useState<VapiCall[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  const fetchCalls = async () => {
    if (!service || !isConfigured || !credentials?.assistantId) return;

    setLoading(true);
    try {
      const callsData = await service.getCalls(credentials.assistantId);
      setCalls(callsData);
      setFilteredCalls(callsData);
    } catch (error) {
      console.error('Error fetching calls:', error);
      // Use mock data on error
      const mockCalls = service.getMockCalls();
      setCalls(mockCalls);
      setFilteredCalls(mockCalls);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [service, isConfigured, credentials]);

  // Filter calls based on search and status
  useEffect(() => {
    let filtered = calls;

    if (searchTerm) {
      filtered = filtered.filter(call =>
        call.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.customer?.number?.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(call => call.status === statusFilter);
    }

    setFilteredCalls(filtered);
  }, [calls, searchTerm, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'failed': return 'destructive';
      case 'in-progress': return 'secondary';
      default: return 'secondary';
    }
  };

  if (!isConfigured) {
    return (
      <Layout>
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Call Logs</h1>
            <p className="text-muted-foreground">
              Configure your integration to view call logs.
            </p>
          </div>
          <Card className="p-8 max-w-md mx-auto">
            <Button asChild>
              <a href="/settings">Configure Now</a>
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Call Logs</h1>
            <p className="text-muted-foreground">
              View detailed history of all voice agent calls and interactions.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={fetchCalls} disabled={loading}>
              <Filter className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name or phone number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Call Logs Table */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Call History ({filteredCalls.length} calls)
              </h3>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading call logs...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCalls.map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">
                            {call.customer?.name || 'Unknown Customer'}
                          </p>
                          <Badge variant={getStatusColor(call.status)}>
                            {call.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {call.customer?.number} • {formatDate(call.startedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium">
                          {call.duration ? service?.formatDuration(call.duration) : 'N/A'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {call.cost ? service?.formatCurrency(call.cost) : 'N/A'}
                        </p>
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Agent: {call.assistantId}
                        </p>
                      </div>

                      {call.transcript && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Transcript
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Call Transcript</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Customer: {call.customer?.name || 'Unknown'}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(call.startedAt)} • Duration: {service?.formatDuration(call.duration || 0)}
                                </p>
                              </div>
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <p className="text-sm leading-relaxed">
                                  {call.transcript}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ))}

                {filteredCalls.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== "all"
                        ? "No calls match your filters."
                        : "No call logs available yet."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CallLogs;
