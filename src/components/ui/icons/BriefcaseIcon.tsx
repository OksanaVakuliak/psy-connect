interface BriefcaseIconProps {
  className?: string;
}

export function BriefcaseIcon({ className }: BriefcaseIconProps) {
  return (
    <svg
      className={className}
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 2C9.29 2 9.525 2.1 9.71 2.295C9.9 2.5 10 2.725 10 3V8.5C10 8.775 9.9 9 9.71 9.205C9.525 9.4 9.29 9.5 9 9.5H1C0.71 9.5 0.475 9.4 0.29 9.205C0.1 9 0 8.775 0 8.5V3C0 2.725 0.1 2.5 0.29 2.295C0.475 2.1 0.71 2 1 2H3V1C3 0.71 3.1 0.475 3.29 0.29C3.475 0.1 3.71 0 4 0H6C6.29 0 6.525 0.1 6.71 0.29C6.9 0.475 7 0.71 7 1V2H9ZM1 3V8.5H9V3H1ZM6 2V1H4V2H6Z" />
    </svg>
  );
}
