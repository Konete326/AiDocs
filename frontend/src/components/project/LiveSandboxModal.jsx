import { useState, useEffect, useRef } from 'react';
import { X, Play, RefreshCw, Smartphone, Monitor, Terminal, CheckCircle2, Globe, Activity, Trash2, Sparkles, Send, Loader2, Copy, Check, MousePointer, MessageSquare, ArrowLeft, Settings, Layers, Layout, ChevronLeft, ChevronRight, RotateCw, Home, WifiOff, Zap, AlertTriangle } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo.png';
import CustomAgentationSetupModal from './CustomAgentationSetupModal';

const LiveSandboxModal = ({ isOpen, onClose, project, initialUrl }) => {
  const [device, setDevice] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [networkLogs, setNetworkLogs] = useState([]);
  
  const [sandboxUrl, setSandboxUrl] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isSendingAi, setIsSendingAi] = useState(false);

  const [copyConsoleSuccess, setCopyConsoleSuccess] = useState(false);
  const [copyNetworkSuccess, setCopyNetworkSuccess] = useState(false);

  const [isAnnotatingMode, setIsAnnotatingMode] = useState(false);
  const [annotationMode, setAnnotationMode] = useState('elements');
  const [isPausedAnimations, setIsPausedAnimations] = useState(false);
  const [areMarkersVisible, setAreMarkersVisible] = useState(true);
  const [outputDetailMode, setOutputDetailMode] = useState('standard');
  const [pinPriority, setPinPriority] = useState('medium');
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMCPConnected, setIsMCPConnected] = useState(false);
  const [isMCPAlertOpen, setIsMCPAlertOpen] = useState(false);
  const [isMCPChecking, setIsMCPChecking] = useState(false);

  const handleHistoryBack = () => {
    try {
      if (iframeRef.current?.contentWindow?.history) {
        iframeRef.current.contentWindow.history.back();
      }
    } catch (err) {}
  };

  const handleHistoryForward = () => {
    try {
      if (iframeRef.current?.contentWindow?.history) {
        iframeRef.current.contentWindow.history.forward();
      }
    } catch (err) {}
  };

  const [sandboxAnnotations, setSandboxAnnotations] = useState([]);
  const [activeSandboxPin, setActiveSandboxPin] = useState(null);
  const [pinCommentText, setPinCommentText] = useState('');
  const [isSubmittingAnnotations, setIsSubmittingAnnotations] = useState(false);
  const [hoveredIframeElement, setHoveredIframeElement] = useState(null);
  const iframeRef = useRef(null);

  const getFormattedUrl = (url) => {
    if (!url || !url.trim()) return 'about:blank';
    let cleaned = url.trim();
    if (!/^https?:\/\//i.test(cleaned)) {
      cleaned = 'https://' + cleaned;
    }

    if (cleaned.includes('youtube.com') || cleaned.includes('youtu.be')) {
      const videoIdMatch = cleaned.match(/(?:v=|\/live\/|\/shorts\/|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`;
      }
      if (!cleaned.includes('/embed')) {
        return 'https://www.youtube.com/embed';
      }
    }

    return cleaned;
  };

  const [activeIframeUrl, setActiveIframeUrl] = useState('https://example.com');

  useEffect(() => {
    if (project?._id) {
      const defaultUrl = initialUrl && initialUrl.trim() ? initialUrl.trim() : 'https://example.com';
      setSandboxUrl(defaultUrl);
      setActiveIframeUrl(defaultUrl);
      if (project.projectType === 'mobile' || project.projectType === 'react-native' || project.projectType === 'flutter') {
        setDevice('mobile');
      }
    }
  }, [project?._id, project?.projectType, initialUrl]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sandbox-open');
      checkMCPStatus();
    } else {
      document.body.classList.remove('sandbox-open');
    }
    return () => document.body.classList.remove('sandbox-open');
  }, [isOpen]);

  const checkMCPStatus = async () => {
    try {
      const res = await api.get('/agent/mcp-status');
      setIsMCPConnected(res.data?.data?.connected === true);
    } catch {
      setIsMCPConnected(false);
    }
  };

  const handleAiFixClick = async () => {
    if (isMCPChecking) return;
    setIsMCPChecking(true);
    try {
      const res = await api.get('/agent/mcp-status');
      const connected = res.data?.data?.connected === true;
      setIsMCPConnected(connected);
      if (connected) {
        setIsAiModalOpen(true);
      } else {
        setIsMCPAlertOpen(true);
      }
    } catch {
      setIsMCPConnected(false);
      setIsMCPAlertOpen(true);
    } finally {
      setIsMCPChecking(false);
    }
  };

  useEffect(() => {
    if (!isOpen || !project?._id) return;

    let eventSource;
    try {
      const token = api.getAccessToken ? api.getAccessToken() : '';
      eventSource = new EventSource(`/api/projects/${project._id}/events?token=${token}`);
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'annotation.updated' || data.type === 'code_updated' || data.type === 'generation_completed') {
            toast.success('Live Sandbox updated by AI Co-founder!');
            refreshApp();
          }
        } catch (e) {}
      };
    } catch (err) {}

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [isOpen, project?._id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.key === 'p' || e.key === 'P') {
        setIsPausedAnimations(prev => !prev);
        toast.success(isPausedAnimations ? 'Animations resumed (P)' : 'Animations paused (P)');
      } else if (e.key === 'h' || e.key === 'H') {
        setAreMarkersVisible(prev => !prev);
        toast.success(areMarkersVisible ? 'Markers hidden (H)' : 'Markers visible (H)');
      } else if (e.key === 'c' || e.key === 'C') {
        handleCopyAgentationMarkdown();
      } else if (e.key === 'x' || e.key === 'X') {
        setSandboxAnnotations([]);
        toast.success('All annotations cleared (X)');
      } else if (e.key === 'l' || e.key === 'L') {
        setAnnotationMode(prev => prev === 'layout' ? 'elements' : 'layout');
      } else if (e.key === 'Escape') {
        setActiveSandboxPin(null);
        setIsAnnotatingMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPausedAnimations, areMarkersVisible, sandboxAnnotations]);

  const refreshApp = () => {
    setIsRefreshing(true);
    const target = getFormattedUrl(sandboxUrl);
    setActiveIframeUrl(target);
    setConsoleLogs([{ id: Date.now(), type: 'info', time: new Date().toLocaleTimeString(), text: `[Sandbox] Navigating to ${target}...` }]);
    setNetworkLogs([]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleIframeLoad = () => {
    if (!iframeRef.current) return;
    try {
      const iframeWin = iframeRef.current.contentWindow;
      if (!iframeWin) return;

      const targetUrl = activeIframeUrl;
      setConsoleLogs(prev => [
        ...prev,
        { id: Date.now() + Math.random(), type: 'info', time: new Date().toLocaleTimeString(), text: `[Sandbox] Preview loaded: ${targetUrl}` }
      ]);

      const wrapLog = (type, origFn) => (...args) => {
        try {
          const text = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
          setConsoleLogs(prev => [...prev, { id: Date.now() + Math.random(), type, time: new Date().toLocaleTimeString(), text }]);
        } catch (e) {}
        if (origFn) origFn.apply(iframeWin.console, args);
      };

      if (iframeWin.console && !iframeWin.__consoleIntercepted) {
        iframeWin.__consoleIntercepted = true;
        iframeWin.console.log = wrapLog('log', iframeWin.console.log);
        iframeWin.console.error = wrapLog('error', iframeWin.console.error);
        iframeWin.console.warn = wrapLog('warn', iframeWin.console.warn);
        iframeWin.console.info = wrapLog('info', iframeWin.console.info);
      }

      if (iframeWin.fetch && !iframeWin.__fetchIntercepted) {
        iframeWin.__fetchIntercepted = true;
        const origFetch = iframeWin.fetch;
        iframeWin.fetch = async (...args) => {
          const startTime = performance.now();
          const reqUrl = typeof args[0] === 'string' ? args[0] : args[0]?.url || 'fetch';
          const method = args[1]?.method || 'GET';
          try {
            const res = await origFetch.apply(iframeWin, args);
            const duration = Math.round(performance.now() - startTime);
            setNetworkLogs(prev => [...prev, { id: Date.now() + Math.random(), method: method.toUpperCase(), url: reqUrl, status: res.status, time: `${duration}ms` }]);
            return res;
          } catch (err) {
            const duration = Math.round(performance.now() - startTime);
            setNetworkLogs(prev => [...prev, { id: Date.now() + Math.random(), method: method.toUpperCase(), url: reqUrl, status: 'FAILED', time: `${duration}ms` }]);
            throw err;
          }
        };
      }
    } catch (err) {
      setConsoleLogs(prev => [
        ...prev,
        { id: Date.now() + Math.random(), type: 'warn', time: new Date().toLocaleTimeString(), text: `[Sandbox] Loaded ${activeIframeUrl}. External domain cross-origin restrictions apply.` }
      ]);
    }
  };

  const handleCopyConsoleLogs = () => {
    const text = consoleLogs.map(l => `[${l.time}] [${l.type.toUpperCase()}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyConsoleSuccess(true);
    toast.success('Console logs copied!');
    setTimeout(() => setCopyConsoleSuccess(false), 2000);
  };

  const handleCopyNetworkLogs = () => {
    const text = networkLogs.map(n => `${n.method} ${n.url} - Status ${n.status} (${n.time})`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyNetworkSuccess(true);
    toast.success('Network logs copied!');
    setTimeout(() => setCopyNetworkSuccess(false), 2000);
  };

  const handleOverlayMouseMove = (e) => {
    if (!isAnnotatingMode) return;
    const overlayRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - overlayRect.left;
    const y = e.clientY - overlayRect.top;

    let iframeDoc;
    try {
      iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
    } catch (err) {
      iframeDoc = null;
    }

    let selector = `element@(${Math.round(x)}px, ${Math.round(y)}px)`;
    let tag = 'COMPONENT';
    let text = '';
    let elementRect = { top: Math.max(10, y - 18), left: Math.max(10, x - 60), width: 120, height: 36 };

    if (iframeDoc) {
      try {
        const rawTarget = iframeDoc.elementFromPoint(x, y);
        if (rawTarget && rawTarget.tagName !== 'HTML' && rawTarget.tagName !== 'BODY') {
          const target = rawTarget.closest('button, a, input, select, textarea, [role="button"], form, header, nav, section, article') || rawTarget;
          const targetBox = target.getBoundingClientRect();
          elementRect = {
            top: targetBox.top,
            left: targetBox.left,
            width: targetBox.width,
            height: targetBox.height
          };

          const tName = target.tagName.toLowerCase();
          const idStr = target.id ? `#${target.id}` : '';
          const classStr = target.className && typeof target.className === 'string'
            ? `.${target.className.split(' ').filter(c => Boolean(c) && !c.includes('agentation')).slice(0, 2).join('.')}`
            : '';
          selector = `${tName}${idStr}${classStr}`;
          tag = tName.toUpperCase();
          text = target.innerText ? target.innerText.trim().slice(0, 40) : '';
        }
      } catch (err) {}
    }

    console.log("[Agentation v2.0 DOM Target] Hover:", selector, elementRect);

    setHoveredIframeElement({
      rect: elementRect,
      selector,
      text,
      tagName: tag
    });
  };

  const handleOverlayClick = (e) => {
    if (!isAnnotatingMode) return;
    const overlayRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - overlayRect.left;
    const y = e.clientY - overlayRect.top;
    const xPercent = (((x) / overlayRect.width) * 100).toFixed(1);
    const yPercent = (((y) / overlayRect.height) * 100).toFixed(1);

    let iframeDoc;
    try {
      iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
    } catch (err) {
      iframeDoc = null;
    }

    let selector = `element@(${xPercent}%, ${yPercent}%)`;
    let tag = 'ELEMENT';
    let cleanText = '';
    let computedStyles = {};
    let fullHierarchyPath = '';
    let elementRect = { top: y, left: x, width: 60, height: 24 };

    if (iframeDoc) {
      try {
        const rawTarget = iframeDoc.elementFromPoint(x, y);
        if (rawTarget && rawTarget.tagName !== 'HTML' && rawTarget.tagName !== 'BODY') {
          const target = rawTarget.closest('button, a, input, select, textarea, [role="button"], form, header, nav, section, article') || rawTarget;
          const targetBox = target.getBoundingClientRect();
          elementRect = {
            top: targetBox.top,
            left: targetBox.left,
            width: targetBox.width,
            height: targetBox.height
          };

          const tName = target.tagName.toLowerCase();
          const idStr = target.id ? `#${target.id}` : '';
          const classStr = target.className && typeof target.className === 'string'
            ? `.${target.className.split(' ').filter(c => Boolean(c) && !c.includes('agentation')).slice(0, 2).join('.')}`
            : '';
          selector = `${tName}${idStr}${classStr}`;
          tag = tName.toUpperCase();
          cleanText = target.innerText ? target.innerText.trim().slice(0, 80) : '';

          const win = iframeDoc.defaultView || window;
          const c = win.getComputedStyle(target);
          computedStyles = {
            color: c.color,
            fontSize: c.fontSize,
            fontFamily: c.fontFamily ? c.fontFamily.split(',')[0] : '',
            padding: c.padding,
            margin: c.margin,
            display: c.display,
            backgroundColor: c.backgroundColor
          };

          const tree = [];
          let curr = target;
          while (curr && curr.tagName && curr.tagName !== 'HTML' && tree.length < 4) {
            const tStr = curr.tagName.toLowerCase();
            const iStr = curr.id ? `#${curr.id}` : '';
            const cStr = curr.className && typeof curr.className === 'string'
              ? `.${curr.className.split(' ').filter(c => Boolean(c) && !c.includes('agentation')).slice(0, 1).join('.')}`
              : '';
            tree.unshift(`${tStr}${iStr}${cStr}`);
            curr = curr.parentElement;
          }
          fullHierarchyPath = tree.join(' > ');
        }
      } catch (err) {}
    }

    const newPin = {
      id: `ann_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`,
      number: sandboxAnnotations.length + 1,
      comment: '',
      elementPath: fullHierarchyPath || selector,
      timestamp: Date.now(),
      x: parseFloat(xPercent),
      y: Math.round(y),
      element: tag.toLowerCase(),
      url: sandboxUrl || activeIframeUrl,
      boundingBox: {
        x: Math.round(elementRect.left),
        y: Math.round(elementRect.top),
        width: Math.round(elementRect.width),
        height: Math.round(elementRect.height)
      },
      reactComponents: fullHierarchyPath,
      selectedText: cleanText,
      intent: 'fix',
      severity: pinPriority === 'critical' || pinPriority === 'high' ? 'blocking' : pinPriority === 'medium' ? 'important' : 'suggestion',
      kind: annotationMode === 'layout' ? 'placement' : 'feedback',
      status: 'pending',
      elementSelector: selector,
      componentTag: tag,
      computedStyles,
      elementRect,
      xPercent,
      yPercent
    };

    console.log("[Agentation v2.0 DOM Target] Clicked Pin:", newPin);

    setActiveSandboxPin(newPin);
    setHoveredIframeElement(null);
  };

  useEffect(() => {
    if (!isAnnotatingMode || !iframeRef.current) {
      setHoveredIframeElement(null);
      return;
    }

    let iframeDoc;
    try {
      iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    } catch (err) {
      iframeDoc = null;
    }

    if (!iframeDoc) return;

    let styleEl = iframeDoc.getElementById('agentation-annotator-style');
    if (!styleEl) {
      styleEl = iframeDoc.createElement('style');
      styleEl.id = 'agentation-annotator-style';
      styleEl.innerHTML = `
        .agentation-hover-outline {
          outline: 2px solid #6C63FF !important;
          outline-offset: 2px !important;
          background-color: rgba(108, 99, 255, 0.12) !important;
          cursor: crosshair !important;
          transition: outline 0.1s ease-in-out !important;
        }
        .agentation-paused *, .agentation-paused *::before, .agentation-paused *::after {
          animation-play-state: paused !important;
          transition: none !important;
        }
      `;
      if (iframeDoc.head) iframeDoc.head.appendChild(styleEl);
    }

    if (isPausedAnimations && iframeDoc.body) {
      iframeDoc.body.classList.add('agentation-paused');
    } else if (iframeDoc.body) {
      iframeDoc.body.classList.remove('agentation-paused');
    }
  }, [isAnnotatingMode, activeIframeUrl, isPausedAnimations]);

  const handleSaveSandboxPin = () => {
    if (!activeSandboxPin) return;
    const finalPin = { ...activeSandboxPin, comment: pinCommentText.trim() || 'UI Visual Component Fix' };
    setSandboxAnnotations(prev => [...prev, finalPin]);
    setActiveSandboxPin(null);
    setPinCommentText('');
    toast.success(`Agentation Pin #${finalPin.number} saved!`);
  };

  const handleCopyAgentationMarkdown = () => {
    if (sandboxAnnotations.length === 0) {
      toast.error('No annotations to copy!');
      return;
    }

    let markdown = `## Page Feedback: ${sandboxUrl || activeIframeUrl}\n`;
    markdown += `**Format:** ${outputDetailMode.toUpperCase()} | **Annotations:** ${sandboxAnnotations.length}\n\n`;

    sandboxAnnotations.forEach((ann, idx) => {
      markdown += `### ${idx + 1}. ${ann.elementSelector || ann.element}\n`;
      if (outputDetailMode !== 'compact') {
        markdown += `**Location:** \`${ann.elementPath || ann.elementSelector}\`\n`;
      }
      if (outputDetailMode === 'detailed' || outputDetailMode === 'forensic') {
        if (ann.reactComponents) {
          markdown += `**React:** \`<${ann.reactComponents.replace(/ > /g, '> <')}>\`\n`;
        }
        if (ann.boundingBox) {
          markdown += `**Position:** ${ann.boundingBox.x}, ${ann.boundingBox.y} (${ann.boundingBox.width}x${ann.boundingBox.height})\n`;
        }
      }
      if (ann.selectedText) {
        markdown += `**Selected:** "${ann.selectedText}"\n`;
      }
      if (outputDetailMode === 'forensic' && ann.computedStyles) {
        markdown += `**Computed Styles:** ${JSON.stringify(ann.computedStyles)}\n`;
      }
      markdown += `**Feedback:** ${ann.comment}\n\n`;
    });

    navigator.clipboard.writeText(markdown);
    toast.success(`Agentation ${outputDetailMode.toUpperCase()} Markdown copied! Ready to paste into Claude Code, Cursor, or Codex.`);
  };

  const handleSendAnnotationsToAiCofounder = async () => {
    if (sandboxAnnotations.length === 0 || isSubmittingAnnotations) return;
    setIsSubmittingAnnotations(true);
    try {
      let agentationMarkdown = `# Agentation Visual Feedback Context (AFS v1.1)\n\n`;
      agentationMarkdown += `**Page URL**: \`${sandboxUrl || activeIframeUrl}\`\n\n`;

      sandboxAnnotations.forEach((ann, idx) => {
        agentationMarkdown += `## Annotation #${idx + 1} (\`${ann.id}\`)\n`;
        agentationMarkdown += `- **Element Path:** \`${ann.elementPath || ann.elementSelector}\`\n`;
        if (ann.reactComponents) {
          agentationMarkdown += `- **React Components:** \`${ann.reactComponents}\`\n`;
        }
        if (ann.selectedText) {
          agentationMarkdown += `- **Selected Text:** "${ann.selectedText}"\n`;
        }
        agentationMarkdown += `- **Feedback:** ${ann.comment}\n`;
        agentationMarkdown += `- **Severity:** \`${ann.severity || 'important'}\` | **Status:** \`${ann.status || 'pending'}\`\n\n`;
      });

      await api.post(`/projects/${project._id}/annotations`, {
        schemaVersion: '1.1',
        annotations: sandboxAnnotations,
        pageUrl: sandboxUrl
      });

      await api.post(`/projects/${project._id}/chat`, {
        messages: [{ role: 'user', content: agentationMarkdown }]
      });

      toast.success('AFS v1.1 Feedback sent to AI Co-founder & Chat!');
      setSandboxAnnotations([]);
      setIsAnnotatingMode(false);
      onClose();
      window.location.href = `/projects/${project._id}/chat`;
    } catch (err) {
      console.error('Failed submitting annotations to AI:', err);
      toast.error('Failed sending visual annotations to AI Co-founder');
    } finally {
      setIsSubmittingAnnotations(false);
    }
  };

  const handleSendAiInstruction = async () => {
    if (!aiPrompt.trim() || isSendingAi) return;
    setIsSendingAi(true);
    try {
      const consoleSummary = consoleLogs.map(l => `[${l.type.toUpperCase()}] ${l.text}`).join('\n');
      const networkSummary = networkLogs.map(n => `${n.method} ${n.url} (${n.status} - ${n.time})`).join('\n');
      
      const fullMessage = `[LIVE SANDBOX AI QUICK FIX REQUEST]
Page URL: ${sandboxUrl}

User Request / Instruction:
${aiPrompt.trim()}

=== CONSOLE LOG DIAGNOSTICS ===
${consoleSummary || 'No errors logged.'}

=== NETWORK DIAGNOSTICS ===
${networkSummary || 'No network activity logged.'}`;

      await api.post(`/projects/${project._id}/chat`, {
        messages: [{ role: 'user', content: fullMessage }]
      });

      toast.success('Instruction added to AI Chat! Redirecting to Chat...');
      setAiPrompt('');
      setIsAiModalOpen(false);
      onClose();
      window.location.href = `/projects/${project._id}/chat`;
    } catch (err) {
      console.error('Failed sending AI instruction:', err);
      toast.error('Failed sending instruction to AI agent');
    } finally {
      setIsSendingAi(false);
    }
  };

  const previewWidth = device === 'mobile' ? 'max-w-[375px]' : device === 'tablet' ? 'max-w-[768px]' : 'w-full';

  const RESTRICTED_DOMAINS = ['google.com', 'google.pk', 'google.co', 'facebook.com', 'github.com', 'twitter.com', 'x.com'];
  const isRestrictedDomain = RESTRICTED_DOMAINS.some(d => activeIframeUrl.toLowerCase().includes(d));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col p-2 sm:p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full h-full neumorphic-card rounded-[2.5rem] flex flex-col overflow-hidden bg-[#E0E5EC] text-[#3D4852] relative">
        <div className="flex items-center justify-between p-3 px-6 border-b border-black/5 flex-shrink-0 bg-[#E0E5EC] gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-3xl">
            <button
              onClick={onClose}
              className="neumorphic-btn rounded-2xl px-3.5 py-1.5 flex items-center gap-2 text-xs font-bold text-[#3D4852] hover:text-[#6C63FF] transition-all cursor-pointer shrink-0"
              title="Back to Project Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-[#6C63FF]" />
              <span>Back to Project</span>
            </button>
            
            <div className="flex items-center gap-1 neumorphic-inset rounded-2xl p-1 shrink-0">
              <button onClick={handleHistoryBack} title="Back in History" className="p-1 rounded-xl text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={handleHistoryForward} title="Forward in History" className="p-1 rounded-xl text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Browser Address Bar */}
            <div className="flex items-center gap-2 flex-1 neumorphic-inset rounded-2xl px-3 py-1.5">
              <button onClick={refreshApp} title="Refresh / Load URL" className="cursor-pointer text-[#6B7280] hover:text-[#3D4852]">
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <input
                type="text"
                value={sandboxUrl}
                onChange={(e) => setSandboxUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && refreshApp()}
                className="w-full bg-transparent text-xs font-mono font-bold text-[#3D4852] outline-none"
                placeholder="https://preview.clarifyai.app/projects/..."
              />
              <button
                onClick={() => window.open(getFormattedUrl(sandboxUrl), '_blank')}
                title="Open URL in New Tab"
                className="text-[#6C63FF] hover:text-[#8B84FF] text-xs font-bold font-mono shrink-0 cursor-pointer px-1 flex items-center gap-1"
              >
                <span>Open ↗</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {sandboxAnnotations.length > 0 && (
              <button
                onClick={handleSendAnnotationsToAiCofounder}
                disabled={isSubmittingAnnotations}
                className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmittingAnnotations ? 'Sending to AI...' : `Send ${sandboxAnnotations.length} Pins to AI`}</span>
              </button>
            )}

            {/* View Tab Selector */}
            <div className="flex items-center gap-1 p-1 neumorphic-inset rounded-2xl">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'preview' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'console' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console ({consoleLogs.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('network')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'network' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Network ({networkLogs.length})</span>
              </button>
            </div>

            <button
              onClick={handleAiFixClick}
              disabled={isMCPChecking}
              className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-sm disabled:opacity-70"
            >
              {isMCPChecking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>AI Fix</span>
            </button>

            <div className="flex gap-1 p-1 neumorphic-inset rounded-2xl">
              <button onClick={() => setDevice('desktop')} className={`p-1.5 rounded-xl cursor-pointer ${device === 'desktop' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}>
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded-xl cursor-pointer ${device === 'mobile' ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}>
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            <button onClick={onClose} className="w-8 h-8 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-[#E0E5EC] p-6 flex justify-center items-center overflow-hidden">
          {activeTab === 'preview' ? (
            <div className={`${previewWidth} h-full neumorphic-inset rounded-3xl overflow-hidden flex flex-col transition-all duration-300 relative bg-white`}>
              {isAnnotatingMode && (
                <div
                  onMouseMove={handleOverlayMouseMove}
                  onClick={handleOverlayClick}
                  className="absolute inset-0 z-30 cursor-crosshair bg-[#6C63FF]/5 pointer-events-auto"
                />
              )}

              {isAnnotatingMode && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-35 pointer-events-none">
                  <div className="bg-[#6C63FF] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl pointer-events-auto flex items-center gap-2 border border-white/30 animate-in fade-in">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-extrabold">⚡</div>
                    <span>Agentation Inspector Active — Click any button or element to inspect & drop Pin #{sandboxAnnotations.length + 1}</span>
                  </div>
                </div>
              )}

              {isAnnotatingMode && hoveredIframeElement && hoveredIframeElement.rect && (
                <div
                  className="absolute z-40 border-2 border-[#6C63FF] bg-[#6C63FF]/20 pointer-events-none rounded-xl shadow-[0_0_15px_rgba(108,99,255,0.7)] transition-all duration-75"
                  style={{
                    top: `${hoveredIframeElement.rect.top}px`,
                    left: `${hoveredIframeElement.rect.left}px`,
                    width: `${Math.max(30, hoveredIframeElement.rect.width)}px`,
                    height: `${Math.max(20, hoveredIframeElement.rect.height)}px`
                  }}
                >
                  <div className="absolute -top-7 left-0 bg-[#6C63FF] text-white px-2 py-0.5 rounded-lg text-[10px] font-mono font-extrabold shadow-lg flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-none">
                    <span className="bg-white/20 px-1 py-0.5 rounded text-[9px]">⚡ {hoveredIframeElement.tagName}</span>
                    <span className="font-bold text-emerald-200">{hoveredIframeElement.selector}</span>
                    {hoveredIframeElement.text && <span className="text-white/80 max-w-[120px] truncate">"{hoveredIframeElement.text}"</span>}
                  </div>
                </div>
              )}

              {sandboxAnnotations.map(pin => (
                <div
                  key={pin.id}
                  onClick={() => setActiveSandboxPin(pin)}
                  className="absolute z-40 bg-[#6C63FF] text-white font-extrabold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xl ring-2 ring-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all pointer-events-auto"
                  style={{ top: `${pin.yPercent}%`, left: `${pin.xPercent}%` }}
                  title={`${pin.elementSelector}: ${pin.comment}`}
                >
                  <span className="text-[10px]">⚡</span>
                  <span>#{pin.number}</span>
                </div>
              ))}

              {activeSandboxPin && (
                <div
                  className="absolute z-50 w-80 neumorphic-card rounded-2xl p-4 bg-[#E0E5EC] text-[#3D4852] flex flex-col gap-2.5 shadow-2xl border border-black/10 animate-in zoom-in-95 pointer-events-auto"
                  style={{
                    top: `${Math.min(65, Math.max(8, parseFloat(activeSandboxPin.yPercent || 20)))}%`,
                    left: `${Math.min(60, Math.max(5, parseFloat(activeSandboxPin.xPercent || 20)))}%`
                  }}
                >
                  <div className="flex items-center justify-between pb-1 border-b border-black/5">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#6C63FF]">
                      <img src={logo} alt="ClarifyAI Logo" className="w-5 h-5 rounded-full object-cover border border-[#6C63FF]/30 shadow-sm" />
                      <span>ClarifyAI Agentation #{activeSandboxPin.number}</span>
                    </div>
                    <button onClick={() => setActiveSandboxPin(null)} className="text-[#6B7280] hover:text-[#3D4852] p-1 rounded-full hover:bg-black/5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-2 rounded-xl bg-gradient-to-r from-[#6C63FF]/15 to-[#38B2AC]/15 border border-[#6C63FF]/20 text-[10px] text-[#3D4852] font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#6C63FF] font-bold">
                      <Sparkles className="w-3 h-3 text-[#6C63FF]" />
                      <span>AI Pipeline: Auto-route to Antigravity & Claude</span>
                    </span>
                    <span className="text-[9px] bg-[#6C63FF] text-white px-1.5 py-0.5 rounded font-extrabold">Active</span>
                  </div>

                  <div className="text-[11px] font-mono text-[#3D4852] bg-white/80 p-2.5 rounded-xl border border-slate-200/80 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#6C63FF] text-white px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase">{activeSandboxPin.componentTag || 'ELEMENT'}</span>
                      <span className="text-[9px] font-bold text-[#6B7280] uppercase">{activeSandboxPin.mode || 'elements'}</span>
                    </div>
                    <div className="font-bold text-[#6C63FF] truncate">{activeSandboxPin.fullHierarchyPath || activeSandboxPin.elementSelector}</div>
                    {activeSandboxPin.elementText && (
                      <div className="text-[10px] text-[#6B7280] truncate italic bg-slate-100/80 p-1 rounded">
                        "{activeSandboxPin.elementText}"
                      </div>
                    )}

                    {activeSandboxPin.computedStyles && Object.keys(activeSandboxPin.computedStyles).length > 0 && (
                      <div className="mt-1 flex flex-col gap-1 border-t border-slate-200/80 pt-1.5">
                        <span className="text-[9px] font-extrabold text-[#6C63FF] uppercase tracking-wider">Extracted Element Styles</span>
                        <div className="grid grid-cols-2 gap-1 p-2 bg-[#E0E5EC]/80 rounded-lg font-mono text-[9px] text-[#3D4852] border border-black/5">
                          <div>Color: <span className="font-bold text-[#6C63FF]">{activeSandboxPin.computedStyles.color || 'inherit'}</span></div>
                          <div>Font Size: <span className="font-bold">{activeSandboxPin.computedStyles.fontSize || '14px'}</span></div>
                          <div>Display: <span className="font-bold">{activeSandboxPin.computedStyles.display || 'block'}</span></div>
                          <div>Padding: <span className="font-bold">{activeSandboxPin.computedStyles.padding || '0px'}</span></div>
                          <div>Bg Color: <span className="font-bold text-[#38B2AC]">{activeSandboxPin.computedStyles.backgroundColor || 'transparent'}</span></div>
                          <div>Font: <span className="font-bold truncate max-w-[80px] inline-block align-bottom">{activeSandboxPin.computedStyles.fontFamily || 'Inter'}</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280]">Priority:</span>
                    {['low', 'medium', 'high', 'critical'].map(p => (
                      <button
                        key={p}
                        onClick={() => setPinPriority(p)}
                        className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${pinPriority === p ? 'bg-[#6C63FF] text-white shadow-sm' : 'bg-white/60 text-[#6B7280]'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={pinCommentText}
                    onChange={(e) => setPinCommentText(e.target.value)}
                    placeholder="Write your feedback / prompt instruction for AI Agent..."
                    rows={3}
                    className="w-full neumorphic-inset rounded-xl p-2.5 text-xs outline-none text-[#3D4852] font-medium resize-none"
                    autoFocus
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setActiveSandboxPin(null)}
                      className="px-3 py-1 text-xs font-bold text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSandboxPin}
                      className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-3.5 py-1 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      Add Feedback
                    </button>
                  </div>
                </div>
              )}

              {isRefreshing ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#6B7280] bg-[#E0E5EC]">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#6C63FF]" />
                  <span>Loading website preview...</span>
                </div>
              ) : isRestrictedDomain ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 bg-[#E0E5EC] text-[#3D4852]">
                  <div className="w-16 h-16 rounded-3xl neumorphic-card flex items-center justify-center text-[#6C63FF]">
                    <Globe className="w-8 h-8 text-[#6C63FF]" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#3D4852]">Security Restricted Domain</h4>
                    <p className="text-xs text-[#6B7280] font-medium max-w-md mt-1">
                      <strong>{sandboxUrl}</strong> uses security policies (X-Frame-Options: SAMEORIGIN) that prevent direct iframe embedding. Click below to open it in a new window!
                    </p>
                  </div>
                  <button
                    onClick={() => window.open(getFormattedUrl(sandboxUrl), '_blank')}
                    className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center gap-2 mt-1"
                  >
                    <span>Open {sandboxUrl} in New Tab ↗</span>
                  </button>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  key={activeIframeUrl}
                  src={activeIframeUrl}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-none bg-white rounded-3xl"
                  title="Live Sandbox Website Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
                />
              )}

              <div className="absolute bottom-4 right-4 z-40 flex items-center gap-2">
                {isAnnotatingMode ? (
                  <div className="neumorphic-card rounded-full p-1.5 bg-[#E0E5EC] flex items-center gap-2 shadow-xl border border-black/5 animate-in slide-in-from-bottom-2">
                    <div className="w-7 h-7 rounded-full bg-[#6C63FF] text-white flex items-center justify-center font-extrabold text-xs shadow-md">
                      ⚡
                    </div>
                    <span className="text-xs font-extrabold text-[#3D4852] px-1">Agentation</span>

                    <div className="flex items-center gap-1 bg-white/70 p-0.5 rounded-full border border-slate-200">
                      {['elements', 'text', 'multi', 'area', 'layout'].map((m) => (
                        <button
                          key={m}
                          onClick={() => setAnnotationMode(m)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize transition-all cursor-pointer ${annotationMode === m ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#3D4852]'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsPausedAnimations(prev => !prev)}
                      className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${isPausedAnimations ? 'bg-amber-500 text-white shadow-sm' : 'bg-white/80 text-[#6B7280]'}`}
                      title="Pause / Resume Animations (P)"
                    >
                      {isPausedAnimations ? '▶' : '⏸'}
                    </button>

                    <button
                      onClick={() => setAreMarkersVisible(prev => !prev)}
                      className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${!areMarkersVisible ? 'bg-slate-400 text-white shadow-sm' : 'bg-white/80 text-[#6B7280]'}`}
                      title="Toggle Marker Visibility (H)"
                    >
                      👁
                    </button>

                    <button
                      onClick={() => setIsSettingsOpen(prev => !prev)}
                      className={`p-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${isSettingsOpen ? 'bg-[#6C63FF] text-white shadow-sm' : 'bg-white/80 text-[#6B7280]'}`}
                      title="Agentation Settings & Output Detail"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>

                    {isSettingsOpen && (
                      <div className="absolute bottom-12 right-0 z-50 w-64 neumorphic-card rounded-2xl p-3 bg-[#E0E5EC] text-[#3D4852] flex flex-col gap-2 shadow-2xl border border-black/10 animate-in zoom-in-95 font-sans">
                        <div className="flex items-center justify-between pb-1 border-b border-black/5">
                          <span className="text-xs font-bold text-[#6C63FF] flex items-center gap-1">
                            <Settings className="w-3.5 h-3.5" /> Settings (v0.3.2)
                          </span>
                          <button onClick={() => setIsSettingsOpen(false)} className="text-[#6B7280] hover:text-[#3D4852]">
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-[#6B7280]">Output Detail Format:</label>
                          <div className="grid grid-cols-2 gap-1 p-0.5 bg-white/70 rounded-xl border border-slate-200">
                            {['compact', 'standard', 'detailed', 'forensic'].map(mode => (
                              <button
                                key={mode}
                                onClick={() => setOutputDetailMode(mode)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${outputDetailMode === mode ? 'bg-[#6C63FF] text-white shadow-sm' : 'text-[#6B7280]'}`}
                              >
                                {mode}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsSettingsOpen(false);
                            setIsSetupWizardOpen(true);
                          }}
                          className="w-full bg-[#6C63FF] hover:bg-[#8B84FF] text-white p-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 mt-1"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Custom Project MCP Setup Guide</span>
                        </button>
                      </div>
                    )}

                    {sandboxAnnotations.length > 0 && (
                      <>
                        <button
                          onClick={handleCopyAgentationMarkdown}
                          className="bg-white hover:bg-slate-50 text-[#3D4852] px-2.5 py-1 rounded-full text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1 border border-slate-200"
                          title="Copy Agentation Markdown Context for Claude Code / Cursor (C)"
                        >
                          <Copy className="w-3 h-3 text-[#6C63FF]" />
                          <span>Copy ({sandboxAnnotations.length})</span>
                        </button>
                        <button
                          onClick={() => {
                            setSandboxAnnotations([]);
                            toast.success('All annotations cleared');
                          }}
                          className="p-1 rounded-full text-[#6B7280] hover:text-red-600 cursor-pointer"
                          title="Clear All Annotations (X)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={handleSendAnnotationsToAiCofounder}
                          disabled={isSubmittingAnnotations}
                          className="bg-[#38B2AC] hover:bg-[#4FD1C5] text-white px-3 py-1 rounded-full text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send to AI</span>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setIsAnnotatingMode(false)}
                      className="w-7 h-7 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {sandboxAnnotations.length > 0 && (
                      <button
                        onClick={handleCopyAgentationMarkdown}
                        className="neumorphic-card rounded-full px-3 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-bold text-xs flex items-center gap-1.5 shadow-xl hover:scale-105 transition-all cursor-pointer border border-black/5"
                        title="Copy Formatted Agentation Markdown for Claude Code / Cursor"
                      >
                        <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />
                        <span>Copy Agentation Context ({sandboxAnnotations.length})</span>
                      </button>
                    )}
                    <button
                      onClick={() => setIsAnnotatingMode(true)}
                      className="neumorphic-card rounded-full px-3.5 py-1.5 bg-[#E0E5EC] text-[#3D4852] font-extrabold text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer border border-black/5"
                      title="Agentation Visual Feedback & Annotation Engine"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#6C63FF] text-white flex items-center justify-center text-[10px] font-bold">
                        ⚡
                      </div>
                      <span>Agentation UI</span>
                      {sandboxAnnotations.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#6C63FF] text-white text-[9px] font-bold flex items-center justify-center">
                          {sandboxAnnotations.length}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'console' ? (
            <div className="w-full h-full neumorphic-inset rounded-3xl p-4 font-mono text-xs text-[#3D4852] overflow-y-auto flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-black/5">
                <span className="font-bold flex items-center gap-2 text-[#6C63FF]">
                  <Terminal className="w-4 h-4" /> DevTools Console Stream
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopyConsoleLogs} title="Copy Console Logs" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer flex items-center gap-1 text-xs font-bold">
                    {copyConsoleSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#6C63FF]" />}
                  </button>
                  <button onClick={() => setConsoleLogs([])} title="Clear Console" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {consoleLogs.map(log => (
                <div key={log.id} className="flex items-center gap-3 py-1 border-b border-black/5 text-xs">
                  <span className="text-[#6B7280]">{log.time}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.type === 'warn' ? 'bg-amber-500/20 text-amber-600' : log.type === 'info' ? 'bg-blue-500/20 text-blue-600' : 'bg-emerald-500/20 text-emerald-600'}`}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="font-semibold text-[#3D4852]">{log.text}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full neumorphic-inset rounded-3xl p-4 font-mono text-xs text-[#3D4852] overflow-y-auto flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-black/5">
                <span className="font-bold flex items-center gap-2 text-[#38B2AC]">
                  <Activity className="w-4 h-4" /> Network API Inspector
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={handleCopyNetworkLogs} title="Copy Network Logs" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer flex items-center gap-1 text-xs font-bold">
                    {copyNetworkSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#38B2AC]" />}
                  </button>
                  <button onClick={() => setNetworkLogs([])} title="Clear Network Logs" className="text-[#6B7280] hover:text-[#3D4852] cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {networkLogs.map(net => (
                <div key={net.id} className="flex items-center justify-between py-1.5 border-b border-black/5 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#6C63FF] px-2 py-0.5 bg-[#6C63FF]/10 rounded">{net.method}</span>
                    <span className="font-semibold text-[#3D4852]">{net.url}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 font-bold px-2 py-0.5 bg-emerald-500/10 rounded">{net.status} OK</span>
                    <span className="text-[#6B7280] font-bold">{net.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {isAiModalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-lg neumorphic-card rounded-3xl p-6 bg-[#E0E5EC] flex flex-col gap-4 text-[#3D4852]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#6C63FF]" />
                  <h4 className="text-sm font-extrabold">Ask AI Agent (Antigravity & Claude)</h4>
                </div>
                <button onClick={() => setIsAiModalOpen(false)} className="text-[#6B7280] hover:text-[#3D4852]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#6B7280] font-medium">
                Describe what you want to change or fix. Current page URL, console error trace, and network logs will be automatically summarized and sent to AI Chat history.
              </p>

              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Example: Fix the layout alignment of the header button and update primary color to indigo..."
                className="w-full h-32 p-3 font-mono text-xs bg-[#E0E5EC] text-[#3D4852] rounded-2xl outline-none neumorphic-inset resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAiInstruction}
                  disabled={isSendingAi || !aiPrompt.trim()}
                  className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSendingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Send to AI Agents</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {isMCPAlertOpen && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="w-full max-w-md neumorphic-card rounded-3xl p-7 bg-[#E0E5EC] flex flex-col gap-5 text-[#3D4852] animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-red-400/20 flex items-center justify-center shadow-[4px_4px_8px_rgba(163,177,198,0.6),-4px_-4px_8px_rgba(255,255,255,0.5)]">
                    <WifiOff className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#3D4852]">MCP Not Connected</h4>
                    <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">Antigravity Agent Offline</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMCPAlertOpen(false)}
                  className="w-7 h-7 rounded-full neumorphic-btn flex items-center justify-center text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-red-50/60 border border-amber-200/60 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <p className="text-xs font-semibold text-[#3D4852] leading-relaxed">
                    <strong>Antigravity</strong> ya koi bhi AI coding tool (Claude, Cursor) abhi is project se connected nahi hai.
                  </p>
                </div>
                <p className="text-[11px] text-[#6B7280] font-medium leading-relaxed pl-6">
                  AI Fix feature ko kaam karne ke liye MCP (Model Context Protocol) connection active honi chahiye. Jab agent connected hoga, yeh automatically live sandbox se tasks lega aur fix karta rahe ga.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Connect karne ke liye:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-slate-200/80">
                    <div className="w-5 h-5 rounded-full bg-[#6C63FF] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">1</div>
                    <p className="text-[11px] font-medium text-[#3D4852]">Antigravity IDE ya Claude Code open karo</p>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-slate-200/80">
                    <div className="w-5 h-5 rounded-full bg-[#6C63FF] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">2</div>
                    <p className="text-[11px] font-medium text-[#3D4852]">ClarifyAI MCP server ko connect karo aur project open karo</p>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/60 border border-slate-200/80">
                    <div className="w-5 h-5 rounded-full bg-[#6C63FF] text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">3</div>
                    <p className="text-[11px] font-medium text-[#3D4852]">Connection ke baad dobara "AI Fix" button press karo</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsMCPAlertOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#6B7280] hover:text-[#3D4852] cursor-pointer"
                >
                  Theek Hai
                </button>
                <button
                  onClick={() => {
                    setIsMCPAlertOpen(false);
                    setIsSetupWizardOpen(true);
                  }}
                  className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Setup Guide Dekho</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <CustomAgentationSetupModal
          isOpen={isSetupWizardOpen}
          onClose={() => setIsSetupWizardOpen(false)}
        />
      </div>
    </div>
  );
};

export default LiveSandboxModal;
