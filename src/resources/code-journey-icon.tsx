import type { IconBaseProps } from "react-icons/lib";

// The Code Journey mark (the "cj" line from codejourney.space). Uses currentColor so it follows the theme.
export function CodeJourneyIcon({ size = "1em", color, className, style }: IconBaseProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" color={color} className={className} style={style} aria-hidden="true">
      <g transform="translate(1 0)">
        <path
          d="M29 25.88A14 14 0 1 0 22 52L42 52A8 8 0 0 0 50 44L50 18"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="29" cy="25.88" r="5" stroke="currentColor" strokeWidth="3.4" />
        <circle cx="50" cy="14" r="7" fill="#FF6E42" />
      </g>
    </svg>
  );
}
