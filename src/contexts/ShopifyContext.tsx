import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface ShopifyStore {
  id: string;
  user_id: string;
  store_domain: string;
  access_token: string;
  connected_at: string;
}

interface ShopifyContextType {
  store: ShopifyStore | null;
  isConnected: boolean;
  loading: boolean;
  saveStoreDomain: (storeDomain: string) => Promise<void>;
  saveAccessToken: (accessToken: string) => Promise<void>;
  refreshConnection: () => Promise<void>;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

export const useShopify = () => {
  const context = useContext(ShopifyContext);
  if (context === undefined) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
};

export const ShopifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [store, setStore] = useState<ShopifyStore | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchShopifyStore = async () => {
    console.log('fetchShopifyStore called, user:', user?.id);
    if (!user) {
      console.log('No user found, setting store to null');
      setStore(null);
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching Shopify store for user:', user.id);
      const { data, error } = await supabase
        .from('shopify_stores')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Shopify store query result:', { data, error });

      if (error) {
        console.error('Error fetching Shopify store:', error);
        return;
      }

      setStore(data);
      console.log('Store set to:', data);
    } catch (error) {
      console.error('Error fetching Shopify store:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStoreDomain = async (storeDomain: string) => {
    if (!user) return;
    const cleanDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const shop = cleanDomain.includes('.myshopify.com') ? cleanDomain : `${cleanDomain}.myshopify.com`;
    await supabase.from('shopify_stores').upsert({
      user_id: user.id,
      store_domain: shop,
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    await fetchShopifyStore();
  };

  const saveAccessToken = async (accessToken: string) => {
    if (!user) return;
    await supabase.from('shopify_stores').upsert({
      user_id: user.id,
      access_token: accessToken,
      connected_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    await fetchShopifyStore();
  };

  const refreshConnection = async () => {
    await fetchShopifyStore();
  };

  useEffect(() => {
    fetchShopifyStore();
  }, [user]);

  const value: ShopifyContextType = {
    store,
    isConnected: !!store?.store_domain && !!store?.access_token,
    loading,
    saveStoreDomain,
    saveAccessToken,
    refreshConnection,
  };

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  );
};
