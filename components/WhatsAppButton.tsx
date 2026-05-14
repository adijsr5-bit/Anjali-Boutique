type WhatsAppButtonProps = {
  whatsappNumber: string;
};

export default function WhatsAppButton({ whatsappNumber }: WhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-[#1da851] md:bottom-8 md:right-8"
      aria-label="Chat on WhatsApp"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#128C7E]">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.15-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.922-2.21-.242-.58-.487-.5-.672-.51-.173-.01-.372-.01-.571-.01-.198 0-.52.075-.792.372-.273.297-1.04 1.015-1.04 2.475 0 1.462 1.063 2.875 1.211 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12.004 2.004c-5.52 0-9.998 4.476-9.998 9.998 0 1.758.456 3.472 1.322 4.966l-1.396 5.082 5.210-1.37c1.447.794 3.084 1.214 4.862 1.214 5.522 0 9.999-4.478 9.999-9.999 0-5.52-4.477-9.998-9.999-9.998zm0 18.063c-1.533 0-3.033-.411-4.335-1.188l-.31-.186-3.093.813.827-3.014-.201-.316c-.853-1.346-1.301-2.94-1.301-4.548 0-4.42 3.585-8.006 8.006-8.006 4.42 0 8.005 3.586 8.005 8.006 0 4.42-3.585 8.006-8.005 8.006z" />
        </svg>
      </span>
      Chat on WhatsApp
    </a>
  );
}
