import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { FAQS } from '../../lib/constants';

export default function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="label-eyebrow mb-5">Common Questions</div>
          <h2 className="heading-tight text-white text-4xl sm:text-5xl mb-6">
            The honest <br />answers<span className="text-amber-500">.</span>
          </h2>
          <p className="font-body text-slate-400 text-base leading-relaxed">
            Everything skill-holders ask before agreeing to a zero-upfront partnership. Direct, operator answers.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="border-b border-slate-800 last:border-b-0"
              >
                <AccordionTrigger
                  data-testid={`faq-trigger-${i}`}
                  className="text-left font-display font-bold text-white text-lg sm:text-xl tracking-tight py-6 hover:text-teal-400 hover:no-underline"
                >
                  {f.q}
                </AccordionTrigger>
                <AccordionContent
                  data-testid={`faq-content-${i}`}
                  className="font-body text-slate-400 text-base leading-relaxed pb-6 pr-4"
                >
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
