import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk, useUser } from "@clerk/react";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import PricingPage from "@/pages/pricing";
import OnboardingPage from "@/pages/onboarding";
import ConnectStorePage from "@/pages/connect-store";
import InstallPixelPage from "@/pages/install-pixel";
import AddInfluencerPage from "@/pages/add-influencer";
import MainDashboard from "@/pages/main-dashboard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL as string | undefined;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

const clerkAppearance = {
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(199, 89%, 48%)",
    colorBackground: "hsl(222, 47%, 8%)",
    colorInputBackground: "hsl(222, 47%, 11%)",
    colorText: "hsl(210, 40%, 98%)",
    colorTextSecondary: "hsl(215, 20%, 60%)",
    colorInputText: "hsl(210, 40%, 98%)",
    colorNeutral: "hsl(215, 20%, 60%)",
    borderRadius: "0.75rem",
    fontFamily: "Inter, system-ui, sans-serif",
    fontFamilyButtons: "Inter, system-ui, sans-serif",
    fontSize: "15px",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "border border-white/10 rounded-2xl w-full overflow-hidden shadow-2xl shadow-black/50",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: { color: "hsl(210, 40%, 98%)", fontWeight: "700" },
    headerSubtitle: { color: "hsl(215, 20%, 60%)" },
    socialButtonsBlockButtonText: { color: "hsl(210, 40%, 98%)" },
    formFieldLabel: { color: "hsl(215, 20%, 70%)" },
    footerActionLink: { color: "hsl(199, 89%, 60%)" },
    footerActionText: { color: "hsl(215, 20%, 55%)" },
    dividerText: { color: "hsl(215, 20%, 45%)" },
    identityPreviewEditButton: { color: "hsl(199, 89%, 60%)" },
    formFieldSuccessText: { color: "hsl(142, 71%, 55%)" },
    alertText: { color: "hsl(210, 40%, 98%)" },
    logoBox: "flex justify-center mb-2",
    logoImage: "w-10 h-10",
    socialButtonsBlockButton:
      "bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl",
    formButtonPrimary:
      "bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all",
    formFieldInput:
      "bg-white/5 border border-white/10 text-foreground rounded-xl focus:border-primary/60 focus:ring-primary/20",
    footerAction: "border-t border-white/8",
    dividerLine: "bg-white/10",
    alert: "rounded-xl border border-white/10",
    otpCodeFieldInput:
      "bg-white/5 border border-white/10 text-foreground rounded-xl",
    formFieldRow: "gap-3",
    main: "gap-4",
  },
};

function SignInPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "hsl(222, 47%, 6%)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="relative w-full max-w-md">
        <SignIn
          routing="path"
          path={`${basePath}/sign-in`}
          signUpUrl={`${basePath}/sign-up`}
        />
      </div>
    </div>
  );
}

function SignUpPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "hsl(222, 47%, 6%)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="relative w-full max-w-md">
        <SignUp
          routing="path"
          path={`${basePath}/sign-up`}
          signInUrl={`${basePath}/sign-in`}
          afterSignUpUrl={`${basePath}/onboarding`}
        />
      </div>
    </div>
  );
}

function HomeRedirect() {
  return <Home />;
}

function DashboardPage() {
  return (
    <>
      <Show when="signed-in">
        <UserDashboard />
      </Show>
      <Show when="signed-out">
        <Redirect to="/" />
      </Show>
    </>
  );
}

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

function UserDashboard() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const firstName = (user?.firstName || user?.unsafeMetadata?.storeName as string) || "there";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(222, 47%, 6%)" }}>
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Navbar */}
      <div
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: "rgba(14,165,233,0.1)" }}
      >
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

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome to ROASTrack, {firstName}
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Get set up in 3 simple steps.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-3 mb-8">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all group"
                style={{
                  background: "hsl(222, 47%, 9%)",
                  border: "1px solid rgba(14,165,233,0.14)",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(14,165,233,0.32)")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(14,165,233,0.14)")}
              >
                {/* Step number + icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(14,165,233,0.1)", color: "hsl(199,89%,48%)" }}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium" style={{ color: "hsl(199,89%,48%)" }}>
                      Step {step.num}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white">{step.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {step.desc}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => {
                    if (step.num === 1) setLocation("/connect-store");
                    if (step.num === 2) setLocation("/install-pixel");
                    if (step.num === 3) setLocation("/add-influencer");
                  }}
                  className="shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: "rgba(14,165,233,0.12)",
                    color: "hsl(199,89%,48%)",
                    border: "1px solid rgba(14,165,233,0.25)",
                  }}
                  onMouseEnter={e => {
                    const b = e.currentTarget;
                    b.style.background = "hsl(199,89%,48%)";
                    b.style.color = "hsl(222,47%,6%)";
                    b.style.border = "1px solid hsl(199,89%,48%)";
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget;
                    b.style.background = "rgba(14,165,233,0.12)";
                    b.style.color = "hsl(199,89%,48%)";
                    b.style.border = "1px solid rgba(14,165,233,0.25)";
                  }}
                >
                  {step.action}
                </button>
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setLocation("/")}
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              Skip for now
            </button>
            <button
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

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey!}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to your ROASTrack account",
          },
        },
        signUp: {
          start: {
            title: "Create your account",
            subtitle: "Start tracking influencer ROI for free",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ClerkQueryClientCacheInvalidator />
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route path="/onboarding" component={OnboardingPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/connect-store" component={ConnectStorePage} />
            <Route path="/install-pixel" component={InstallPixelPage} />
            <Route path="/add-influencer" component={AddInfluencerPage} />
            <Route path="/main-dashboard" component={MainDashboard} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function PublicOnlyRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/connect-store" component={ConnectStorePage} />
          <Route path="/install-pixel" component={InstallPixelPage} />
          <Route path="/add-influencer" component={AddInfluencerPage} />
          <Route path="/main-dashboard" component={MainDashboard} />
          <Route component={NotFound} />
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      {clerkPubKey ? <ClerkProviderWithRoutes /> : <PublicOnlyRoutes />}
    </WouterRouter>
  );
}

export default App;
