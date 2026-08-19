/**
 * Outlined glyphs for the contact channels, drawn on the same 24×24 grid and
 * 1.6 stroke as ServiceIcon so the two icon sets sit at one optical weight.
 */
const paths = {
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.34 5.14a2 2 0 0 0 2.32 0L20.5 7" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  chat: (
    <>
      <path d="M21 11.5a8.1 8.1 0 0 1-11.9 7.2L3.5 20.5l1.8-5.6A8.1 8.1 0 1 1 21 11.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </>
  ),
};

export default function ContactIcon({ name, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.mail}
    </svg>
  );
}
