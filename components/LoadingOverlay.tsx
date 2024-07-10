import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({
  message = "Loading...",
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
      <div className="flex flex-col items-center justify-center">
        <LoadingSpinner size={48} className="mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
