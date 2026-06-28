import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Loader2, LogOut, RefreshCw, Mail, Inbox } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  brand: string | null;
  message: string;
  created_at: string;
}

interface EmailLog {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

const statusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  if (status === "sent") return "default";
  if (["dlq", "failed", "bounced", "complained"].includes(status)) return "destructive";
  if (status === "suppressed") return "secondary";
  return "outline";
};

const dedupeByMessageId = (rows: EmailLog[]) => {
  const seen = new Map<string, EmailLog>();
  for (const row of rows) {
    const key = row.message_id ?? row.id;
    if (!seen.has(key)) seen.set(key, row);
  }
  return Array.from(seen.values());
};

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [enqRes, emailRes] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100),
      supabase
        .from("email_send_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(300),
    ]);
    if (enqRes.error) toast.error("Could not load enquiries");
    else setEnquiries(enqRes.data as Enquiry[]);
    if (emailRes.error) toast.error("Could not load email status");
    else setEmails(dedupeByMessageId(emailRes.data as EmailLog[]));
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="font-heading text-2xl text-foreground">Enquiries Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={loading ? "animate-spin" : ""} /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 space-y-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Inbox className="text-primary" size={20} />
                <h2 className="font-heading text-xl text-foreground">
                  Recent Enquiries
                  <span className="text-muted-foreground text-base ml-2">({enquiries.length})</span>
                </h2>
              </div>
              {enquiries.length === 0 ? (
                <p className="text-muted-foreground">No enquiries yet.</p>
              ) : (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="whitespace-nowrap">Received</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enquiries.map((e) => (
                        <TableRow key={e.id}>
                          <TableCell className="font-medium">{e.name}</TableCell>
                          <TableCell>
                            <a href={`mailto:${e.email}`} className="text-primary hover:underline">
                              {e.email}
                            </a>
                          </TableCell>
                          <TableCell>{e.brand || "—"}</TableCell>
                          <TableCell className="max-w-md">
                            <span className="line-clamp-3 whitespace-pre-wrap">{e.message}</span>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">
                            {formatDistanceToNow(new Date(e.created_at), { addSuffix: true })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="text-primary" size={20} />
                <h2 className="font-heading text-xl text-foreground">
                  Email Delivery Status
                  <span className="text-muted-foreground text-base ml-2">({emails.length})</span>
                </h2>
              </div>
              {emails.length === 0 ? (
                <p className="text-muted-foreground">No emails have been sent yet.</p>
              ) : (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Error</TableHead>
                        <TableHead className="whitespace-nowrap">When</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {emails.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="whitespace-nowrap">{m.template_name}</TableCell>
                          <TableCell>{m.recipient_email}</TableCell>
                          <TableCell>
                            <Badge variant={statusVariant(m.status)}>{m.status}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs text-destructive text-sm">
                            {m.error_message ? (
                              <span className="line-clamp-2">{m.error_message}</span>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">
                            {formatDistanceToNow(new Date(m.created_at), { addSuffix: true })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default AdminPage;
