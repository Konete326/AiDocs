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

  const toggleMicRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
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
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMsg('');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setText(transcript);
        }
      };

      recognition.onerror = (err) => {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
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
    <div className="liquid-glass-strong rounded-2xl px-4 py-3 flex flex-col gap-2 shadow-xl">
      {errorMsg && (
        <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-1.5 text-xs text-amber-300">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg('')} className="text-amber-300/60 hover:text-amber-300 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {isRecording && (
        <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl px-3 py-1.5 text-xs text-rose-300 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>Listening... Speak your instruction now.</span>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2 border-b border-white/10">
          {attachments.map((att, idx) => (
            <div key={idx} className="liquid-glass rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-xs border border-white/10 shadow-sm relative group">
              {att.isImage ? (
                <img src={att.dataUrl} alt={att.name} className="w-6 h-6 rounded object-cover flex-shrink-0 border border-white/10" />
              ) : (
                <FileText className="w-4 h-4 text-[#6C63FF] flex-shrink-0" />
              )}
              <span className="text-[11px] text-white/90 truncate max-w-[120px] font-sans">{att.name}</span>
              <button
                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                className="text-white/40 hover:text-white transition-colors cursor-pointer ml-1"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <span className="text-[10px] text-white/40 self-center font-mono ml-auto">
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
          className="liquid-glass rounded-full p-2.5 hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
          title="Attach image or file (max 8 files)"
        >
          <Paperclip className="w-4 h-4 text-white/70 hover:text-white" />
        </button>

        <button
          onClick={toggleMicRecording}
          disabled={isDisabled}
          className={`liquid-glass rounded-full p-2.5 hover:scale-105 transition-transform cursor-pointer flex-shrink-0 ${
            isRecording ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.4)]' : 'text-white/70 hover:text-white'
          }`}
          title={isRecording ? 'Stop Recording' : 'Voice Input (Click to speak)'}
        >
          {isRecording ? <MicOff className="w-4 h-4 text-rose-400 animate-pulse" /> : <Mic className="w-4 h-4" />}
        </button>

        <textarea
          className="bg-transparent text-white placeholder:text-white/30 outline-none w-full text-sm resize-none max-h-32 py-1 font-sans"
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
          className={`liquid-glass rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 ${
            ((!text.trim() && attachments.length === 0) || isDisabled) ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
          }`}
        >
          <Send className="w-4 h-4 text-white/70" />
        </button>
      </div>
    </div>
  );
}
