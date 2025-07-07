import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useShopify } from '@/contexts/ShopifyContext';
import { Store } from 'lucide-react';

const ShopifyConnect = () => {
  const { connectStore } = useShopify();
  const [storeDomain, setStoreDomain] = useState('');
  const [open, setOpen] = useState(false);

  const handleConnect = () => {
    if (storeDomain.trim()) {
      connectStore(storeDomain.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm" 
          className="w-full justify-start text-left"
        >
          <Store className="mr-2 h-4 w-4" />
          Shopify Account Disconnected
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Your Shopify Store</DialogTitle>
          <DialogDescription>
            Enter your Shopify store domain to connect and start automating abandoned cart recovery.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-domain">Store Domain</Label>
            <Input
              id="store-domain"
              placeholder="yourstore.myshopify.com"
              value={storeDomain}
              onChange={(e) => setStoreDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConnect()}
            />
            <p className="text-xs text-muted-foreground">
              Enter your store domain (e.g., mystore.myshopify.com or just mystore)
            </p>
          </div>
          <Button 
            onClick={handleConnect} 
            disabled={!storeDomain.trim()}
            className="w-full"
          >
            Connect Shopify Store
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShopifyConnect;