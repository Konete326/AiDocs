import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function VoiceMicButton({ currentValue = '', onTranscript, className = '' }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const savedTextRef = useRef('');

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Voice dictation is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    try {
      savedTextRef.current = currentValue;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        toast.success('🎙️ Voice dictation active! Speak now...');
      };

      recognition.onresult = (event) => {
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
        if (onTranscript) onTranscript(combined);
      };

      recognition.onerror = (err) => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsRecording(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleRecording}
      className={`neumorphic-btn rounded-xl p-1.5 cursor-pointer flex items-center justify-center transition-all ${
        isRecording ? 'bg-rose-50 text-rose-600 font-bold animate-pulse ring-2 ring-rose-500/50' : 'text-[#6C63FF] hover:text-[#8B84FF]'
      } ${className}`}
      title={isRecording ? 'Stop Voice Dictation' : 'Voice-to-Text Dictation (Click to speak)'}
    >
      {isRecording ? <MicOff className="w-3.5 h-3.5 text-rose-600 animate-pulse" /> : <Mic className="w-3.5 h-3.5 text-[#6C63FF]" />}
    </button>
  );
}
