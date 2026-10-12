export default function BackgroundCrosshair() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Mask punches a circle gap at center */}
          <mask id="chMask">
            <rect width="100%" height="100%" fill="white" />
            <circle cx="50%" cy="50%" r="36" fill="black" />
          </mask>
        </defs>

        {/* X shape — two diagonal lines, extending 25%–75% of viewport */}
        <g mask="url(#chMask)">
          <line
            x1="25%" y1="25%" x2="75%" y2="75%"
            stroke="#cc1111" strokeWidth="1.5" opacity="0.18"
          />
          <line
            x1="75%" y1="25%" x2="25%" y2="75%"
            stroke="#cc1111" strokeWidth="1.5" opacity="0.18"
          />
        </g>

        {/* Outer ring — 50% of previous r=160 */}
        <circle
          cx="50%" cy="50%" r="80"
          stroke="#cc1111" strokeWidth="0.75" fill="none" opacity="0.07"
        />
        {/* Inner ring — 50% of previous r=36 */}
        <circle
          cx="50%" cy="50%" r="18"
          stroke="#cc1111" strokeWidth="1" fill="none" opacity="0.13"
        />
        {/* Center dot */}
        <circle
          cx="50%" cy="50%" r="2"
          fill="#cc1111" opacity="0.22"
        />
      </svg>
    </div>
  );
}
