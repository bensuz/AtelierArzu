import { whatsappUrl } from "@/lib/site";

type WhatsAppButtonProps = {
  label?: string;
  message: string;
  className?: string;
  variant?: "primary" | "light";
};

export function WhatsAppButton({ label = "WhatsApp’tan yazın", message, className = "", variant = "primary" }: WhatsAppButtonProps) {
  const href = whatsappUrl(message);
  const base = variant === "light" ? "btn-light" : "btn-primary";
  const content = (
    <>
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </>
  );

  return href ? (
    <a href={href} className={`${base} ${className}`}>
      {content}
    </a>
  ) : (
    <button
      type="button"
      disabled
      title="WhatsApp numarası henüz tanımlı değil"
      className={`${base} cursor-not-allowed opacity-60 ${className}`}
    >
      {content}
    </button>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.7 19.4 5.8 16A7.8 7.8 0 1 1 8 18.1l-3.3 1.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.4c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.6 1 1.4 1.8 2.5 2.4l.5-.4c.2-.2.5-.2.7-.1l1.5.7c.3.1.4.3.4.6v.5c0 .3-.1.6-.4.8-.5.4-1.2.6-1.9.5-3.1-.5-5.6-3-6.2-6.1-.1-.7.1-1.3.5-1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
