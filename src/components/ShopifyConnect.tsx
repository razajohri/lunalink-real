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
import { Store, CheckCircle, Info } from 'lucide-react';

const ShopifyConnect = () => {
  const { store, isConnected, loading, saveStoreDomain, saveAccessToken } = useShopify();
  const [step, setStep] = useState<'domain' | 'token' | 'success'>(isConnected ? 'success' : store?.store_domain ? 'token' : 'domain');
  const [storeDomain, setStoreDomain] = useState(store?.store_domain || '');
  const [accessToken, setAccessToken] = useState(store?.access_token || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleDomainSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      await saveStoreDomain(storeDomain.trim());
      setStep('token');
    } catch (e) {
      setError('Failed to save store domain.');
    } finally {
      setSaving(false);
    }
  };

  const handleTokenSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      await saveAccessToken(accessToken.trim());
      setStep('success');
    } catch (e) {
      setError('Failed to save access token.');
    } finally {
      setSaving(false);
    }
  };

  // If connected, show success
  if (isConnected) {
    return (
      <div className="flex flex-col items-center space-y-2 p-3 bg-success/10 rounded-lg">
        <CheckCircle className="w-5 h-5 text-success mb-1" />
        <div className="font-semibold text-success">Your Shopify store is connected</div>
        <div className="text-xs text-muted-foreground truncate max-w-[180px]">{store?.store_domain}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Main Form */}
      <div className="flex-1 space-y-6">
        <div className="text-lg font-bold flex items-center gap-2">
          <Store className="w-5 h-5" /> Connect Your Shopify Store
        </div>
        {step === 'domain' && (
          <div className="space-y-3">
            <Label htmlFor="store-domain">Enter your Shopify store domain</Label>
            <Input
              id="store-domain"
              placeholder="your-store-name.myshopify.com"
              value={storeDomain}
              onChange={e => setStoreDomain(e.target.value)}
              disabled={saving || !!store?.store_domain}
              onKeyDown={e => e.key === 'Enter' && handleDomainSubmit()}
            />
            <Button onClick={handleDomainSubmit} disabled={!storeDomain.trim() || saving || !!store?.store_domain} className="w-full">
              {saving ? 'Saving...' : 'Save & Continue'}
            </Button>
            {error && <div className="text-xs text-destructive">{error}</div>}
          </div>
        )}
        {step === 'token' && (
          <div className="space-y-3">
            <Label htmlFor="access-token">Enter your Shopify access token</Label>
            <Input
              id="access-token"
              placeholder="shpat_..."
              value={accessToken}
              onChange={e => setAccessToken(e.target.value)}
              disabled={saving || !!store?.access_token}
              onKeyDown={e => e.key === 'Enter' && handleTokenSubmit()}
            />
            <Button onClick={handleTokenSubmit} disabled={!accessToken.trim() || saving || !!store?.access_token} className="w-full">
              {saving ? 'Saving...' : 'Connect Store'}
            </Button>
            {error && <div className="text-xs text-destructive">{error}</div>}
          </div>
        )}
        {step === 'success' && (
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle className="w-5 h-5 text-success mb-1" />
            <div className="font-semibold text-success">Your Shopify store is connected</div>
            <div className="text-xs text-muted-foreground truncate max-w-[180px]">{store?.store_domain}</div>
          </div>
        )}
      </div>
      {/* Tutorial Sidebar */}
      <div className="md:w-72 w-full bg-muted/50 rounded-lg p-4 space-y-3 border border-border">
        <div className="flex items-center gap-2 font-semibold text-foreground text-base mb-1">
          <Info className="w-4 h-4 text-primary" /> How to Get Your Shopify Access Token
        </div>
        <ol className="list-decimal list-inside text-xs space-y-1 text-muted-foreground">
          <li>Open your Shopify Admin Panel</li>
          <li>Go to <b>Settings → Apps and sales channels</b></li>
          <li>Click <b>“Develop apps”</b></li>
          <li>Click <b>“Create an app”</b></li>
          <li>Name it <b>LunaLink AI</b></li>
          <li>Go to <b>Configuration → Admin API Integration</b></li>
          <li>Add these scopes:
            <ul className="list-disc list-inside ml-4">
              <li>read_orders</li>
              <li>write_orders</li>
              <li>read_checkouts</li>
              <li>read_customers</li>
              <li>write_webhooks</li>
            </ul>
          </li>
          <li>Save and go to <b>API Credentials</b></li>
          <li>Click <b>“Install app”</b></li>
          <li>Copy the <b>Admin API access token</b> (starts with shpat_...) and Paste here</li>
        </ol>
        <div className="text-xs text-muted-foreground mt-2">
          <b>Note:</b> You’ll only see this token once — save it securely.
        </div>
        <a
          href="https://www.youtube.com/watch?v=IexXYyL3lhQ"
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-primary underline text-xs font-medium"
        >
          📺 Watch video tutorial
        </a>
      </div>
    </div>
  );
};

export default ShopifyConnect;
