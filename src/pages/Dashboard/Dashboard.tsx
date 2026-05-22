import {
  CalendarDays,
  TrendingUp,
  Users2,
  UserCheck,
  UserPlus,
  UserMinus,
  UserX,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../../components/StatCard/StatCard';
import SocialPlatformCard from '../../components/SocialPlatformCard/SocialPlatformCard';
import styles from './Dashboard.module.scss';

const revenueData = [
  { month: 'JAN', revenue: 6800, projected: 7000 },
  { month: 'FEB', revenue: 5500, projected: 7000 },
  { month: 'MAR', revenue: 7200, projected: 7200 },
  { month: 'APR', revenue: 13100, projected: 7500 },
  { month: 'MAY', revenue: 11200, projected: 7800 },
  { month: 'JUN', revenue: 9600, projected: 8000 },
  { month: 'JUL', revenue: 12500, projected: 8200 },
  { month: 'AUG', revenue: 14500, projected: 8500 },
];

const userStats = [
  {
    label: 'TOTAL REGISTERED',
    value: '3580',
    stat: '+165%  this month',
    type: 'positive' as const,
    icon: <Users2 size={17} />,
  },
  {
    label: 'ACTIVE USERS',
    value: '3230',
    stat: '84.65% of total',
    type: 'positive' as const,
    icon: <UserCheck size={17} />,
  },
  {
    label: 'NEW USERS TODAY',
    value: '286',
    stat: '+65%  vs yesterday',
    type: 'positive' as const,
    icon: <UserPlus size={17} />,
  },
  {
    label: 'INACTIVE USERS',
    value: '3230',
    stat: '84.65% of total',
    type: 'neutral' as const,
    icon: <UserMinus size={17} />,
  },
  {
    label: 'SUSPENDED USERS',
    value: '136',
    stat: '2.50% of total',
    type: 'neutral' as const,
    icon: <UserX size={17} />,
  },
];

const socialPlatforms = [
  { platform: 'instagram' as const, count: 276 },
  { platform: 'facebook' as const, count: 657 },
  { platform: 'threads' as const, count: 320 },
  { platform: 'linkedin' as const, count: 287 },
  { platform: 'x' as const, count: 924 },
];

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>

      {/* ── Users Section ── */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Users</h2>
          <div className={styles.dateChip}>
            <CalendarDays size={20} />
            <span>May 2026</span>
          </div>
        </div>
        <div className={styles.statsGrid}>
          {userStats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
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
              <span className={styles.revenueValue}>$9,852.80</span>
              <div className={styles.revenueTrend}>
                <TrendingUp size={13} />
                <span>+45.80%  vs april</span>
              </div>
            </div>
            <div className={styles.revenueDivider} />
            <div className={styles.revenueItem}>
              <span className={styles.revenueLabel}>TOTAL REVENUE</span>
              <span className={styles.revenueValue}>$37,457.45</span>
              <span className={styles.revenueSubtext}>All time</span>
            </div>
          </div>
        </div>

        {/* Revenue Trend card */}
        <div className={styles.card}>
          <div className={styles.chartHeader}>
            <h3 className={styles.cardTitle}>Revenue Trend</h3>
            <span className={styles.chartSubtitle}>Monthly revenue - last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart
              data={revenueData}
              margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10.5, fill: '#9ca3af' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10.5, fill: '#9ca3af' }}
                tickFormatter={(v: number) => `${v / 1000}k`}
                domain={[0, 15000]}
                ticks={[5000, 10000, 15000]}
                width={34}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  fontSize: 12,
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Revenue']}
                labelStyle={{ fontWeight: 600, color: '#374151' }}
              />
              {/* Projected / baseline dashed line */}
              <Area
                type="monotone"
                dataKey="projected"
                stroke="#86efac"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                fill="none"
                dot={false}
                activeDot={false}
              />
              {/* Main revenue area */}
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#revGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
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
              <span className={styles.aiValue}>14,587</span>
              <span className={styles.aiLinks}>Chat . Caption . Thread</span>
            </div>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>TOKEN USED (MAY)</span>
              <span className={styles.aiValue}>56.6M</span>
              <span className={styles.aiSub}>of 200M limit. 25%</span>
            </div>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>IMAGE GENERATED</span>
              <span className={styles.aiValue}>86,890</span>
              <div className={styles.aiTrend}>
                <TrendingUp size={12} />
                <span>96.40%  success rate</span>
              </div>
            </div>
            <div className={styles.aiItem}>
              <span className={styles.aiLabel}>API COST TO DATE</span>
              <span className={styles.aiValue}>$457</span>
              <span className={styles.aiSub}>~$980 projected</span>
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
            {socialPlatforms.map(({ platform, count }) => (
              <SocialPlatformCard key={platform} platform={platform} count={count} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
