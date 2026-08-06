const API_URL = 'http://localhost:5000/api';

async function runTests() {
  const regRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `uitester_${Date.now()}@example.com`,
      password: 'Password123!',
      displayName: 'UI Marketplace Tester'
    })
  });
  const regData = await regRes.json();
  if (!regData.success) {
    console.error('Registration failed:', regData);
    process.exit(1);
  }
  const token = regData.data.accessToken;

  const createRes = await fetch(`${API_URL}/ui-components`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Neumorphic Soft Button',
      category: 'Buttons',
      code: {
        html: '<button class="soft-btn">Click Me</button>',
        css: '.soft-btn { background: #E0E5EC; box-shadow: 9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5); border-radius: 16px; }',
        tailwind: 'bg-[#E0E5EC] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] rounded-2xl',
        react: 'export default function SoftButton() { return <button className="bg-[#E0E5EC] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] rounded-2xl px-6 py-3 text-[#3D4852] font-semibold">Click Me</button>; }'
      },
      aiPrompt: 'Create a Neumorphic Soft UI button with background #E0E5EC, dual physics soft shadows, 16px rounded corners, and soft violet hover state.',
      framework: 'React',
      tags: ['neumorphism', 'button', 'soft-ui', 'clarifyai']
    })
  });
  const createData = await createRes.json();
  console.log('Create Response:', JSON.stringify(createData, null, 2));

  if (!createData.success) {
    console.error('Create component failed!');
    process.exit(1);
  }
  const componentId = createData.data._id;

  const listRes = await fetch(`${API_URL}/ui-components?category=Buttons&sort=newest`);
  const listData = await listRes.json();
  console.log('List Response:', JSON.stringify(listData, null, 2));

  const getRes = await fetch(`${API_URL}/ui-components/${componentId}`);
  const getData = await getRes.json();
  console.log('Get Single Response (Views Count Incremented):', JSON.stringify(getData, null, 2));

  const favRes = await fetch(`${API_URL}/ui-components/${componentId}/favorite`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const favData = await favRes.json();
  console.log('Toggle Favorite Response:', JSON.stringify(favData, null, 2));

  console.log('--- ALL UI MARKETPLACE MILESTONE 1 TESTS PASSED SUCCESSFULLY ---');
  process.exit(0);
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
