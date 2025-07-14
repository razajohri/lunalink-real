
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need to know coding to use CartCall?",
      answer: "Absolutely not. CartCall is completely hands-off. We handle all the technical setup, implementation, and management for you. There's no coding, no API keys, and no technical configuration required."
    },
    {
      question: "Can I customize the voice script?",
      answer: "Yes! While we provide optimized scripts that work well for most stores, you can customize the voice script, tone, and conversation flow from your dashboard. Our team can also help with script optimization based on your brand voice."
    },
    {
      question: "Do I need to pay extra for phone numbers?",
      answer: "No. All plans include dedicated phone numbers at no extra cost. We handle the telecommunications infrastructure so you don't have to worry about it."
    },
    {
      question: "How quickly can I start recovering abandoned carts?",
      answer: "Most merchants are fully set up within 24 hours of installation. Once activated, your AI voice agent can start calling abandoned carts the same day."
    },
    {
      question: "Will the calls sound robotic?",
      answer: "No. Our AI voice technology uses advanced natural language processing to create human-like conversations. The voice sounds natural, responds intelligently to customer questions, and can adapt to different scenarios in real-time."
    },
    {
      question: "What results can I expect?",
      answer: "While results vary by store, our merchants typically see a 10-20% increase in recovered abandoned carts compared to email-only recovery methods. Many reach ROI within their first week."
    },
    {
      question: "Is there a limit to how many calls can be made?",
      answer: "Each plan includes a specific number of call minutes per month. You can always upgrade if you need more call volume as your business grows."
    },
    {
      question: "How do customers react to AI calls?",
      answer: "Most customers appreciate the personalized outreach. Our AI is designed to be helpful and non-intrusive, and can provide immediate assistance for completing purchases. Call acceptance rates are typically very positive."
    }
  ];

  return (
    <section id="faq" className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about CartCall for Shopify
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-gray-600">Still have questions?</p>
          <a href="#" className="text-cartcall-600 font-medium hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
