// ⚠️ TEMPORARY — throwaway backend connection test. Remove after confirming writes work.
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ConnectionTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runTest = async () => {
    setLoading(true);
    setResult(null);

    // 1. Insert one row
    const { error: insertError } = await supabase
      .from("connection_test")
      .insert({ note: "test write from site" });

    if (insertError) {
      toast.error("Insert failed");
      setResult(`❌ Insert failed: ${insertError.message}`);
      setLoading(false);
      return;
    }

    toast.success("Row written to the database");

    // 2. Try to read back — expected to fail / return nothing (insert-only)
    const { data, error: readError } = await supabase
      .from("connection_test")
      .select("*")
      .limit(1);

    const readMsg = readError
      ? `🔒 Read blocked as expected: ${readError.message}`
      : data && data.length > 0
        ? `⚠️ Unexpected: read returned ${data.length} row(s)`
        : "🔒 Read returned no rows (public key cannot read) — correct";

    setResult(`✅ Insert succeeded.\n${readMsg}`);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs rounded-lg border bg-background p-4 shadow-lg">
      <p className="mb-2 text-xs font-semibold text-muted-foreground">
        TEMP: backend connection test
      </p>
      <Button size="sm" onClick={runTest} disabled={loading}>
        {loading ? "Running…" : "Run connection test"}
      </Button>
      {result && (
        <pre className="mt-2 whitespace-pre-wrap text-xs text-muted-foreground">
          {result}
        </pre>
      )}
    </div>
  );
};

export default ConnectionTest;
