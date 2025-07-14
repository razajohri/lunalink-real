
import { useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Check, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const WaitlistForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="waitlist" className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="hero-gradient p-8 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Get Early Access
              </h2>
              <p className="text-xl">
                Join the waitlist for exclusive benefits and priority onboarding
              </p>
            </div>
            <div className="p-8">
              <div data-tally-open="3EgxpL" data-tally-emoji="👋" data-tally-animation="wave" data-tally-scroll="60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
