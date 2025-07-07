-- Create shopify_stores table
CREATE TABLE public.shopify_stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  store_domain TEXT NOT NULL,
  access_token TEXT NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.shopify_stores ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own shopify stores" 
ON public.shopify_stores 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own shopify stores" 
ON public.shopify_stores 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own shopify stores" 
ON public.shopify_stores 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own shopify stores" 
ON public.shopify_stores 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add index for better performance
CREATE INDEX idx_shopify_stores_user_id ON public.shopify_stores(user_id);