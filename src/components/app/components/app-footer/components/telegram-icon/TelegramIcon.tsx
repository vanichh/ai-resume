import type { TelegramIconProps } from './types';

export const TelegramIcon = ({ className }: TelegramIconProps) => {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8 4.3 3.9 10.8c-1.1.4-1.1 1.1-.2 1.4l4.3 1.3 1.7 5.1c.2.5.3.7.6.7s.5-.1.8-.4l2.4-2.3 4.9 3.6c.9.5 1.5.3 1.7-.8L23 5.5c.3-1.2-.5-1.7-2.2-1.2Zm-2.7 3.2-8.2 7.4-.3 3-1.2-4.2 9.1-5.8c.4-.3.8-.6.6-.4Z"
        fill="currentColor"
      />
    </svg>
  );
};
