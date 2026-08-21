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
        'Teams waste over 10 hours weekly manually organizing unstructured workflow data across disparate SaaS tools.',
        'Existing enterprise solutions are overly complex, expensive, and lack real-time AI-guided workflow automation.',
        'Small businesses struggle to maintain data sync, customer onboarding, and access control without dedicated IT staff.'
      ],
      [
        'Startups lose recurring revenue due to slow client onboarding and disconnected analytics dashboards.',
        'Engineering teams lack unified visibility into cross-project dependencies and sprint blockers across repositories.',
        'Operations managers face excessive overhead coordinating multi-tenant cloud permissions and audit compliance.'
      ]
    ],
    mobile: [
      [
        'Users face friction managing daily tasks on mobile due to cluttered interfaces and slow navigation.',
        'Consumers lack an instant offline-first mobile app that seamlessly syncs across multiple personal devices.',
        'Field workers cannot easily access or update critical business records on mobile without desktop connectivity.'
      ],
      [
        'Mobile professionals struggle to track personal habits and milestones without tedious manual data entry.',
        'Consumers experience high battery drain and slow load times on legacy utility applications.',
        'Commuters lose productivity due to unreliable cloud connections and lack of offline-first mobile features.'
      ]
    ],
    ai: [
      [
        'Content creators spend hours manually editing media without intelligent automated assistants.',
        'Developers spend excessive time reading raw documentation rather than generating production-ready code.',
        'Businesses miss valuable insights because unstructured customer feedback isn\'t analyzed automatically.'
      ],
      [
        'Marketing teams waste time drafting repetitive copy instead of focusing on data-driven campaign strategy.',
        'Data analysts struggle to transform multi-source CSV files and API logs into production-ready schemas.',
        'Founders struggle to validate technical architecture specs without hiring expensive domain architects.'
      ]
    ],
    ecommerce: [
      [
        'Online shoppers abandon carts because product personalization, instant checkout, and live support are missing.',
        'Independent merchants struggle to compete with large marketplaces due to high commission fees and complex setups.',
        'Stores face inventory stockouts and delivery delays without automated predictive restocking analytics.'
      ],
      [
        'Shoppers struggle to find authentic peer reviews and transparent return policies on niche storefronts.',
        'Boutique brands face high customer acquisition costs without automated retention and loyalty funnels.',
        'Drop-shippers encounter shipping disputes due to disconnected supplier tracking APIs and inventory delays.'
      ]
    ],
    marketplace: [
      [
        'Buyers and sellers face high platform commissions and lack verified trust and safety guarantees.',
        'Service providers struggle to find targeted local clients without spending heavily on ads and agencies.',
        'Cross-border buyers face currency conversion friction and slow escrow payouts on traditional platforms.'
      ],
      [
        'Independent contractors lose client billings due to lack of automated milestone escrow releases.',
        'Buyers encounter ghost listings and unresponsive sellers on traditional classified boards.',
        'Freelancers struggle with fragmented portfolios, payment disputes, and delayed settlements.'
      ]
    ]
  },
  targetAudience: {
    saas: [
      [
        'Product managers, engineering teams, and tech startup founders building cloud workflows.',
        'Operations leads and enterprise IT administrators managing multi-tenant team permissions.',
        'Early-stage founders and agency operators looking to automate client onboarding and reporting.'
      ],
      [
        'Remote software development agencies coordinating cross-functional teams across time zones.',
        'Growth marketers and customer success teams tracking real-time retention and churn metrics.',
        'Small business operators scaling digital infrastructure without hiring dedicated IT staff.'
      ]
    ],
    mobile: [
      [
        'Busy urban professionals, students, and mobile-first workers seeking frictionless productivity.',
        'Health-conscious individuals, athletes, and routine builders tracking daily personal goals.',
        'Freelance digital nomads and frequent travelers requiring reliable offline-first mobile tools.'
      ],
      [
        'On-the-go sales executives and field technicians needing instant mobile CRM updates.',
        'College students and self-learners organizing daily study routines and class schedules.',
        'Everyday smartphone users looking for minimalist, fast, and battery-efficient utilities.'
      ]
    ],
    ai: [
      [
        'Digital agencies, content creators, and remote software teams automating creative pipelines.',
        'Indie hackers, AI prompt engineers, and product builders developing intelligent web tools.',
        'Data science leads, growth teams, and enterprise researchers analyzing unstructured data.'
      ],
      [
        'Marketing copywriters, SEO specialists, and media producers accelerating content production.',
        'Customer support leads automating resolution of high-volume incoming support tickets.',
        'Startup founders prototyping software specifications with natural language AI copilots.'
      ]
    ],
    ecommerce: [
      [
        'D2C brand owners, online shoppers, and retail merchants selling direct-to-consumer goods.',
        'Eco-conscious consumers and boutique sustainable brands seeking ethical shopping options.',
        'Omnichannel retail founders and global inventory managers automating multi-store sync.'
      ],
      [
        'Independent craft makers and artisanal sellers moving away from high-fee marketplaces.',
        'Subscription box founders managing recurring monthly deliveries and customer billing.',
        'Digital product creators selling online courses, downloadable assets, and software licenses.'
      ]
    ],
    marketplace: [
      [
        'Local service providers, freelancers, and global clients seeking verified contract work.',
        'B2B equipment buyers, wholesale suppliers, and vendor networks coordinating bulk orders.',
        'Creative artists, vintage collectors, and curated curators trading verified authentic items.'
      ],
      [
        'Independent contractors and project managers needing secure milestone-based escrow payouts.',
        'Local homeowners and verified trade professionals booking home improvement services.',
        'Gig economy workers looking for peer-to-peer equipment rentals and service exchanges.'
      ]
    ]
  },
  coreFeatures: {
    saas: [
      [
        'Real-time team collaboration, automated workflow triggers, PDF/CSV export, role permissions',
        'Multi-tenant workspace dashboard, webhook integrations, analytics graphs, dark mode',
        'Kanban task tracking boards, automated email alerts, CSV bulk imports, security audit logs'
      ],
      [
        'Single Sign-On (SSO) authentication, granular API access keys, usage metering, team billing',
        'Customizable reporting widgets, activity feeds, automated weekly digest emails, Slack bot',
        'Automated database backups, SOC2 compliance logging, custom domain mapping, white-labeling'
      ]
    ],
    mobile: [
      [
        'Offline-first sync engine, push notifications, biometrics authentication, dark mode UI',
        'Instant gesture controls, widget extensions, local SQLite cache, automatic cloud backup',
        'Cross-device handoff, live location sharing, background sync, battery-saver mode'
      ],
      [
        'One-tap biometric login, camera barcode scanning, interactive audio notes, haptic feedback',
        'Home screen quick action shortcuts, customizable color themes, Apple Watch / WearOS sync',
        'Encrypted local vault, seamless PDF exports, multi-language localization, low-data mode'
      ]
    ],
    ai: [
      [
        'AI copilot generation, automated insights, natural language semantic search, export REST API',
        'Prompt chaining playground, multi-model switcher, code synthesizer, markdown exporter',
        'Automated knowledge base indexing, semantic vector memory, real-time agent sidecar'
      ],
      [
        'Context-aware text suggestions, automatic document summarization, voice transcription',
        'Custom fine-tuned prompts library, rate limit protection, streaming token response delivery',
        'Multi-modal image-to-text parser, automated citations, output quality score evaluations'
      ]
    ],
    ecommerce: [
      [
        'One-click fast checkout, AI product recommendations, inventory sync, loyalty rewards system',
        'Dynamic tier discounts, multi-currency wallet, instant order tracking, reviews & ratings system',
        'Subscription rebilling, abandoned cart recovery emails, live customer support chat'
      ],
      [
        'Visual product configurator, flash sale countdown timers, instant refund processing',
        'Wholesale B2B pricing rules, automated shipping label generation, tax compliance engine',
        'Gift card management, customer referral affiliate program, real-time stock alerts'
      ]
    ],
    marketplace: [
      [
        'Escrow payment protection, verified vendor badges, in-app messaging, rating & review system',
        'Milestone contracts, automated dispute resolution, seller payout dashboard, search filters',
        'Direct client booking calendar, custom quote builder, portfolio showcases, instant alerts'
      ],
      [
        'Two-sided user verification, commission fee splitting, automated tax invoice generation',
        'Real-time job bidding portal, buyer escrow hold, identity verification badges (KYC)',
        'Featured seller spotlight listings, custom booking deposit options, automated reminders'
      ]
    ]
  },
  techPreferences: {
    saas: [
      [
        'React, Node.js, Express, MongoDB, Tailwind CSS, Stripe Billing',
        'Next.js 15, TypeScript, PostgreSQL, Prisma ORM, Shadcn-UI, Redis',
        'Vue 3, Fastify, PostgreSQL, Docker, AWS S3, Tailwind CSS'
      ],
      [
        'React, NestJS, PostgreSQL, TypeORM, Redis Cache, Stripe API',
        'Next.js 15, Supabase, Tailwind CSS, TypeScript, SendGrid, Vercel',
        'Angular, Go backend, PostgreSQL, Tailwind CSS, GitHub Actions'
      ]
    ],
    mobile: [
      [
        'React Native, Expo, Firebase, Node.js, Tailwind (NativeWind)',
        'Flutter, Dart, Supabase Database, Node.js REST API, SQLite Cache',
        'Swift (iOS) & Kotlin (Android) Native, GraphQL API, PostgreSQL'
      ],
      [
        'React Native, TypeScript, WatermelonDB (Offline-first), Express API',
        'Flutter, Riverpod State, Firebase Cloud Firestore, Stripe Mobile SDK',
        'Ionic React, Capacitor, Node.js, MongoDB Atlas, Push Notifications'
      ]
    ],
    ai: [
      [
        'Next.js 15, Python FastAPI, OpenAI / Gemini API, PostgreSQL, Redis',
        'React, Node.js Express, LangChain, Pinecone Vector DB, Tailwind CSS',
        'Nuxt 3, Python PyTorch, Supabase Vector, Anthropic Claude API'
      ],
      [
        'Next.js, Python FastAPI, Qdrant Vector Engine, Google Gemini Pro 1.5',
        'React, Express, Ollama Local Models, MongoDB, Tailwind CSS',
        'SvelteKit, Python Backend, ChromaDB, OpenAI Whisper, Tailwind CSS'
      ]
    ],
    ecommerce: [
      [
        'Next.js 15, Shopify Storefront API, Tailwind CSS, Stripe Elements',
        'React, Medusa.js Headless Commerce, PostgreSQL, Redis, Stripe',
        'Vue 3, Node.js REST API, MongoDB Atlas, PayPal & Stripe Checkout'
      ],
      [
        'Next.js, Strapi Headless CMS, PostgreSQL, Stripe Custom Checkout',
        'React, Node.js Express, Redis, Cloudinary CDN, Stripe Webhooks',
        'Remix, Shopify GraphQL API, Tailwind CSS, Vercel Edge Functions'
      ]
    ],
    marketplace: [
      [
        'React, Node.js, PostgreSQL, Prisma, Stripe Connect, Tailwind CSS',
        'Next.js 15, Supabase Database, Tailwind CSS, Stripe Custom Connect',
        'React, Express, MongoDB, Socket.io (Realtime Chat), Stripe Escrow'
      ],
      [
        'Vue 3, Node.js REST API, PostgreSQL, Pusher WebSockets, Stripe Connect',
        'Next.js, NestJS Backend, PostgreSQL, Redis, Stripe Managed Accounts',
        'React, Firebase Auth & Firestore, Stripe Connect Standard, SendGrid'
      ]
    ]
  },
  monetizationModel: {
    saas: [
      [
        'Tiered SaaS subscription ($19/mo Starter, $49/mo Pro, $129/mo Team)',
        'Usage-based billing per active user seat ($15/seat/month) with 14-day free trial',
        'Annual flat-rate enterprise subscription ($499/yr) with premium support'
      ],
      [
        'Freemium model with core features free & $29/mo unlock for advanced automation',
        'Volume-based API credit pricing ($0.01 per transaction after 1,000 free runs)',
        'White-label enterprise licensing fee ($1,500/year) for agency teams'
      ]
    ],
    mobile: [
      [
        'In-app recurring subscription ($4.99/month or $39.99/year) with 7-day free trial',
        'One-time lifetime premium unlock ($29.99) with all pro features enabled',
        'Freemium with rewarded banner ads and an ad-free Pro upgrade ($2.99/mo)'
      ],
      [
        'Consumable in-app coin packs ($1.99 - $19.99) for on-demand power features',
        'Monthly family sharing plan ($7.99/mo) covering up to 5 linked accounts',
        'Free base app with paid micro-purchases for custom themes and export tools'
      ]
    ],
    ai: [
      [
        'Pay-as-you-go API credits + monthly starter tier ($29/mo for 500k tokens)',
        'Token-based credit packs ($10 per 100k AI runs) with volume discounts',
        'Enterprise dedicated instance licensing ($499/mo) with SLA guarantee'
      ],
      [
        'Tiered seat subscription ($39/seat/mo) including unlimited base queries',
        'Freemium offering 50 free AI queries per month, then $19/mo Pro tier',
        'Custom workflow template sales marketplace (70/30 creator revenue split)'
      ]
    ],
    ecommerce: [
      [
        'Direct retail margin markup (30-50%) with seasonal product bundle promotions',
        'Store commission fee (3-5%) + premium merchant listing membership tier',
        'Monthly merchant subscription ($29/mo) + 1.5% transaction processing fee'
      ],
      [
        'VIP membership subscription ($9.99/mo) giving free shipping and 15% discount',
        'Wholesale volume pricing tiers with minimum order quantity discounts',
        'Affiliate referral commission model (10% payout on referred checkouts)'
      ]
    ],
    marketplace: [
      [
        'Percentage-based transaction commission (5-8%) on every completed order',
        'Featured seller placement fee ($19/listing) + 3% escrow processing fee',
        'Buyer protection fee ($1.99 per order) + verified seller membership ($29/mo)'
      ],
      [
        'Two-sided commission: 5% from buyer + 5% from seller on completed contracts',
        'Monthly unlimited bidding subscription for service providers ($39/mo)',
        'Lead purchase fee ($5 to $15 per verified client contact details)'
      ]
    ]
  },
  additionalContext: {
    saas: [
      [
        'Zero-setup instant cloud sync with enterprise-grade AES-256 data encryption.',
        'SOC2 and GDPR compliant architecture with guaranteed 99.99% system uptime.',
        'Grounded AI assistance with automated codebase documentation and search.'
      ],
      [
        'Modular plugin architecture allowing seamless third-party extensions.',
        'Granular role-based access control (RBAC) designed for multi-team security.',
        'Optimized for instant sub-second page loads with edge caching and CDN.'
      ]
    ],
    mobile: [
      [
        'Optimized for 60FPS smooth native performance and low battery consumption.',
        'Full offline SQLite caching with zero-delay background cloud synchronization.',
        'Adaptive responsive layout supporting iOS Dynamic Island and Android widgets.'
      ],
      [
        'End-to-end encrypted local storage for maximum user data privacy.',
        'Native haptic feedback and smooth micro-animations on every interaction.',
        'Biometric authentication (FaceID / Fingerprint) for rapid instant login.'
      ]
    ],
    ai: [
      [
        'Powered by state-of-the-art LLMs for high contextual relevance and precision.',
        'Sub-second generation latency with real-time streaming token delivery.',
        'Strict zero-retention data privacy guarantees for sensitive enterprise data.'
      ],
      [
        'Custom fine-tuned prompts engineered specifically for full MERN stack development.',
        'Automated fallback handling across multiple AI providers for 100% uptime.',
        'Context-aware grounding using workspace files, schemas, and live dependencies.'
      ]
    ],
    ecommerce: [
      [
        'Built-in search engine optimization (SEO) and mobile-first responsive checkout.',
        'Instant 1-second page loads with edge-cached product catalogs and fast images.',
        'Automated fraud detection, chargeback protection, and verified customer reviews.'
      ],
      [
        'Integrated multi-currency conversion with real-time exchange rates.',
        'Automated order status notifications via SMS, email, and WhatsApp.',
        'PCI-DSS compliant payment processing with one-click Apple Pay & Google Pay.'
      ]
    ],
    marketplace: [
      [
        'Integrated dispute resolution center and instant bank wallet escrow payouts.',
        'Bank-grade KYC identity verification for all registered merchants and sellers.',
        'Bi-directional review system with automated anti-fraud sentiment scoring.'
      ],
      [
        'Automated contract generation with digital e-signatures for all transactions.',
        'In-app encrypted messaging and audio calling between buyers and sellers.',
        'Geographic search radius matching clients with verified local providers.'
      ]
    ]
  }
};

function getSeedSet(projectTitle, projectType, fieldName, variationIndex = 0) {
  const type = (projectType || 'saas').toLowerCase();
  const fieldSeeds = SEED_SUGGESTIONS[fieldName] || {};
  const typeSets = fieldSeeds[type] || fieldSeeds['saas'] || fieldSeeds['other'] || [];

  if (typeSets.length === 0) return [];
  const rawSet = typeSets[variationIndex % typeSets.length] || typeSets[0] || [];

  let set = Array.isArray(rawSet) ? [...rawSet] : [rawSet];

  const title = (projectTitle || '').trim();
  if (title && fieldName === 'title') {
    const prefixes = ['Pro', 'AI', 'Hub', 'Cloud', 'Studio', 'Pulse', 'Stack', 'Flow', 'Craft'];
    const p1 = prefixes[variationIndex % prefixes.length];
    const p2 = prefixes[(variationIndex + 1) % prefixes.length];
    const p3 = prefixes[(variationIndex + 2) % prefixes.length];
    return [`${title} ${p1}`, `Smart ${title}`, `${title} ${p3}`];
  }

  while (set.length < 3) {
    const backupSet = typeSets[(variationIndex + 1) % typeSets.length] || [];
    for (const item of backupSet) {
      if (!set.includes(item)) {
        set.push(item);
        if (set.length === 3) break;
      }
    }
    if (set.length < 3) break;
  }

  return set.slice(0, 3);
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
        let combined = [...results];
        if (combined.length < 3) {
          const fallback = getSeedSet(projectTitle, projectType, fieldName, vIndex);
          for (const item of fallback) {
            if (!combined.includes(item)) combined.push(item);
            if (combined.length >= 3) break;
          }
        }
        setSuggestions(combined.slice(0, 3));
      }
    } catch {
      if (!controller.signal.aborted) {
        setSuggestions(getSeedSet(projectTitle, projectType, fieldName, vIndex));
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [projectTitle, projectType, fieldName, currentValue, wizardAnswers, variationIndex]);

  useEffect(() => {
    const defaultSeeds = getSeedSet(projectTitle, projectType, fieldName, 0);
    setSuggestions(defaultSeeds);
    setVariationIndex(0);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchLiveSuggestions(0);
    }, 250);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [projectTitle, projectType, fieldName]);

  const refresh = useCallback(() => {
    const nextIndex = variationIndex + 1;
    setVariationIndex(nextIndex);
    const quickSeeds = getSeedSet(projectTitle, projectType, fieldName, nextIndex);
    setSuggestions(quickSeeds);
    fetchLiveSuggestions(nextIndex);
  }, [variationIndex, projectTitle, projectType, fieldName, fetchLiveSuggestions]);

  return {
    suggestions: suggestions && suggestions.length >= 3 ? suggestions : getSeedSet(projectTitle, projectType, fieldName, variationIndex),
    isLoading,
    refresh
  };
}
