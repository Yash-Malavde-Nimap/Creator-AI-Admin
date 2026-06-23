// Matches the actual API response shape (snake_case)
export interface SubscriptionPlan {
  id: string;
  name: string;
  billing_interval: string;
  price_monthly: number;
  price_annual_monthly: number | null;
  price_annual_total: number | null;
  annual_discount_percentage: number;
  annual_savings_amount: number;
  currency: string;
  image_allowance: number;
  video_allowance: number;
  description: string | null;
  ai_model_key: string | null;
  ai_model_identifier: string | null;
  ai_provider: string | null;
  sort_order: number;
  stripe_price_id_monthly: string | null;
  stripe_price_id_annual: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

// Payload sent when creating a plan
export interface CreateSubscriptionPayload {
  name: string;
  billing_interval?: string;
  price_monthly: number;
  annual_discount_percentage?: number;
  image_allowance?: number;
  video_allowance?: number;
  description?: string;
  is_active?: boolean;
  currency?: string;
}

export type UpdateSubscriptionPayload = Partial<CreateSubscriptionPayload>;

export interface SubscriptionListParams {
  search?: string;
  status?: string;
  page?: number;
  page_size?: number;
}
