import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useShopify } from '@/contexts/ShopifyContext';
import { Store, CheckCircle, Info } from 'lucide-react';

const ShopifyConnect = () => {
  const { store, isConnected, loading, saveStoreDomain, saveAccessToken } = useShopify();
  const [step, setStep] = useState<'closed' | 'domain' | 'token' | 'success'>(isConnected ? 'success' : 'closed');
  const [storeDomain, setStoreDomain] = useState(store?.store_domain || '');
  const [accessToken, setAccessToken] = useState(store?.access_token || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Show green badge if connected
  if (isConnected) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
        <CheckCircle className="w-4 h-4 text-success" />
        <span className="text-xs font-medium text-success">Store Connected</span>
        <span className="text-xs text-muted-foreground truncate max-w-[100px]">{store?.store_domain}</span>
      </div>
    );
  }

  // Small red button to trigger connect flow
  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="w-full justify-start text-left"
        onClick={() => setStep('domain')}
      >
        <Store className="mr-2 h-4 w-4" />
        Connect Store
      </Button>

      {/* Step 1: Enter Domain */}
      <Dialog open={step === 'domain'} onOpenChange={open => setStep(open ? 'domain' : 'closed')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Shopify Store</DialogTitle>
            <DialogDescription>Enter your Shopify store domain to continue.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="store-domain">Shopify Store Domain</Label>
            <Input
              id="store-domain"
              placeholder="your-store-name.myshopify.com"
              value={storeDomain}
              onChange={e => setStoreDomain(e.target.value)}
              disabled={saving}
              onKeyDown={e => e.key === 'Enter' && handleDomainSubmit()}
              autoFocus
            />
            <Button onClick={handleDomainSubmit} disabled={!storeDomain.trim() || saving} className="w-full">
              {saving ? 'Saving...' : 'Next'}
            </Button>
            {error && <div className="text-xs text-destructive">{error}</div>}
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Enter Access Token */}
      <Dialog open={step === 'token'} onOpenChange={open => setStep(open ? 'token' : 'closed')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Shopify Access Token</DialogTitle>
            <DialogDescription>Paste your Admin API access token below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label htmlFor="access-token">Access Token</Label>
            <Input
              id="access-token"
              placeholder="shpat_..."
              value={accessToken}
              onChange={e => setAccessToken(e.target.value)}
              disabled={saving}
              onKeyDown={e => e.key === 'Enter' && handleTokenSubmit()}
              autoFocus
            />
            <Button onClick={handleTokenSubmit} disabled={!accessToken.trim() || saving} className="w-full">
              {saving ? 'Saving...' : 'Connect Store'}
            </Button>
            {error && <div className="text-xs text-destructive">{error}</div>}
          </div>
          {/* Small tutorial section */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 font-semibold text-foreground text-sm mb-1">
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
              className="block mt-2 text-primary underline text-xs font-medium"
            >
              📺 Watch video tutorial
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );

  function handleDomainSubmit() {
    setSaving(true);
    setError('');
    saveStoreDomain(storeDomain.trim())
      .then(() => {
        setStep('token');
      })
      .catch((e) => {
        setError('Failed to save store domain.');
      })
      .finally(() => setSaving(false));
  }

  function handleTokenSubmit() {
    setSaving(true);
    setError('');
    saveAccessToken(accessToken.trim())
      .then(() => {
        setStep('success');
      })
      .catch((e) => {
        setError('Failed to save access token.');
      })
      .finally(() => setSaving(false));
  }
};

export default ShopifyConnect;
