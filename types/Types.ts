interface BaseType {
  id?: number;
  name: string;
}

export interface Menu extends BaseType {
  price: number;
  locationIds: number[];
  description?: string;
  asset_url?: string;
  isAvailable?: boolean;
}

export interface MenuCategory extends BaseType {}

export interface Addon extends BaseType {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string[];
}

export interface AddonCategory extends BaseType {
  isRequired: boolean;
}

export interface Location extends BaseType {
  companyId?: number;
  address?: string;
  name: string;
}

export interface MenuLocation {
  id: number;
  menus_id: number;
  locations_id: number;
  is_available: boolean;
}

export interface Company {
  id?: number;
  name: string;
  address: string;
}

export interface User extends BaseType {
  email: string;
  password: string;
  companies_id: number;
}
