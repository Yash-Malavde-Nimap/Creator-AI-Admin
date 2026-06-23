export interface User {
  id: string;
  name: string;
  whatsapp_number: string;
  email: string;
  role: string;
  credits_balance: number;
  is_email_verified: boolean;
  is_whatsapp_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
