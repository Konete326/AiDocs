import React, { useState } from 'react';
import api from '../services/api';

const ApiTester = () => {
  const [output, setOutput] = useState('Response will appear here...');
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState('');

  const execute = async (method, url, data = null) => {
    setLoading(true);
    setOutput('Loading...');
    try {
      const res = await api({ method, url, data });
      setOutput(JSON.stringify(res.data, null, 2));
      
      // Auto-grab project ID if creating project so user doesn't have to copy paste!
      if (res.data?.data?._id && url === '/projects') {
          setProjectId(res.data.data._id);
      }
    } catch (err) {
      setOutput(JSON.stringify(err.response?.data || err.message, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const testProjectPayload = {
    title: "Tester SaaS Vercel",
    projectType: "saas",
    wizardAnswers: {
        problemStatement: "Testing API Connectivity seamlessly.",
        targetAudience: "Developers",
        coreFeatures: ["Auth", "Dashboard"],
        techPreferences: "MERN Stack",
        monetizationModel: "Subscription",
        scaleExpectation: "10k users",
        additionalContext: ""
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2 text-indigo-400">Backend Control Panel</h1>
      <p className="text-gray-400 mb-8 border-b border-gray-800 pb-4">Internal testing harness to verify all functionality directly on production / Vercel.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <button onClick={() => execute('GET', '/users/me')} className="bg-blue-600/20 text-blue-400 border border-blue-600 hover:bg-blue-600 hover:text-white p-3 rounded font-semibold transition-all">
          1. Profiler (/me)
        </button>
        <button onClick={() => execute('GET', '/subscriptions/me')} className="bg-purple-600/20 text-purple-400 border border-purple-600 hover:bg-purple-600 hover:text-white p-3 rounded font-semibold transition-all">
          2. Plan / Subscription limits
        </button>
        <button onClick={() => execute('POST', '/projects', testProjectPayload)} className="bg-green-600/20 text-green-400 border border-green-600 hover:bg-green-600 hover:text-white p-3 rounded font-semibold transition-all">
          3. Ping Create Project
        </button>
        <button onClick={() => execute('GET', '/projects')} className="bg-teal-600/20 text-teal-400 border border-teal-600 hover:bg-teal-600 hover:text-white p-3 rounded font-semibold transition-all">
          4. List Projects
        </button>
        <button onClick={() => execute('POST', `/projects/${projectId || 'NO_PROJECT_ID'}/generate`)} className="bg-yellow-600/20 text-yellow-500 border border-yellow-600 hover:bg-yellow-600 hover:text-white p-3 rounded font-semibold transition-all">
          5. ⚡ Trigger AI Gen Pipeline
        </button>
        <button onClick={() => execute('GET', `/projects/${projectId || 'NO_PROJECT_ID'}/documents`)} className="bg-orange-600/20 text-orange-400 border border-orange-600 hover:bg-orange-600 hover:text-white p-3 rounded font-semibold transition-all">
          6. View Document Yield
        </button>
        <button onClick={() => execute('GET', '/notifications')} className="bg-pink-600/20 text-pink-400 border border-pink-600 hover:bg-pink-600 hover:text-white p-3 rounded font-semibold transition-all">
          7. Pull Notifications
        </button>
      </div>
      
      {projectId && <div className="mb-4 text-green-400 px-2 font-mono text-sm">Target Active Test Project ID: {projectId}</div>}

      <div className="relative bg-gray-900 rounded-lg shadow-2xl p-4 overflow-hidden border border-gray-700 mt-6">
         <div className="absolute top-0 left-0 w-full bg-gray-800 px-4 py-2 text-xs text-gray-300 uppercase tracking-widest font-semibold flex justify-between">
           <span>Inspector JSON Payload</span>
           {loading && <span className="text-indigo-400 animate-pulse">Resolving Gateway...</span>}
        </div>
        <pre className="text-green-400 font-mono text-[13px] mt-8 whitespace-pre-wrap h-96 overflow-y-auto">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default ApiTester;
