alter table public.menu_categories
add column if not exists image_position_x integer not null default 50,
add column if not exists image_position_y integer not null default 50;

alter table public.menu_items
add column if not exists image_position_x integer not null default 50,
add column if not exists image_position_y integer not null default 50;

alter table public.media_assets
add column if not exists image_position_x integer not null default 50,
add column if not exists image_position_y integer not null default 50;
