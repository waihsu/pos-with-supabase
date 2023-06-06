create table companies(
  id serial primary key not null,
  name text not null
)

create table users(
  id serial primary key not null,
  name text not null,
  email text unique not null,
  password text not null,
  companies_id int not null references companies
)

create table locations(
  id serial primary key not null,
  name text not null,
  address text not null,
  companies_id int not null references companies
)


create table menus (
  id serial primary key not null,
  name text not null,
  price int not null,
  description text,
  asset_url text
)

create table menus_locations(
  id serial primary key not null,
  menus_id int not null references menus,
  locations_id int not null references locations
)


create table menus_categories(
  id serial primary key not null,
  name text not null
)

create table menus_menu_categories(
  id serial primary key not null,
  menus_id int not null references menus,
  menu_categories_id int not null references menus_categories
)

create table addon_categories(
  id serial primary key not null,
  name text not null,
  is_required boolean not null
)

create table addons(
  id serial primary key not null,
  name text not null,
  price int not null,
  addon_categories_id int not null references addon_categories
)

create table menus_addon_categories(
  id serial primary key not null,
  menus_id int not null references menus,
  addon_categories_id int not null references addon_categories
)