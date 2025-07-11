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
        .from('shopify_manual_connections')
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
    console.log('saveStoreDomain called with:', { storeDomain, user: user?.id });

    if (!user) {
      console.error('No user found when trying to save store domain');
      throw new Error('User not authenticated');
    }

    try {
      const cleanDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
      const shop = cleanDomain.includes('.myshopify.com') ? cleanDomain : `${cleanDomain}.myshopify.com`;

      const payload = {
        user_id: user.id,
        store_domain: shop,
        connected_at: new Date().toISOString(),
      };

      console.log('Attempting to save store domain with payload:', payload);

      const { data, error } = await supabase.from('shopify_manual_connections').upsert(payload, { onConflict: 'user_id' });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Error saving store domain:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Store domain saved successfully:', data);
      await fetchShopifyStore();
    } catch (error) {
      console.error('Failed to save store domain:', error);
      console.error('Full error object:', JSON.stringify(error, null, 2));
      throw error;
    }
  };

  const saveAccessToken = async (accessToken: string) => {
    if (!user) {
      console.error('No user found when trying to save access token');
      throw new Error('User not authenticated');
    }

    try {
      console.log('Saving access token for user:', user.id);

      const { data, error } = await supabase.from('shopify_manual_connections').upsert({
        user_id: user.id,
        access_token: accessToken,
        connected_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

      if (error) {
        console.error('Error saving access token:', error);
        throw error;
      }

      console.log('Access token saved successfully:', data);
      await fetchShopifyStore();
    } catch (error) {
      console.error('Failed to save access token:', error);
      throw error;
    }
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
