
export interface User {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  password?: string
  full_name?: string
  role_id?: string
  project_id?: string
  is_active?: boolean
  last_login?: string
  created_at?: string
  updated_at?: string
  profile_image?: string
  status?: string
  
  settings?: {
    edges: {
      node: {
        site_name: string
        logo_url: string
      }
    }[]
  }
  roles?: {
    name: string
    description?: string
  }
  
 
} 

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}



export interface Role {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;

} 

export interface Settings {
  id: string;
  site_name?: string;
  site_description?: string;
  site_image?: string;
  appearance_theme?: string;
  primary_color?: string;
  secondary_color?: string;
  logo_url?: string;
  logo_horizontal_url?: string;
  favicon_url?: string;
  meta_keywords?: string;
  meta_description?: string;
  contact_email?: string;
  social_links?: string;
  created_at?: string;
  updated_at?: string;
  logo_setting?: string;
  type?: UserRoles;
  user_id?: User
  
} 







