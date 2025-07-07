import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const shop = url.searchParams.get('shop')
    const state = url.searchParams.get('state') // This is the user_id
    const error = url.searchParams.get('error')

    if (error) {
      console.error('Shopify OAuth error:', error)
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://lunalink-real.lovable.app/dashboard?error=oauth_failed'
        }
      })
    }

    if (!code || !shop || !state) {
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://lunalink-real.lovable.app/dashboard?error=missing_params'
        }
      })
    }

    // Exchange the code for an access token
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: Deno.env.get('SHOPIFY_API_KEY'),
        client_secret: Deno.env.get('SHOPIFY_API_SECRET'),
        code: code,
      }),
    })

    if (!tokenResponse.ok) {
      console.error('Failed to exchange code for token:', await tokenResponse.text())
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://lunalink-real.lovable.app/dashboard?error=token_exchange_failed'
        }
      })
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://lunalink-real.lovable.app/dashboard?error=no_access_token'
        }
      })
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Save the store connection to Supabase
    console.log('Attempting to save store connection for user:', state)
    const { error: dbError } = await supabase
      .from('shopify_stores')
      .upsert({
        user_id: state,
        store_domain: shop,
        access_token: accessToken,
        connected_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://lunalink-real.lovable.app/dashboard?error=db_save_failed'
        }
      })
    }

    console.log('Successfully saved store connection for user:', state)

    // Redirect to dashboard on success
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://lunalink-real.lovable.app/dashboard?success=shopify_connected'
      }
    })

  } catch (error) {
    console.error('Shopify callback error:', error)
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://lunalink-real.lovable.app/dashboard?error=unexpected_error'
      }
    })
  }
})