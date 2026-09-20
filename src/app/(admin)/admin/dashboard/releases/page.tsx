import { Package } from 'lucide-react';
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
            <Package className="w-6 h-6 text-[#B38D46]" />
            <span>Android APK Release Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Upload new .apk builds, adjust changelog notes, and toggle public release status.
          </p>
        </div>

        <ReleaseDialog />
      </div>

      {/* Table */}
      <ReleaseTableClient initialReleases={releases} />
    </div>
  );
}
