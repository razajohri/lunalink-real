import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { VapiProvider } from "@/contexts/VapiContext";
import { ShopifyProvider } from "@/contexts/ShopifyContext";
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <VapiProvider>
          <ShopifyProvider>
            <App />
            <Toaster />
          </ShopifyProvider>
        </VapiProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
