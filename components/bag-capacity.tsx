import { Glasses, KeyRound, Smartphone, Wallet, type LucideIcon } from "lucide-react";

const knownItems: { match: RegExp; icon: LucideIcon }[] = [
  { match: /telefon/i, icon: Smartphone },
  { match: /cüzdan|kartlık/i, icon: Wallet },
  { match: /anahtar/i, icon: KeyRound },
  { match: /gözlük/i, icon: Glasses }
];

type BagCapacityProps = {
  /** Verified items that fit this model. Rendered only when at least one item is confirmed. */
  fits?: string[];
  /** Free-text note written by Arzu in Studio after testing the bag. */
  note?: string;
};

/**
 * "Bu çantaya neler sığar?" — shown only when the model has verified capacity information.
 * Dimensions alone are not enough to claim an item fits, so nothing is inferred here.
 */
export function BagCapacity({ fits, note }: BagCapacityProps) {
  const items = (fits ?? []).map((item) => item.trim()).filter(Boolean);
  if (!items.length && !note?.trim()) return null;

  return (
    <section aria-labelledby="kapasite-baslik" className="rounded-lg border border-burgundy/10 bg-cream/70 p-5 sm:p-6">
      <h2 id="kapasite-baslik" className="font-serif text-2xl text-charcoal">Bu çantaya neler sığar?</h2>
      {items.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => {
            const Icon = knownItems.find(({ match }) => match.test(item))?.icon;
            return (
              <li key={item} className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-ivory px-3 py-1.5 text-sm text-charcoal/85">
                {Icon && <Icon aria-hidden="true" className="h-4 w-4 text-burgundy" />}
                {item}
              </li>
            );
          })}
        </ul>
      )}
      {note?.trim() && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-charcoal/75">{note}</p>}
      <p className="mt-3 text-xs leading-5 text-charcoal/55">Bu bilgiler modelin kendisiyle denenerek hazırlanmıştır.</p>
    </section>
  );
}
