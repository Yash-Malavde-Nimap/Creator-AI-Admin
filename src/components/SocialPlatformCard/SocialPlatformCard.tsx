import { type ReactElement } from "react";
import styles from "./SocialPlatformCard.module.scss";
import InstagramIcon from "../SVGComponents/Dashboard/SocialMedia/InstagramIcon";
import FacebookIcon from "../SVGComponents/Dashboard/SocialMedia/FacebookIcon";
import ThreadsIcon from "../SVGComponents/Dashboard/SocialMedia/ThreadsIcon";
import LinkedInIcon from "../SVGComponents/Dashboard/SocialMedia/LinkedInIcon";
import XIcon from "../SVGComponents/Dashboard/SocialMedia/XIcon";

type Platform = "instagram" | "facebook" | "threads" | "linkedin" | "x";

interface SocialPlatformCardProps {
  platform: Platform;
  count: number;
}

const platformConfig: Record<Platform, { label: string; icon: ReactElement }> =
  {
    instagram: { label: "Instagram", icon: <InstagramIcon /> },
    facebook: { label: "Facebook", icon: <FacebookIcon /> },
    threads: { label: "Threads", icon: <ThreadsIcon /> },
    linkedin: { label: "LinkedIN", icon: <LinkedInIcon /> },
    x: { label: "X", icon: <XIcon /> },
  };

export default function SocialPlatformCard({
  platform,
  count,
}: SocialPlatformCardProps) {
  const { label, icon } = platformConfig[platform];
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.count}>{count.toLocaleString()}</div>
    </div>
  );
}
