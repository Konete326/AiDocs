const API_URL = 'http://localhost:5000/api';

async function testAuth() {
  console.log('--- Testing Auth Endpoints ---');
  
  // 1. Register
  const regRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `testuser_${Date.now()}@example.com`,
      password: 'Password123!',
      displayName: 'Test User'
    })
  });
  const regData = await regRes.json();
  console.log('Register Response:', JSON.stringify(regData, null, 2));

  if (!regData.success) {
    console.error('Registration failed!');
    return;
  }

  const { accessToken } = regData.data;

  // 2. Get Me
  const meRes = await fetch(`${API_URL}/users/me`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const meData = await meRes.json();
  console.log('Get Me Response:', JSON.stringify(meData, null, 2));

  // 3. Create Project
  const projRes = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      title: 'Test Project',
      projectType: 'saas',
      wizardAnswers: {
        problemStatement: 'Testing things',
        targetAudience: 'Developers',
        coreFeatures: ['Feature A', 'Feature B'],
        techPreferences: 'MERN',
        monetizationModel: 'SaaS',
        scaleExpectation: 'Small',
        additionalContext: 'None'
      }
    })
  });
  const projData = await projRes.json();
  console.log('Create Project Response:', JSON.stringify(projData, null, 2));
}

testAuth().catch(console.error);
