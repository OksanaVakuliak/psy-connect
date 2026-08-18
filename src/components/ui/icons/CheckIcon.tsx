interface CheckIconProps {
  className?: string;
}

export function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      className={className}
      width={10}
      height={8}
      viewBox="0 0 10 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.325 7.01458L0 3.68958L0.83125 2.85833L3.325 5.35208L8.67708 0L9.50833 0.83125L3.325 7.01458Z" />
    </svg>
  );
}
