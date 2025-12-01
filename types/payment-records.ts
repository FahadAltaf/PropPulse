export interface PaymentRecord {
  id: string;
  payment_id: string;
  payment_status: string;
  user_id: string;
  user_email: string;
  property_location: string;
  unit_number: string;
  project_name: string;
  area: number;
  unit_type: string;
  unit_size: string;
  yearly_rent: string;
  base_price: number;
  include_amc: boolean;
  amc_price: number;
  include_insurance: boolean;
  insurance_price: number;
  total_amount: number;
  contract_expiry?: string;
  contract_start_date?: string;
  status: string;
  emirates_id_url?: string;
  title_deed_url?: string;
  tenant_name?: string;
  tenant_email?: string;
  tenant_phone?: string;
  lease_start_date?: string;
  lease_end_date?: string;
  monthly_rent?: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentRecordActivity {
  id: string;
  payment_record_id: string;
  activity_type: string;
  activity_title: string;
  activity_description?: string;
  scheduled_date?: string;
  completed_date?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentRecordFinancial {
  id: string;
  payment_record_id: string;
  transaction_type: string;
  amount: number;
  due_date?: string;
  paid_date?: string;
  status: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = 
  | "pending_review"
  | "pending_contract"
  | "pending_signature"
  | "completed"
  | "rejected";

