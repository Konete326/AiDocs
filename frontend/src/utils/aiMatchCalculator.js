export const calculateAiPresetMatch = (cardId = '', projectTitle = '', wizardAnswers = {}, projectType = '') => {
  const selectedTech = (wizardAnswers.techPreferences || '').toLowerCase();
  const type = (projectType || '').toLowerCase();
  const title = (projectTitle || '').toLowerCase();
  const features = Array.isArray(wizardAnswers.coreFeatures) ? wizardAnswers.coreFeatures.join(' ').toLowerCase() : '';
  const context = `${title} ${features} ${wizardAnswers.problemStatement || ''} ${wizardAnswers.targetAudience || ''}`.toLowerCase();

  const isFlutterPreferred = selectedTech.includes('flutter') || selectedTech.includes('dart');
  const isReactNativePreferred = selectedTech.includes('react-native') || selectedTech.includes('react native') || selectedTech.includes('expo');
  const isSwiftPreferred = selectedTech.includes('swift') || selectedTech.includes('ios');
  const isKotlinPreferred = selectedTech.includes('kotlin') || selectedTech.includes('android');
  const isPythonPreferred = selectedTech.includes('python') || selectedTech.includes('fastapi') || selectedTech.includes('django');
  const isNextPreferred = selectedTech.includes('next') || selectedTech.includes('next.js') || selectedTech.includes('nextjs');
  const isMernPreferred = selectedTech.includes('mern') || selectedTech.includes('express') || selectedTech.includes('node');
  const isDotnetPreferred = selectedTech.includes('.net') || selectedTech.includes('c#');
  const isLaravelPreferred = selectedTech.includes('laravel') || selectedTech.includes('php');

  const isMobileProject = type === 'mobile' || context.includes('mobile') || context.includes('ios') || context.includes('android') || context.includes('app');
  const isEcommerceProject = type === 'ecommerce' || type === 'marketplace' || context.includes('shop') || context.includes('store') || context.includes('cart') || context.includes('checkout') || context.includes('stripe');
  const isAiProject = type === 'ai' || context.includes('ai') || context.includes('llm') || context.includes('gpt') || context.includes('rag') || context.includes('machine learning');

  let score = 70;
  let label = 'Viable Alternative';
  let isTop = false;

  switch (cardId) {
    case 'flutter_mobile':
      if (isFlutterPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 95;
        label = '⭐ Best for Cross-Platform';
        isTop = true;
      } else if (isEcommerceProject) {
        score = 82;
        label = '📱 Mobile App Extension';
      } else {
        score = 48;
        label = '⚠️ Mobile Only Stack';
      }
      break;

    case 'react_native_expo':
      if (isReactNativePreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 92;
        label = '✨ Top Mobile Choice';
      } else if (isEcommerceProject) {
        score = 80;
        label = '📱 Mobile App Extension';
      } else {
        score = 45;
        label = '⚠️ Mobile Only Stack';
      }
      break;

    case 'swift_native':
      if (isSwiftPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 86;
        label = '🍎 iOS Native Spec';
      } else {
        score = 40;
        label = '⚠️ iOS Exclusive';
      }
      break;

    case 'kotlin_native':
      if (isKotlinPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 85;
        label = '🤖 Android Native Spec';
      } else {
        score = 40;
        label = '⚠️ Android Exclusive';
      }
      break;

    case 'nextjs_commerce':
      if (isEcommerceProject) {
        score = isNextPreferred ? 98 : 96;
        label = '🛒 Perfect for Commerce';
        isTop = true;
      } else if (isMobileProject) {
        score = 64;
        label = '🌐 Web Commerce Backend';
      } else {
        score = 78;
        label = '✨ Web SaaS & Billing';
      }
      break;

    case 'python_fastapi':
      if (isPythonPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isAiProject) {
        score = 97;
        label = '🤖 AI & Pipeline Native';
        isTop = true;
      } else if (isMobileProject) {
        score = 88;
        label = '⚡ Mobile Async Backend';
      } else {
        score = 80;
        label = '⚡ High-Speed Async API';
      }
      break;

    case 'nextjs_fullstack':
      if (isNextPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 60;
        label = '⚠️ Web Focused Stack';
      } else if (isEcommerceProject) {
        score = 90;
        label = '✨ High SaaS Match';
      } else {
        score = 94;
        label = '⭐ Modern Web Standard';
        isTop = true;
      }
      break;

    case 'mern_stack':
      if (isMernPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 72;
        label = '🔌 Node API for Mobile';
      } else if (isEcommerceProject) {
        score = 88;
        label = '🛍️ Fullstack JavaScript';
      } else {
        score = 91;
        label = '✨ Standard Fullstack';
      }
      break;

    case 'dotnet_csharp':
      if (isDotnetPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 65;
        label = '🏢 Enterprise Backend';
      } else if (context.includes('enterprise') || context.includes('fintech') || context.includes('bank')) {
        score = 95;
        label = '🏢 Enterprise Banking Spec';
        isTop = true;
      } else {
        score = 68;
        label = '🏢 Heavy Enterprise';
      }
      break;

    case 'php_laravel':
      if (isLaravelPreferred) {
        score = 98;
        label = '⭐ Best Match (Chosen Stack)';
        isTop = true;
      } else if (isMobileProject) {
        score = 62;
        label = '🌐 Laravel API for Mobile';
      } else if (isEcommerceProject) {
        score = 86;
        label = '⚡ Rapid Marketplace';
      } else {
        score = 75;
        label = '⚡ Rapid MVC / CRUD';
      }
      break;

    case 'react_spa':
      if (isMobileProject) {
        score = 55;
        label = '⚠️ Web SPA Client Only';
      } else {
        score = 82;
        label = '⚡ Lightweight Dashboard';
      }
      break;

    default:
      score = 75;
      label = 'Viable Option';
  }

  return { score, label, isTop };
};
