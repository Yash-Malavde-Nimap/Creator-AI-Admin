import styles from './Avatar.module.scss';

interface AvatarProps {
  content: string;
  className?: string;
}

export default function Avatar({ content, className }: Readonly<AvatarProps>) {
  return (
    <div
      className={[styles.avatar, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {content}
    </div>
  );
}
