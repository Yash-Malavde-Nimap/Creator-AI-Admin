import { type ReactElement } from 'react';
import styles from './SocialPlatformCard.module.scss';

type Platform = 'instagram' | 'facebook' | 'threads' | 'linkedin' | 'x';

interface SocialPlatformCardProps {
  platform: Platform;
  count: number;
}

function InstagramIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="108%" r="135%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="10%" stopColor="#fd5949" />
          <stop offset="50%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="44" height="44" rx="12" fill="url(#ig-grad)" />
      <rect x="12" y="12" width="20" height="20" rx="6" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="22" cy="22" r="5.5" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="29.5" cy="14.5" r="1.5" fill="white" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="#1877F2" />
      <path
        d="M25.5 14.5h-2.5a1.5 1.5 0 0 0-1.5 1.5v2.5h-2.5v3.5H21.5V31h3.5V22h2.5l.5-3.5H25V16.5a.5.5 0 0 1 .5-.5H28V14h-2.5z"
        fill="white"
      />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="#000000" />
      <path
        d="M28.5 21.5c-.3-1.8-1.5-3.2-3.5-3.8-1-.3-2.1-.4-3-.2-2.2.5-3.5 2.3-3.5 4.5s1.5 3.8 3.5 4c1.2.2 2.5-.1 3.5-.8"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 15.5c1.5 2.5 2 5 1 8s-3.5 5.5-3.5 5.5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="22" cy="22" r="1.2" fill="white" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="10" fill="#0A66C2" />
      <rect x="14" y="19" width="4" height="11" fill="white" />
      <circle cx="16" cy="16" r="2.2" fill="white" />
      <path
        d="M22 19h3.5v1.5c.6-1 1.8-1.7 3.2-1.5v4c-1.8-.3-3.2.4-3.2 3V30H22V19z"
        fill="white"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="22" fill="#000000" />
      <path
        d="M24.5 20.5L30 14h-2.5l-4.8 5.5L18.5 14H13l6.5 9.5L13 31h2.5l5.5-6.5L25.5 31H31L24.5 20.5z"
        fill="white"
      />
    </svg>
  );
}

const platformConfig: Record<Platform, { label: string; icon: ReactElement }> = {
  instagram: { label: 'Instagram', icon: <InstagramIcon /> },
  facebook: { label: 'Facebook', icon: <FacebookIcon /> },
  threads: { label: 'Threads', icon: <ThreadsIcon /> },
  linkedin: { label: 'LinkedIN', icon: <LinkedInIcon /> },
  x: { label: 'X', icon: <XIcon /> },
};

export default function SocialPlatformCard({ platform, count }: SocialPlatformCardProps) {
  const { label, icon } = platformConfig[platform];
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.count}>{count.toLocaleString()}</div>
    </div>
  );
}
