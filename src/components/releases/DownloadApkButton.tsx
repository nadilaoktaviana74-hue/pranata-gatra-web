'use client';

import React from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Release } from '@/types/database';

interface DownloadApkButtonProps {
  release?: Release | null;
  className?: string;
  customLabel?: string;
  fallbackText?: string;
  showIcon?: boolean;
  disabledIfMissing?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function DownloadApkButton({
  release,
  className = '',
  customLabel,
  fallbackText = 'Download APK',
  showIcon = true,
  disabledIfMissing = false,
  size = 'md',
}: DownloadApkButtonProps) {
  // Prioritize file_path or download_url from latest release
  const downloadUrl = release?.file_path || release?.download_url;
  const hasValidUrl = Boolean(downloadUrl && downloadUrl.trim().length > 0);

  // Dynamic version binding: e.g., "Download APK (1.0.1)"
  const buttonLabel = customLabel
    ? customLabel
    : release?.version
    ? `Download APK (${release.version})`
    : fallbackText;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!hasValidUrl) {
      e.preventDefault();
      toast.error(
        release
          ? `APK download is not yet available for v${release.version}.`
          : 'No published APK release package is available at this time.',
        {
          description: 'Please check back shortly or visit the changelog for release updates.',
        }
      );
      return;
    }

    toast.success(
      `Downloading Pranata Gatra APK (${release?.version ? release.version : 'latest'})...`,
      {
        description: 'Your download should begin automatically.',
      }
    );
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // If a valid APK link exists, render an accessible anchor with download attribute
  if (hasValidUrl) {
    return (
      <a
        href={downloadUrl!}
        download
        onClick={handleClick}
        className={className}
        title={`Download Pranata Gatra APK ${release?.version ? `v${release.version}` : ''}`}
        aria-label={buttonLabel}
      >
        {showIcon && <Download className={iconSizes[size]} />}
        <span>{buttonLabel}</span>
      </a>
    );
  }

  // Fallback state when release does not yet have a valid download URL
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabledIfMissing}
      className={`${className} ${
        disabledIfMissing ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      }`}
      title={release?.version ? `APK for v${release.version} is not yet available` : 'No APK available'}
      aria-label={buttonLabel}
    >
      {showIcon && (
        disabledIfMissing ? (
          <AlertCircle className={iconSizes[size]} />
        ) : (
          <Download className={iconSizes[size]} />
        )
      )}
      <span>{buttonLabel}</span>
    </button>
  );
}

export default DownloadApkButton;
