import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useShopify } from '@/contexts/ShopifyContext';
import { useAuth } from '@/contexts/AuthContext';

const ShopifyCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { refreshConnection } = useShopify();
  const { user } = useAuth();

  useEffect(() => {
    console.log('ShopifyCallback page loaded');
    console.log('Current user:', user?.id);
    console.log('URL search params:', searchParams.toString());
    
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const code = searchParams.get('code');
    const shop = searchParams.get('shop');
    const state = searchParams.get('state');

    console.log('Callback params:', { success, error, code: code?.substring(0, 10) + '...', shop, state });

    if (success === 'shopify_connected') {
      console.log('Success callback detected');
      toast({
        title: 'Shopify Connected!',
        description: 'Your Shopify store has been successfully connected.',
      });
      // Refresh connection status after a short delay to ensure the edge function completes
      setTimeout(() => {
        console.log('Refreshing connection...');
        refreshConnection();
      }, 1000);
    } else if (error) {
      console.log('Error callback detected:', error);
      let errorMessage = 'Failed to connect to Shopify. Please try again.';
      
      switch (error) {
        case 'oauth_failed':
          errorMessage = 'OAuth authorization failed. Please try again.';
          break;
        case 'missing_params':
          errorMessage = 'Missing required parameters. Please try again.';
          break;
        case 'token_exchange_failed':
          errorMessage = 'Failed to exchange authorization code. Please try again.';
          break;
        case 'no_access_token':
          errorMessage = 'No access token received from Shopify.';
          break;
        case 'db_save_failed':
          errorMessage = 'Failed to save connection details. Please try again.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
      }

      toast({
        title: 'Connection Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } else if (code && shop && state) {
      console.log('OAuth callback detected, should be handled by edge function');
      // This should be handled by the edge function automatically
      // If we reach here, it means the edge function isn't working
      toast({
        title: 'Processing Connection',
        description: 'Processing your Shopify connection...',
      });
    }

    // Always redirect to dashboard after handling the callback
    setTimeout(() => {
      console.log('Redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    }, 1500);
  }, [searchParams, navigate, toast, refreshConnection, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Processing Shopify Connection...</h2>
        <p className="text-muted-foreground">Please wait while we complete your store connection.</p>
      </div>
    </div>
  );
};

export default ShopifyCallback;