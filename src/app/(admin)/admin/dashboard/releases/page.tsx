import { Package, Plus } from 'lucide-react';
import { getAllReleases } from '@/lib/actions/release-actions';
import { ReleaseDialog } from '@/components/admin/release-dialog';
import { ReleaseTableClient } from './release-table-client';

export const dynamic = 'force-dynamic';

export default async function AdminReleasesPage() {
  const releases = await getAllReleases();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Package className="w-6 h-6 text-cyan-400" />
            <span>Manajemen Rilis APK Android</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Unggah paket instalasi .apk baru, sesuaikan catatan changelog, dan kontrol status publikasi rilis.
          </p>
        </div>

        <ReleaseDialog />
      </div>

      {/* Table */}
      <ReleaseTableClient initialReleases={releases} />
    </div>
  );
}
