import { useState, useEffect, useRef } from 'react';
import { getAISuggestions } from '../services/suggestionService';

function getInstantSeedSuggestions(projectTitle, projectType, fieldName, currentValue) {
  const title = (projectTitle || currentValue || '').trim();
  const type = (projectType || 'saas').toLowerCase();

  const seeds = {
    title: {
      saas: ['SyncFlow Pro', 'CloudPulse Engine', 'OmniDraft AI'],
      mobile: ['PocketMate App', 'SwiftDash Mobile', 'NovaPulse'],
      ai: ['BrainCraft AI', 'CogniSphere Studio', 'NeuralFlow Hub'],
      ecommerce: ['ShopVibe Store', 'VendorVault Commerce', 'CartPulse'],
      marketplace: ['TradeHaven Platform', 'MarketPulse Network', 'OmniExchange'],
      other: ['VisionCraft Pro', 'NexusFlow Studio', 'ApexPulse']
    },
    problemStatement: {
      saas: [
        'Teams waste over 10 hours weekly manually organizing unstructured workflow data across tools.',
        'Existing enterprise solutions are overly complex, expensive, and lack real-time AI automation.',
        'Small businesses struggle to maintain data sync and security without dedicated IT staff.'
      ],
      mobile: [
        'Users face friction managing daily tasks on mobile due to cluttered and slow interfaces.',
        'Consumers lack an instant offline-first mobile app that seamlessly syncs across devices.',
        'Field workers cannot easily access or update critical records without desktop access.'
      ],
      ai: [
        'Content creators spend hours manually editing media without intelligent automated assistants.',
        'Developers spend excessive time reading raw documentation rather than generating working code.',
        'Businesses miss valuable insights because unstructured customer feedback isn\'t analyzed automatically.'
      ],
      ecommerce: [
        'Online shoppers abandon carts because product personalization and real-time support are missing.',
        'Independent merchants struggle to compete with large marketplaces due to high transaction fees.',
        'Stores face inventory stockouts and delivery delays without predictive restocking analytics.'
      ],
      marketplace: [
        'Buyers and sellers face high platform commissions and lack verified trust and safety guarantees.',
        'Service providers struggle to find targeted local clients without spending heavily on ads.',
        'Cross-border buyers face currency conversion friction and slow escrow payouts.'
      ]
    },
    targetAudience: {
      saas: ['Product managers, engineering teams, and tech startup founders.'],
      mobile: ['Busy urban professionals, students, and mobile-first workers.'],
      ai: ['Digital agencies, content creators, and remote software teams.'],
      ecommerce: ['D2C brand owners, online shoppers, and retail merchants.'],
      marketplace: ['Local service providers, freelancers, and global buyers.']
    },
    coreFeatures: {
      saas: ['Real-time collaboration, automated workflows, PDF export, role permissions'],
      mobile: ['Offline-first sync, push notifications, biometrics, dark mode'],
      ai: ['AI copilot generation, automated insights, natural language search, export API'],
      ecommerce: ['One-click checkout, AI product recommendations, inventory sync, loyalty rewards'],
      marketplace: ['Escrow payments, verified vendor badges, in-app chat, rating system']
    },
    techPreferences: {
      saas: ['React, Node.js, Express, MongoDB, Tailwind CSS'],
      mobile: ['React Native, Expo, Firebase, Node.js'],
      ai: ['Next.js, Python FastAPI, OpenAI / Gemini API, PostgreSQL, Redis'],
      ecommerce: ['Next.js, Shopify Storefront API, Tailwind CSS, Stripe'],
      marketplace: ['React, Node.js, PostgreSQL, Prisma, Stripe Connect']
    },
    monetizationModel: {
      saas: ['Freemium SaaS subscription ($19/mo Pro, $49/mo Team)'],
      mobile: ['In-app subscription with 7-day free trial'],
      ai: ['Pay-as-you-go API credits + monthly tier'],
      ecommerce: ['Store commission fee + premium merchant listing tier'],
      marketplace: ['Percentage-based transaction fee (5-8%) on completed deals']
    },
    additionalContext: {
      saas: ['Zero-setup instant cloud sync with enterprise-grade security.'],
      mobile: ['Optimized for 60FPS smooth performance and low battery usage.'],
      ai: ['Powered by state-of-the-art LLMs for instant context accuracy.'],
      ecommerce: ['Built-in SEO and mobile-first responsive checkout.'],
      marketplace: ['Integrated dispute resolution and instant wallet payouts.']
    }
  };

  if (title) {
    if (fieldName === 'title') {
      return [`${title} Pro`, `Smart ${title}`, `${title} Hub`].slice(0, 3);
    }
    if (fieldName === 'problemStatement') {
      return [
        `Teams struggle with inefficient workflows and high costs when managing ${title}.`,
        `Existing tools for ${title} are slow, complex, and lack modern real-time automation.`,
        `Users face high friction and manual data duplication when setting up ${title}.`
      ];
    }
  }

  const category = seeds[fieldName] || {};
  const typeSeeds = category[type] || category['saas'] || [];
  return typeSeeds.slice(0, 3);
}

export function useSuggestions(projectTitle, projectType, fieldName, currentValue, wizardAnswers = {}) {
  const [suggestions, setSuggestions] = useState(() => 
    getInstantSeedSuggestions(projectTitle, projectType, fieldName, currentValue)
  );
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const lastKeyRef = useRef(null);

  useEffect(() => {
    const instant = getInstantSeedSuggestions(projectTitle, projectType, fieldName, currentValue);
    setSuggestions(instant);

    const answersKey = Object.values(wizardAnswers || {}).join('_');
    const currentKey = `${projectTitle || ''}_${projectType || ''}_${fieldName}_${currentValue || ''}_${answersKey}`;
    if (currentKey === lastKeyRef.current) return;

    clearTimeout(timerRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();

    timerRef.current = setTimeout(async () => {
      lastKeyRef.current = currentKey;
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const results = await getAISuggestions(
          projectTitle,
          projectType,
          fieldName,
          currentValue,
          wizardAnswers
        );

        if (!controller.signal.aborted && Array.isArray(results) && results.length > 0) {
          setSuggestions(results);
        }
      } catch (err) {
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [currentValue, projectTitle, projectType, fieldName]);

  const clearSuggestions = () => setSuggestions([]);

  return { suggestions, isLoading, clearSuggestions };
}
