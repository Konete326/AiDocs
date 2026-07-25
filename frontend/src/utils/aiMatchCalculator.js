export const calculateAiPresetMatch = (cardId = '', projectTitle = '', wizardAnswers = {}) => {
  const text = `${projectTitle} ${wizardAnswers.projectDescription || ''} ${wizardAnswers.industry || ''}`.toLowerCase();
  
  let score = 85;

  if (cardId === 'nextjs_fullstack') {
    if (text.includes('saas') || text.includes('app') || text.includes('web')) score += 11;
    else score += 7;
  } else if (cardId === 'python_fastapi') {
    if (text.includes('ai') || text.includes('data') || text.includes('machine') || text.includes('ml')) score += 13;
    else score += 5;
  } else if (cardId === 'mern_stack') {
    if (text.includes('mern') || text.includes('express') || text.includes('node')) score += 11;
    else score += 6;
  } else if (cardId === 'dotnet_csharp') {
    if (text.includes('enterprise') || text.includes('fintech') || text.includes('bank') || text.includes('healthcare')) score += 12;
    else score += 2;
  } else if (cardId === 'nextjs_decoupled') {
    if (text.includes('microservice') || text.includes('api') || text.includes('decoupled')) score += 11;
    else score += 4;
  } else if (cardId === 'php_laravel') {
    if (text.includes('rapid') || text.includes('crud') || text.includes('portal')) score += 9;
    else score += 3;
  } else if (cardId === 'react_spa') {
    if (text.includes('dashboard') || text.includes('spa') || text.includes('client')) score += 10;
    else score += 4;
  }

  return Math.min(Math.max(score, 80), 98);
};
