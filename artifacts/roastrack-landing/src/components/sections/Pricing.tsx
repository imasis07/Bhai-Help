import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for testing the waters",
    features: [
      "1 influencer",
      "1,000 tracked visits/month",
      "Basic reports",
      "Email support",
      "Link click tracking",
    ],
    cta: "Get Started Free",
    ctaHref: "#",
    popular: false,
    color: "border-border",
    ctaClass: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    name: "Pro",
    price: "₹4,999",
    period: "/month",
    description: "For brands serious about influencer ROI",
    features: [
      "50 influencers",
      "Unlimited tracked visits",
      "Deep link + search + dark social tracking",
      "Multi-touch attribution models",
      "Priority support",
      "CSV & API export",
      "Real-time dashboard",
    ],
    cta: "Get Started",
    ctaHref: "#",
    popular: true,
    color: "border-primary/50",
    ctaClass: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  {
    name: "Agency",
    price: "₹24,999",
    period: "/month",
    description: "For agencies managing multiple brands",
    features: [
      "Unlimited influencers",
      "Unlimited tracked visits",
      "White-label dashboard",
      "Full API access",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    ctaHref: "#contact",
    popular: false,
    color: "border-violet-500/30",
    ctaClass: "bg-violet-600 text-white hover:bg-violet-500",
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-card/20 scroll-mt-20" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            Simple Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Start Free,{" "}
            <span className="text-primary">Scale as You Grow</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No lock-in contracts. Upgrade or downgrade any time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative bg-card border ${plan.color} rounded-2xl p-8 flex flex-col ${
                plan.popular ? "ring-2 ring-primary/50 shadow-xl shadow-primary/10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-sm font-semibold text-muted-foreground mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className={`w-full py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${plan.ctaClass}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
