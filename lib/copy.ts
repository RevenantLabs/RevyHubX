export async function copyText(value: string) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard access is not available in this browser.");
  }

  await navigator.clipboard.writeText(value);
}
