import type { ProjectIconProps } from './types';

export const ProjectIcon = ({ className }: ProjectIconProps) => {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 3.75h7.25L18 7.5v12.75H7z" fill="currentColor" opacity="0.16" />
      <path
        d="M7 3.75h7.25L18 7.5v12.75H7zM14.25 3.75V7.5H18M9.4 10.25h6.1M9.4 13h6.1M9.4 15.75h3.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
      <path d="m16.5 14.7.5 1.05 1.15.18-.82.82.2 1.15-1.03-.54-1.03.54.2-1.15-.82-.82 1.15-.18z" fill="currentColor" />
    </svg>
  );
};
