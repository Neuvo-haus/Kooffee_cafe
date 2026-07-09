alter table public.menu_categories
add column if not exists image_url text not null default '',
add column if not exists video_url text not null default '';

alter table public.menu_items
add column if not exists image_url text not null default '';
