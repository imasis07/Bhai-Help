import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation } from "wouter";

import Home from "@/pages/home";
import PricingPage from "@/pages/pricing";
import OnboardingPage from "@/pages/onboarding";
import ConnectStorePage from "@/pages/connect-store";
import InstallPixelPage from "@/pages/install-pixel";
import AddInfluencerPage from "@/pages/add-influencer";
import MainDashboard from "@/pages/main-dashboard";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import VerifyEmailPage from "@/pages/verify-email";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

/* ─── Setup wizard (shown after sign-up onboarding) ─── */
const STEPS = [
  {
    num: 1,
    title: "Connect your store",
    desc: "Shopify, Wix, WooCommerce, or Custom",
    action: "Connect",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 10a7 7 0 1 0 14 0A7 7 0 0 0 3 10Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: 2,
    title: "Install tracking pixel",
    desc: "Copy-paste 1 line of code to your website",
    action: "Install",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 8l-3 3 3 3M14 8l3 3-3 3M11 5l-2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: 3,
    title: "Add your first influencer",
    desc: "Enter Instagram handle, assign campaign",
    action: "+ Add",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 17c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function SetupWizardPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(222, 47%, 6%)" }}>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="flex items-center justify-between px-8 py-4 border-b" style={{ borderColor: "rgba(14,165,233,0.1)" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="7" width="3" height="6" rx="0.5" fill="hsl(199,89%,48%)"/>
              <rect x="5.5" y="4" width="3" height="9" rx="0.5" fill="hsl(199,89%,48%)"/>
              <rect x="10" y="1" width="3" height="12" rx="0.5" fill="hsl(199,89%,48%)"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-white">ROASTrack</span>
        </div>
        <button
          onClick={() => setLocation("/")}
          className="text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
        >
          Back to home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Welcome to ROASTrack!</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Get set up in 3 simple steps.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all"
                style={{ background: "hsl(222, 47%, 9%)", border: "1px solid rgba(14,165,233,0.14)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(14,165,233,0.32)")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(14,165,233,0.14)")}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(14,165,233,0.1)", color: "hsl(199,89%,48%)" }}>
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium" style={{ color: "hsl(199,89%,48%)" }}>Step {step.num}</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{step.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{step.desc}</div>
                </div>
                <button
                  onClick={() => {
                    if (step.num === 1) setLocation("/connect-store");
                    if (step.num === 2) setLocation("/install-pixel");
                    if (step.num === 3) setLocation("/add-influencer");
                  }}
                  className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: "rgba(14,165,233,0.12)", color: "hsl(199,89%,48%)", border: "1px solid rgba(14,165,233,0.25)" }}
                  onMouseEnter={e => { const b = e.currentTarget; b.style.background = "hsl(199,89%,48%)"; b.style.color = "hsl(222,47%,6%)"; b.style.border = "1px solid hsl(199,89%,48%)"; }}
                  onMouseLeave={e => { const b = e.currentTarget; b.style.background = "rgba(14,165,233,0.12)"; b.style.color = "hsl(199,89%,48%)"; b.style.border = "1px solid rgba(14,165,233,0.25)"; }}
                >
                  {step.action}
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setLocation("/main-dashboard")}
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              Skip for now
            </button>
            <button
              onClick={() => setLocation("/main-dashboard")}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "hsl(199,89%,48%)", color: "hsl(222,47%,6%)" }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/verify-email" component={VerifyEmailPage} />
            <Route path="/onboarding" component={OnboardingPage} />
            <Route path="/dashboard" component={SetupWizardPage} />
            <Route path="/connect-store" component={ConnectStorePage} />
            <Route path="/install-pixel" component={InstallPixelPage} />
            <Route path="/add-influencer" component={AddInfluencerPage} />
            <Route path="/main-dashboard" component={MainDashboard} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;
