export const softwarePlans = [
  {
    name: "Starter Plan",
    price: "19",
    priceLabel: "£19/month",
    summary: "For small businesses starting out",
    features: ["Instant quote generator", "Basic invoice creation", "1 business profile", "Email delivery of quotes/invoices", "Standard templates"]
  },
  {
    name: "Pro Plan",
    price: "49",
    priceLabel: "£49/month",
    summary: "For growing service businesses",
    features: ["Everything in Starter", "AI-powered 3-tier quotes (Basic / Standard / Premium)", "Auto invoice generation after quote acceptance", "Expense tracking (basic)", "Custom branding (logo + colours)", "Stripe payment integration", "Website widget embed"],
    featured: true
  },
  {
    name: "Business Plan",
    price: "99",
    priceLabel: "£99/month",
    summary: "For agencies & high-volume businesses",
    features: ["Everything in Pro", "Unlimited quotes & invoices", "Advanced AI pricing rules (profit control + margins)", "Full expense tracking system", "Real-time profit dashboard", "Multi-user access (team accounts)", "Priority support", "Advanced widget customisation"]
  },
  {
    name: "Agency / White Label",
    price: "199",
    priceLabel: "£199/month",
    summary: "For agencies reselling Fekitech",
    features: ["Everything in Business", "White-label branding (remove Fekitech branding)", "Manage multiple client accounts", "API access", "Custom integrations", "Dedicated onboarding support"]
  }
];

export const transformationPackages = [
  { name: "Starter Package", priceLabel: "From £500 – £1,500", description: "Business audit + structure review", minPrice: "500", maxPrice: "1500" },
  { name: "Growth Package", priceLabel: "From £2,000 – £5,000", description: "Systems + digital transformation setup", minPrice: "2000", maxPrice: "5000" },
  { name: "FOS Implementation (Main Offer)", priceLabel: "From £5,000 – £25,000+", description: "Full business operating system build", minPrice: "5000", maxPrice: "25000", featured: true },
  { name: "Enterprise (Custom)", priceLabel: "Custom pricing", description: "Full transformation + ongoing support" }
];

export const pricingOffers = [
  ...softwarePlans.map(({ name, price, summary }) => ({ name, description: summary, price, unitText: "MONTH" })),
  ...transformationPackages.map(({ name, description, minPrice, maxPrice }) => ({ name, description, minPrice, maxPrice }))
];
