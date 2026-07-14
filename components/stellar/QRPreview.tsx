interface QRPreviewProps {
  dataUrl: string;
}

export function QRPreview({ dataUrl }: QRPreviewProps) {
  return (
    <div className="rounded-lg border border-white/85 bg-white/78 p-4 shadow-[4px_4px_0_rgba(199,185,243,0.24)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dataUrl} alt="Generated Stellar payment QR code" className="mx-auto h-56 w-56" />
    </div>
  );
}
