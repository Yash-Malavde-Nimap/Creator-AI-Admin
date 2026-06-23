export interface TransactionRecord {
  user_id: string;
  user_name: string;
  plan_purchased: string;
  price: number;
  currency: string;
  date: string;
  transaction_id: string;
  invoice_id: string;
  payment_status: string;
  payment_method: string;
  order_id: string;
  order_number: string;
  payment_transaction_id: string;
}

export interface TransactionListParams {
  search?: string;
  payment_status?: string;
  plan?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  page_size?: number;
}
