interface QRPreviewProps {
  dataUrl: string;
}

export function QRPreview({ dataUrl }: QRPreviewProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dataUrl} alt="Generated Stellar payment QR code" className="mx-auto h-56 w-56" />
    </div>
  );
}
