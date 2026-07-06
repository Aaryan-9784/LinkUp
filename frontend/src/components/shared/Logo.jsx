export default function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect x="6" y="6" width="108" height="108" rx="28" fill="#3b82f6" />

      {/* Chain link left */}
      <rect x="18" y="44" width="38" height="32" rx="16" fill="none" stroke="#ffffff" strokeWidth="9" />

      {/* Chain link right */}
      <rect x="64" y="44" width="38" height="32" rx="16" fill="none" stroke="#ffffff" strokeWidth="9" />

      {/* Overlap connector — white fill to show interlocking */}
      <rect x="55" y="51" width="10" height="18" fill="#3b82f6" />
    </svg>
  );
}
