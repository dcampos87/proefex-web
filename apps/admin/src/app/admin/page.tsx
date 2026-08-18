import { AppShell } from "@proefex/shared/layouts/AppShell";
import { AdminOverview } from "@/features/admin/AdminOverview";

export default function AdminPage() {
  return (
    <AppShell admin>
      <AdminOverview />
    </AppShell>
  );
}
