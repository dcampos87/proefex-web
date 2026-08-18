import { AppShell } from "@/components/layouts/AppShell";
import { AdminOverview } from "@/features/admin/AdminOverview";

export default function AdminPage() {
  return (
    <AppShell admin>
      <AdminOverview />
    </AppShell>
  );
}
