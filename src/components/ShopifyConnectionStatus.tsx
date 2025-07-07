import { Badge } from '@/components/ui/badge';
import { useShopify } from '@/contexts/ShopifyContext';
import { Store } from 'lucide-react';
import ShopifyConnect from './ShopifyConnect';

const ShopifyConnectionStatus = () => {
  const { store, isConnected, loading } = useShopify();

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-muted/50 rounded-lg">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
        <div className="text-xs">
          <div className="font-medium text-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return <ShopifyConnect />;
  }

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      <div className="text-xs flex-1">
        <div className="font-medium text-foreground flex items-center">
          <Store className="w-3 h-3 mr-1" />
          Shopify Store
        </div>
        <div className="text-success">Connected</div>
        {store?.store_domain && (
          <div className="text-muted-foreground text-xs truncate">
            {store.store_domain}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopifyConnectionStatus;