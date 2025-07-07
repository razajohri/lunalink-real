-- Add unique constraint on user_id for shopify_stores table
ALTER TABLE public.shopify_stores ADD CONSTRAINT shopify_stores_user_id_unique UNIQUE (user_id);