interface ChevronDownIconProps {
  className?: string;
}

export function ChevronDownIcon({ className }: ChevronDownIconProps) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7.2002 9.6001L12.0002 14.4001L16.8002 9.6001"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
