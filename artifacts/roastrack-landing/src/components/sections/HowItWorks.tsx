import { motion } from "framer-motion";
import { Code2, UserPlus, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Install Pixel",
    description: "Copy-paste 1 line of JavaScript to your website. Works with Shopify, Wix, WooCommerce, or any custom site. Done in under 2 minutes.",
    color: "from-primary/20 to-primary/5",
    border: "border-primary/30",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    dotColor: "bg-primary",
  },
  {
    number: "02",
    icon: UserPlus,
    title: "Add Influencers",
    description: "Enter the influencer's Instagram handle, assign them to a campaign, and generate a unique tracking link automatically.",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    dotColor: "bg-violet-500",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track Real ROI",
    description: "Your dashboard shows real sales, ROAS, and full attribution — including search, DM, and WhatsApp conversions your influencer drove.",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    dotColor: "bg-emerald-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-card/20 scroll-mt-20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-sm text-primary mb-6">
            Simple Setup
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Up and Running in{" "}
            <span className="text-primary">3 Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No engineering team required. No complex integrations. Just copy, click, and track.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative z-10 bg-gradient-to-b ${step.color} border ${step.border} rounded-2xl p-8`}
            >
              {/* Step badge + circle dot for connector */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-2xl ${step.iconBg} flex items-center justify-center shrink-0`}>
                  <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                </div>
                <div className={`text-xs font-bold px-2.5 py-1 rounded-full border ${step.border} ${step.iconColor} bg-background/60`}>
                  Step {step.number}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
