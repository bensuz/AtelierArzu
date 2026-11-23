const tryFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export function parseTryPrice(amount: number | null | undefined, legacyPrice?: string) {
  if (typeof amount === "number" && Number.isFinite(amount) && amount > 0) return amount;

  const text = legacyPrice?.trim().replace(/^(?:₺|TRY|TL)\s*|\s*(?:₺|TRY|TL)$/gi, "").trim();
  if (!text) return undefined;

  let normalized: string;
  if (/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(text)) {
    normalized = text.replace(/\./g, "").replace(",", ".");
  } else if (/^(?:\d+(?:\.\d{1,2})|\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?)$/.test(text)) {
    normalized = text.replace(/,/g, "");
  } else {
    return undefined;
  }
  const price = Number(normalized);
  return Number.isFinite(price) && price > 0 ? price : undefined;
}

export function formatTryPrice(amount: number) {
  return tryFormatter.format(amount);
}
