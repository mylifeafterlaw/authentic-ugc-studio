import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { loading, user, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <h1 className="font-heading text-2xl text-foreground">Not authorised</h1>
        <p className="text-muted-foreground max-w-sm">
          Your account doesn't have admin access. Sign in with the owner account to view enquiries.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
