export function Sparkle({ size = 13, color = "#a9b8ff" }: { size?: number; color?: string }) {
  return (
    <svg className="sparkle" aria-hidden="true" width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2C12.8 8 16 11.2 22 12C16 12.8 12.8 16 12 22C11.2 16 8 12.8 2 12C8 11.2 11.2 8 12 2Z" fill={color} />
    </svg>
  );
}
