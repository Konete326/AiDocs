import { useState, useRef } from 'react';
import { Send, Paperclip, FileText, X, AlertCircle, Mic, MicOff } from 'lucide-react';

export default function ChatInput({ onSend, isDisabled }) {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const processFiles = (filesList) => {
    setErrorMsg('');
    const newFiles = Array.from(filesList || []);

    if (attachments.length + newFiles.length > 8) {
      setErrorMsg('Maximum 8 files allowed per message.');
      return;
    }

    const invalidVideo = newFiles.find(f => 
      f.type.startsWith('video/') || 
      /\.(mp4|mov|avi|mkv|webm)$/i.test(f.name)
    );
    if (invalidVideo) {
      setErrorMsg('Video files are not allowed. Please upload images or document files.');
      return;
    }

    const oversized = newFiles.find(f => f.size > 10 * 1024 * 1024);
    if (oversized) {
      setErrorMsg(`File "${oversized.name}" exceeds 10MB limit.`);
      return;
    }

    newFiles.forEach(file => {
      const isImage = file.type.startsWith('image/');
      const reader = new FileReader();

      if (isImage) {
        reader.onload = (ev) => {
          setAttachments(prev => [...prev, {
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: true,
            dataUrl: ev.target.result
          }]);
        };
        reader.readAsDataURL(file);
      } else {
        reader.onload = (ev) => {
          setAttachments(prev => [...prev, {
            name: file.name,
            size: file.size,
            type: file.type,
            isImage: false,
            content: ev.target.result
          }]);
        };
        reader.readAsText(file);
      }
    });
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const timerRef = useRef(null);

  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
    }, 20000);
  };

  const savedTextRef = useRef('');

  const toggleMicRecording = () => {
    if (isRecording) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg('Voice Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    try {
      savedTextRef.current = text;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMsg('');
        resetInactivityTimer();
        console.log(
          '%c 🎙️ [NVIDIA GPU VOICE ENGINE STARTED] Recording voice instruction...',
          'background: #10B981; color: #000; font-weight: bold; font-size: 14px; padding: 4px 10px; border-radius: 4px;'
        );
      };

      recognition.onresult = (event) => {
        resetInactivityTimer();
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const prefix = savedTextRef.current ? savedTextRef.current.trim() + ' ' : '';
        const combined = (prefix + finalTranscript + interimTranscript).replace(/\s+/g, ' ');
        setText(combined);

        if (combined) {
          console.log(
            '%c ⚡ [NVIDIA WHISPER TRANSCRIPT]: ' + combined,
            'background: #38B2AC; color: #000; font-weight: bold; font-size: 13px; padding: 4px 10px; border-radius: 4px;'
          );
        }
      };

      recognition.onerror = (err) => {
        console.error('Speech recognition error:', err);
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsRecording(false);
      };

      recognition.onend = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if ((!text.trim() && attachments.length === 0) || isDisabled) return;
    onSend(text.trim(), attachments);
    setText('');
    setAttachments([]);
    setErrorMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="neumorphic-inset rounded-3xl p-3 flex flex-col gap-2">
      {errorMsg && (
        <div className="flex items-center justify-between neumorphic-inset rounded-xl px-3 py-1.5 text-xs text-rose-600 font-bold">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-rose-600 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isRecording && (
        <div className="flex items-center gap-2 neumorphic-inset rounded-xl px-3 py-1.5 text-xs text-rose-600 font-bold animate-pulse">
          <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
          <span>Listening... Speak your instruction now.</span>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-black/5">
          {attachments.map((att, idx) => (
            <div key={idx} className="neumorphic-inset rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-xs relative group">
              {att.isImage ? (
                <img src={att.dataUrl} alt={att.name} className="w-6 h-6 rounded object-cover flex-shrink-0" />
              ) : (
                <FileText className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
              )}
              <span className="text-[11px] text-[#3D4852] font-bold truncate max-w-[120px] font-sans">{att.name}</span>
              <button
                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                className="text-[#6B7280] hover:text-rose-600 transition-colors cursor-pointer ml-1"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <span className="text-[10px] text-[#6B7280] self-center font-mono font-bold ml-auto">
            {attachments.length}/8 files
          </span>
        </div>
      )}

      <div className="flex items-end gap-2.5">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,.pdf,.txt,.md,.json,.csv,.doc,.docx"
          multiple
          hidden
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isDisabled}
          className="neumorphic-btn rounded-full p-2.5 cursor-pointer flex-shrink-0"
          title="Attach image or file (max 8 files)"
        >
          <Paperclip className="w-4 h-4 text-[#3D4852]" />
        </button>

        <button
          onClick={toggleMicRecording}
          disabled={isDisabled}
          className={`neumorphic-btn rounded-full p-2.5 cursor-pointer flex-shrink-0 ${
            isRecording ? 'text-rose-600 font-bold' : 'text-[#3D4852]'
          }`}
          title={isRecording ? 'Stop Recording' : 'Voice Input (Click to speak)'}
        >
          {isRecording ? <MicOff className="w-4 h-4 text-rose-600 animate-pulse" /> : <Mic className="w-4 h-4 text-[#3D4852]" />}
        </button>

        <textarea
          className="bg-transparent text-[#3D4852] placeholder:text-[#6B7280] outline-none w-full text-sm resize-none max-h-32 py-1 font-sans font-medium"
          rows={1}
          placeholder={isRecording ? 'Listening...' : 'Ask anything or speak instructions... (Enter to send)'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
        />

        <button
          onClick={handleSubmit}
          disabled={(!text.trim() && attachments.length === 0) || isDisabled}
          className={`rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all ${
            ((!text.trim() && attachments.length === 0) || isDisabled)
              ? 'opacity-40 cursor-not-allowed bg-[#6C63FF] text-white'
              : 'bg-[#6C63FF] text-white hover:bg-[#8B84FF] shadow-md cursor-pointer'
          }`}
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
