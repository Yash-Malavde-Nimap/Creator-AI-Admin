export interface StatValue {
  value: number;
  sub_value: string;
}

export interface DashboardUsers {
  total_registered: StatValue;
  active_users: StatValue;
  new_users_today: StatValue;
  inactive_users: StatValue;
}

export interface DashboardRevenue {
  mmr: StatValue;
  total_revenue: StatValue;
}

export interface DashboardSocialMediaPosts {
  total: number;
  by_platform: Record<string, number>;
}

export interface DashboardAiUsage {
  ai_calls: StatValue;
  tokens_used: StatValue;
  images_generated: StatValue;
  api_cost_to_date: StatValue;
}

export interface DashboardData {
  users: DashboardUsers;
  revenue: DashboardRevenue;
  social_media_posts: DashboardSocialMediaPosts;
  ai_usage: DashboardAiUsage;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
