import React from "react";
import { PlayCircle, User, MessageSquare, Globe, Users, ShoppingBag, FileText, Sparkles } from 'lucide-react';

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
      {/* Left: Headline and CTA */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          How your AI phone support agent works:
        </h2>
        <Button
          className="bg-primary text-white px-8 py-4 text-lg font-semibold rounded-lg shadow hover:bg-primary/90 transition mb-8"
          onClick={() => window.location.href = '/auth'}
        >
          Try it out free – $0 today
        </Button>
      </div>
      {/* Right: Flowchart */}
      <div className="flex flex-col items-center">
        {/* Step 1 */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-3 mb-4 shadow">
          <User className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">Customer calls</span>
        </div>
        <div className="h-6 w-1 bg-gray-300 dark:bg-gray-700 mb-4"></div>
        {/* Step 2 */}
        <div className="flex items-center bg-primary/10 rounded-full px-6 py-3 mb-4 shadow">
          <Sparkles className="w-5 h-5 mr-2 text-primary" />
          <span className="text-primary font-medium">AI picks up and greets</span>
        </div>
        <div className="h-6 w-1 bg-gray-300 dark:bg-gray-700 mb-4"></div>
        {/* Step 3 */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-6 py-3 mb-4 shadow">
          <MessageSquare className="w-5 h-5 mr-2 text-gray-500" />
          <span className="text-gray-800 dark:text-gray-200 font-medium">Customer asks question</span>
        </div>
        <div className="h-6 w-1 bg-gray-300 dark:bg-gray-700 mb-4"></div>
        {/* Step 4: Sources */}
        <div className="text-gray-600 dark:text-gray-300 mb-2">AI checks all sources:</div>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
            <Globe className="w-4 h-4 mr-1 text-primary" /> Website
          </div>
          <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
            <Users className="w-4 h-4 mr-1 text-primary" /> Customers
          </div>
          <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
            <ShoppingBag className="w-4 h-4 mr-1 text-primary" /> Orders
          </div>
          <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
            <FileText className="w-4 h-4 mr-1 text-primary" /> Docs
          </div>
        </div>
        <div className="h-6 w-1 bg-gray-300 dark:bg-gray-700 mb-4"></div>
        {/* Step 5 */}
        <div className="flex items-center bg-primary/10 rounded-full px-6 py-3 shadow">
          <Sparkles className="w-5 h-5 mr-2 text-primary" />
          <span className="text-primary font-medium">AI answers perfectly</span>
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
