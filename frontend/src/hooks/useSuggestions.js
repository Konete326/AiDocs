import { useState, useEffect, useRef, useCallback } from 'react';
import { getAISuggestions } from '../services/suggestionService';

const SEED_SUGGESTIONS = {
  title: {
    saas: [
      ['SyncFlow Pro', 'CloudPulse Engine', 'OmniDraft AI'],
      ['TaskSphere SaaS', 'AutoOps Cloud', 'FlowStack Platform'],
      ['PulseMetrics Hub', 'DataMesh Pro', 'OmniScale AI']
    ],
    mobile: [
      ['PocketMate App', 'SwiftDash Mobile', 'NovaPulse'],
      ['GoTrack Daily', 'SnapHabit Mobile', 'ZenPocket Pro'],
      ['PulseRun App', 'FlashRoute Mobile', 'MicroHabits']
    ],
    ai: [
      ['BrainCraft AI', 'CogniSphere Studio', 'NeuralFlow Hub'],
      ['PromptSmith AI', 'Synthetix Engine', 'AuraMind Studio'],
      ['NexusIntelligence', 'VisionGen AI', 'DeepScribe Pro']
    ],
    ecommerce: [
      ['ShopVibe Store', 'VendorVault Commerce', 'CartPulse'],
      ['OmniCart Store', 'PrimeVault Commerce', 'QuickCheckout'],
      ['LuxeMart Direct', 'TrendSphere Store', 'SwiftDrop Commerce']
    ],
    marketplace: [
      ['TradeHaven Platform', 'MarketPulse Network', 'OmniExchange'],
      ['SkillBridge Market', 'LocalCrafters Hub', 'TalentMesh Pro'],
      ['ServiceHive Direct', 'GlobalEscrow Network', 'PeerVault Platform']
    ],
    other: [
      ['VisionCraft Pro', 'NexusFlow Studio', 'ApexPulse'],
      ['IdeaForge Hub', 'NovaStack Engine', 'CoreMatrix'],
      ['OmniFlow Studio', 'VertexCraft', 'EchoPulse App']
    ]
  },
  problemStatement: {
    saas: [
      [
        'Teams waste over 10 hours weekly manually organizing unstructured workflow data across tools.',
        'Existing enterprise solutions are overly complex, expensive, and lack real-time AI automation.',
        'Small businesses struggle to maintain data sync and security without dedicated IT staff.'
      ],
      [
        'Modern startups lose revenue due to slow customer onboarding and disconnected analytics dashboards.',
        'Remote engineering teams lack unified visibility into cross-project dependencies and sprint blockers.',
        'Operations managers face excessive overhead coordinating multi-tenant cloud permissions.'
      ]
    ],
    mobile: [
      [
        'Users face friction managing daily tasks on mobile due to cluttered and slow interfaces.',
        'Consumers lack an instant offline-first mobile app that seamlessly syncs across devices.',
        'Field workers cannot easily access or update critical records without desktop access.'
      ],
      [
        'Mobile professionals struggle to track personal milestones without tedious manual data entry.',
        'Consumers experience high battery drain and slow load times on legacy utility applications.',
        'Commuters lose productivity due to unreliable cloud connections in transit.'
      ]
    ],
    ai: [
      [
        'Content creators spend hours manually editing media without intelligent automated assistants.',
        'Developers spend excessive time reading raw documentation rather than generating working code.',
        'Businesses miss valuable insights because unstructured customer feedback isn\'t analyzed automatically.'
      ],
      [
        'Marketing teams waste time drafting repetitive copy instead of focusing on campaign strategy.',
        'Data analysts struggle to transform multi-source CSV files into production-ready schemas.',
        'Founders struggle to validate architecture specs without hiring expensive domain architects.'
      ]
    ],
    ecommerce: [
      [
        'Online shoppers abandon carts because product personalization and real-time support are missing.',
        'Independent merchants struggle to compete with large marketplaces due to high transaction fees.',
        'Stores face inventory stockouts and delivery delays without predictive restocking analytics.'
      ],
      [
        'Shoppers struggle to find authentic peer reviews and transparent return policies on niche storefronts.',
        'Boutique brands face high acquisition costs without automated retention and loyalty funnels.',
        'Drop-shippers encounter shipping disputes due to disconnected supplier tracking APIs.'
      ]
    ],
    marketplace: [
      [
        'Buyers and sellers face high platform commissions and lack verified trust and safety guarantees.',
        'Service providers struggle to find targeted local clients without spending heavily on ads.',
        'Cross-border buyers face currency conversion friction and slow escrow payouts.'
      ],
      [
        'Independent contractors lose client billings due to lack of automated milestone releases.',
        'Buyers encounter ghost listings and unresponsive sellers on traditional classified boards.',
        'Freelancers struggle with fragmented portfolios and delayed dispute settlements.'
      ]
    ]
  },
  targetAudience: {
    saas: [
      ['Product managers, engineering teams, and tech startup founders.'],
      ['Growth marketers, SaaS founders, and operations leads.'],
      ['Enterprise IT administrators and remote engineering leads.']
    ],
    mobile: [
      ['Busy urban professionals, students, and mobile-first workers.'],
      ['Health-conscious millennials, athletes, and daily routine builders.'],
      ['Freelance digital nomads and frequent global travelers.']
    ],
    ai: [
      ['Digital agencies, content creators, and remote software teams.'],
      ['Indie hackers, AI prompt engineers, and product builders.'],
      ['Data science leads, growth teams, and enterprise researchers.']
    ],
    ecommerce: [
      ['D2C brand owners, online shoppers, and retail merchants.'],
      ['Eco-conscious consumers and boutique sustainable brands.'],
      ['Omnichannel retail founders and global inventory managers.']
    ],
    marketplace: [
      ['Local service providers, freelancers, and global buyers.'],
      ['B2B equipment buyers, wholesale suppliers, and vendor networks.'],
      ['Creative artists, vintage collectors, and curated curators.']
    ]
  },
  coreFeatures: {
    saas: [
      ['Real-time collaboration, automated workflows, PDF export, role permissions'],
      ['Multi-tenant dashboards, webhook triggers, analytics graphs, dark mode'],
      ['Kanban task boards, automated alerts, CSV imports, audit logs']
    ],
    mobile: [
      ['Offline-first sync, push notifications, biometrics, dark mode'],
      ['Instant gesture controls, widget extensions, local SQLite cache, cloud backup'],
      ['Cross-device handoff, live location sharing, battery-saver mode']
    ],
    ai: [
      ['AI copilot generation, automated insights, natural language search, export API'],
      ['Prompt chaining playground, multi-model switcher, code synthesizer, markdown exporter'],
      ['Automated knowledge base indexing, semantic memory, real-time agent sidecar']
    ],
    ecommerce: [
      ['One-click checkout, AI product recommendations, inventory sync, loyalty rewards'],
      ['Dynamic tier discounts, multi-currency wallet, instant order tracking, reviews system'],
      ['Subscription rebilling, abandoned cart recovery emails, live chat support']
    ],
    marketplace: [
      ['Escrow payments, verified vendor badges, in-app chat, rating system'],
      ['Milestone contracts, automated dispute resolution, seller payout dashboard, search filters'],
      ['Direct client booking calendar, custom quote builder, portfolio showcases']
    ]
  },
  techPreferences: {
    saas: [
      ['React, Node.js, Express, MongoDB, Tailwind CSS'],
      ['Next.js 14, TypeScript, PostgreSQL, Prisma, Tailwind CSS'],
      ['Vue 3, Fastify, Redis, PostgreSQL, Shadcn-UI']
    ],
    mobile: [
      ['React Native, Expo, Firebase, Node.js'],
      ['Flutter, Dart, Supabase, Node.js backend'],
      ['Swift / Kotlin Native, GraphQL API, PostgreSQL']
    ],
    ai: [
      ['Next.js, Python FastAPI, OpenAI / Gemini API, PostgreSQL, Redis'],
      ['React, Node.js Express, LangChain, Pinecone Vector DB, Tailwind CSS'],
      ['Nuxt 3, Python PyTorch, Supabase Vector, Anthropic Claude API']
    ],
    ecommerce: [
      ['Next.js, Shopify Storefront API, Tailwind CSS, Stripe'],
      ['React, Medusa.js Headless Engine, PostgreSQL, Stripe'],
      ['Vue 3, Node.js REST API, MongoDB Atlas, PayPal SDK']
    ],
    marketplace: [
      ['React, Node.js, PostgreSQL, Prisma, Stripe Connect'],
      ['Next.js, Supabase Database, Tailwind CSS, Stripe Treasury'],
      ['React, Express, MongoDB, Socket.io, Stripe Custom Connect']
    ]
  },
  monetizationModel: {
    saas: [
      ['Freemium SaaS subscription ($19/mo Pro, $49/mo Team)'],
      ['Usage-based tiered billing per active user seat ($15/seat/month)'],
      ['Annual flat-rate subscription ($299/yr) with 14-day free trial']
    ],
    mobile: [
      ['In-app subscription with 7-day free trial ($4.99/mo)'],
      ['One-time lifetime premium unlock ($29.99)'],
      ['Freemium with rewarded ads & optional Pro tier']
    ],
    ai: [
      ['Pay-as-you-go API credits + monthly tier ($29/mo starter)'],
      ['Token-based credit packs ($10 per 100k AI runs)'],
      ['Enterprise licensing with custom dedicated LLM instances']
    ],
    ecommerce: [
      ['Store commission fee (3-5%) + premium merchant listing tier'],
      ['Direct retail margin markup with seasonal bundle promotions'],
      ['Monthly merchant subscription ($29/mo) + payment gateway fee']
    ],
    marketplace: [
      ['Percentage-based transaction fee (5-8%) on completed deals'],
      ['Featured seller placement fee + 4% escrow processing fee'],
      ['Buyer protection fee ($1.99 per order) + vendor membership']
    ]
  },
  additionalContext: {
    saas: [
      ['Zero-setup instant cloud sync with enterprise-grade security.'],
      ['SOC2 compliant infrastructure with 99.99% uptime guarantee.'],
      ['Grounded AI assistance with automated codebase documentation.']
    ],
    mobile: [
      ['Optimized for 60FPS smooth performance and low battery usage.'],
      ['Full offline caching with zero-delay background sync.'],
      ['Adaptive layout supporting iOS Dynamic Island and Android widgets.']
    ],
    ai: [
      ['Powered by state-of-the-art LLMs for instant context accuracy.'],
      ['Sub-second generation latency with streaming token delivery.'],
      ['Strict zero-retention data privacy guarantees for enterprise clients.']
    ],
    ecommerce: [
      ['Built-in SEO and mobile-first responsive checkout.'],
      ['Instant 1-second page loads with edge cached static catalogs.'],
      ['Automated fraud detection and chargeback protection.']
    ],
    marketplace: [
      ['Integrated dispute resolution and instant wallet payouts.'],
      ['Bank-grade KYC identity verification for all registered merchants.'],
      ['Bi-directional review system with anti-fraud sentiment scoring.']
    ]
  }
};

function getSeedSet(projectTitle, projectType, fieldName, variationIndex = 0) {
  const type = (projectType || 'saas').toLowerCase();
  const fieldSeeds = SEED_SUGGESTIONS[fieldName] || {};
  const typeSets = fieldSeeds[type] || fieldSeeds['saas'] || [];

  if (typeSets.length === 0) return [];
  const selectedSet = typeSets[variationIndex % typeSets.length] || typeSets[0];

  const title = (projectTitle || '').trim();
  if (title && fieldName === 'title') {
    const prefixes = ['Pro', 'AI', 'Hub', 'Cloud', 'Studio', 'Pulse'];
    const p1 = prefixes[variationIndex % prefixes.length];
    const p2 = prefixes[(variationIndex + 1) % prefixes.length];
    const p3 = prefixes[(variationIndex + 2) % prefixes.length];
    return [`${title} ${p1}`, `Smart ${title}`, `${title} ${p3}`];
  }

  return selectedSet;
}

export function useSuggestions(projectTitle, projectType, fieldName, currentValue, wizardAnswers = {}) {
  const [variationIndex, setVariationIndex] = useState(0);
  const [suggestions, setSuggestions] = useState(() =>
    getSeedSet(projectTitle, projectType, fieldName, 0)
  );
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);

  const fetchLiveSuggestions = useCallback(async (vIndex = variationIndex) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);

    try {
      const results = await getAISuggestions(
        projectTitle,
        projectType,
        fieldName,
        currentValue,
        { ...wizardAnswers, variationIndex: vIndex }
      );

      if (!controller.signal.aborted && Array.isArray(results) && results.length > 0) {
        setSuggestions(results.slice(0, 3));
      }
    } catch {
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [projectTitle, projectType, fieldName, currentValue, wizardAnswers, variationIndex]);

  useEffect(() => {
    const seed = getSeedSet(projectTitle, projectType, fieldName, variationIndex);
    setSuggestions(seed);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchLiveSuggestions(variationIndex);
    }, 120);

    return () => {
      clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [projectTitle, projectType, fieldName, variationIndex]);

  const refresh = useCallback(() => {
    const nextIndex = variationIndex + 1;
    setVariationIndex(nextIndex);
    const nextSeed = getSeedSet(projectTitle, projectType, fieldName, nextIndex);
    setSuggestions(nextSeed);
    fetchLiveSuggestions(nextIndex);
  }, [variationIndex, projectTitle, projectType, fieldName, fetchLiveSuggestions]);

  return { suggestions, isLoading, refresh };
}
