import { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users2,
  UserCheck,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import StatCard from '../../components/StatCard/StatCard';
import SocialPlatformCard from '../../components/SocialPlatformCard/SocialPlatformCard';
import styles from './Dashboard.module.scss';
import DashboardService from '../../services/api/dashboard';
import type { DashboardData } from '../../types/dashboard';


export default function Dashboard() {
  const [stats, setStats] = useState<DashboardData | null>(null);

  useEffect(() => {
    DashboardService.fetchStats()
      .then((res) => setStats(res.data))
      .catch(() => {
        // errors handled by axios interceptors
      });
  }, []);

  const users = stats?.users;
  const revenue = stats?.revenue;
  const aiUsage = stats?.ai_usage;
  const socialPosts = stats?.social_media_posts;

  const userStats = [
    {
      label: 'TOTAL REGISTERED',
      value: users?.total_registered.value ?? '-',
      stat: users?.total_registered.sub_value ?? '',
      type: 'positive' as const,
      icon: <Users2 size={17} />,
    },
    {
      label: 'ACTIVE USERS',
      value: users?.active_users.value ?? '-',
      stat: users?.active_users.sub_value ?? '',
      type: 'positive' as const,
      icon: <UserCheck size={17} />,
    },
    {
      label: 'NEW USERS TODAY',
      value: users?.new_users_today.value ?? '-',
      stat: users?.new_users_today.sub_value ?? '',
      type: 'positive' as const,
      icon: <UserPlus size={17} />,
    },
    {
      label: 'INACTIVE USERS',
      value: users?.inactive_users.value ?? '-',
      stat: users?.inactive_users.sub_value ?? '',
      type: 'neutral' as const,
      icon: <UserMinus size={17} />,
    },
  ];

  const socialPlatforms = Object.entries(socialPosts?.by_platform ?? {}).map(
    ([platform, count]) => ({ platform, count }),
  );

  return (
    <div className={styles.dashboard}>

      {/* ── Users Section ── */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Users</h2>
          </div>
        <div className={styles.statsGrid}>
          {userStats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={String(s.value)}
              stat={s.stat}
              statType={s.type}
              icon={s.icon}
            />
          ))}
        </div>
      </section>

      {/* ── Revenue Row ── */}
      <div className={styles.middleRow}>

        {/* Revenue card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Revenue</h3>
          <div className={styles.revenueGrid}>
            <div className={styles.revenueItem}>
              <span className={styles.revenueLabel}>$ MMR</span>
              <span className={styles.revenueValue}>
                {revenue?.mmr.value != null ? `$${revenue.mmr.value.toLocaleString()}` : '-'}
              </span>
              <div className={styles.revenueTrend}>
                <TrendingUp size={13} />
                <span>{revenue?.mmr.sub_value ?? '-'}</span>
              </div>
            </div>
            <div className={styles.revenueDivider} />
            <div className={styles.revenueItem}>
              <span className={styles.revenueLabel}>TOTAL REVENUE</span>
              <span className={styles.revenueValue}>
                {revenue?.total_revenue.value != null
                  ? `$${revenue.total_revenue.value.toLocaleString()}`
                  : '-'}
              </span>
              <span className={styles.revenueSubtext}>
                {revenue?.total_revenue.sub_value ?? '-'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ── AI Usage + Social Media Row ── */}
      <div className={styles.bottomCard}>

        {/* AI Usage */}
        <div className={styles.aiSection}>
          <h3 className={styles.cardTitle}>AI Usage</h3>
          <div className={styles.aiGrid}>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>AI CALLS</span>
              <span className={styles.aiValue}>
                {aiUsage?.ai_calls.value?.toLocaleString() ?? '-'}
              </span>
              <span className={styles.aiSub}>{aiUsage?.ai_calls.sub_value ?? '-'}</span>
            </div>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>TOKENS USED</span>
              <span className={styles.aiValue}>
                {aiUsage?.tokens_used.value?.toLocaleString() ?? '-'}
              </span>
              <span className={styles.aiSub}>{aiUsage?.tokens_used.sub_value ?? '-'}</span>
            </div>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>IMAGES GENERATED</span>
              <span className={styles.aiValue}>
                {aiUsage?.images_generated.value?.toLocaleString() ?? '-'}
              </span>
              <div className={styles.aiTrend}>
                <TrendingUp size={12} />
                <span>{aiUsage?.images_generated.sub_value ?? '-'}</span>
              </div>
            </div>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>API COST TO DATE</span>
              <span className={styles.aiValue}>
                {aiUsage?.api_cost_to_date.value != null
                  ? `$${aiUsage.api_cost_to_date.value.toLocaleString()}`
                  : '-'}
              </span>
              <span className={styles.aiSub}>{aiUsage?.api_cost_to_date.sub_value ?? '-'}</span>
            </div>
          </div>
        </div>

        <div className={styles.sectionDivider} />

        {/* Social Media */}
        <div className={styles.socialSection}>
          <h3 className={styles.cardTitle}>
            Social Media{' '}
            <span className={styles.socialSubtitle}>(Posts Generated)</span>
          </h3>
          <div className={styles.socialGrid}>
            {socialPlatforms.length > 0
              ? socialPlatforms.map(({ platform, count }) => (
                  <SocialPlatformCard
                    key={platform}
                    platform={platform as any}
                    count={count}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
