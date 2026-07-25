import { Layers } from 'lucide-react';

export const renderStackIcon = (type) => {
  switch (type) {
    case 'react':
    case 'mern':
    case 'layers':
      return (
        <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="6" />
          <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="6" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="6" transform="rotate(120 50 50)" />
          <circle cx="50" cy="50" r="7" fill="#00D8FF" />
        </svg>
      );
    case 'nextjs':
      return (
        <svg className="w-5 h-5" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="86" fill="black" stroke="black" strokeWidth="8" />
          <path d="M149.996 150L80.354 53.078H62.906V126.853H75.767V72.228L139.73 160.84C143.376 157.514 146.809 153.886 149.996 150Z" fill="white" />
          <rect x="104.18" y="53.0781" width="12.8614" height="73.7747" fill="white" />
        </svg>
      );
    case 'python':
    case 'fastapi':
    case 'code':
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128">
          <path fill="#3776AB" d="M62.6 3.2c-28.7 0-26.9 12.4-26.9 12.4l.1 12.9h27.4v3.9H24.7S5.6 30.3 5.6 59.2c0 28.9 16.7 27.9 16.7 27.9h9.9V73.2s-.5-16.7 16.4-16.7h28.1s15.7.3 15.7-15.3V18.6s1.9-15.4-30-15.4zm-14.7 8.3c2.7 0 4.8 2.2 4.8 4.8s-2.2 4.8-4.8 4.8-4.8-2.2-4.8-4.8 2.2-4.8 4.8-4.8z" />
          <path fill="#FFD43B" d="M65.3 124.8c28.7 0 26.9-12.4 26.9-12.4l-.1-12.9H64.7v-3.9h38.5s19.1 2.1 19.1-26.8c0-28.9-16.7-27.9-16.7-27.9h-9.9v13.9s.5 16.7-16.4 16.7H51.7s-15.7-.3-15.7 15.3v23.5s-1.8 15.5 30.1 15.5zm14.7-8.3c-2.7 0-4.8-2.2-4.8-4.8s2.2-4.8 4.8-4.8 4.8 2.2 4.8 4.8-2.2 4.8-4.8 4.8z" />
        </svg>
      );
    case 'dotnet':
    case 'csharp':
    case 'shield':
      return (
        <svg className="w-5 h-5" viewBox="0 0 128 128">
          <path fill="#512BD4" d="M64 6.4L9.6 37.8v62.4L64 121.6l54.4-31.4V37.8L64 6.4z" />
          <path fill="#FFFFFF" d="M37 77.2V50.8h8.8c4.2 0 7.4.9 9.6 2.8 2.2 1.9 3.3 4.5 3.3 7.8 0 3.3-1.1 5.9-3.3 7.8-2.2 1.9-5.4 2.8-9.6 2.8H37zm6.2-5.2h2.4c2.5 0 4.4-.5 5.6-1.5 1.2-1 1.8-2.5 1.8-4.4 0-1.9-.6-3.4-1.8-4.4-1.2-1-3.1-1.5-5.6-1.5h-2.4v11.8zm21.6 5.2V50.8h6.2v26.4h-6.2zm23.6 0V50.8h17.2v5.2H94.6v5.2h12.6v5.2H94.6v5.6h14.2v5.2H88.4z" />
        </svg>
      );
    case 'laravel':
    case 'php':
    case 'database':
      return (
        <svg className="w-5 h-5" viewBox="0 0 512 512">
          <path fill="#FF2D20" d="M485.4 128.8L350.2 50.7c-7.8-4.5-17.5-4.5-25.3 0L189.7 128.8c-7.8 4.5-12.7 12.9-12.7 21.9v156.3c0 9 4.9 17.4 12.7 21.9l135.2 78.1c7.8 4.5 17.5 4.5 25.3 0l135.2-78.1c7.8-4.5 12.7-12.9 12.7-21.9V150.7c0-9-4.9-17.4-12.7-21.9z" />
          <path fill="#FFFFFF" opacity="0.9" d="M256 160l80 46.2v92.4L256 345l-80-46.4v-92.4L256 160z" />
        </svg>
      );
    case 'vite':
    case 'sparkles':
      return (
        <svg className="w-5 h-5" viewBox="0 0 256 257">
          <defs>
            <linearGradient id="vite-a" x1="98.5%" y1="0%" x2="1.5%" y2="100%">
              <stop offset="0%" stopColor="#41D1FF"/>
              <stop offset="100%" stopColor="#BD34FE"/>
            </linearGradient>
            <linearGradient id="vite-b" x1="23.2%" y1="0%" x2="80.6%" y2="98.4%">
              <stop offset="0%" stopColor="#FFEA83"/>
              <stop offset="8.3%" stopColor="#FFDD35"/>
              <stop offset="100%" stopColor="#FFA800"/>
            </linearGradient>
          </defs>
          <path fill="url(#vite-a)" d="M255.15 37.86L134.7 252.8a12.8 12.8 0 0 1-22.4 0L.85 37.86a6.4 6.4 0 0 1 8.52-8.85l112.5 53.64a12.8 12.8 0 0 0 11.26 0L246.63 29.01a6.4 6.4 0 0 1 8.52 8.85z"/>
          <path fill="url(#vite-b)" d="M185.4 0L121 120.4a4 4 0 0 1-7.1 0L76.5 45.4a4 4 0 0 1 3.5-5.9h44.3a4 4 0 0 0 3.7-2.4L137 15.3a4 4 0 0 1 3.7-2.4h41.2a4 4 0 0 1 3.5 5.9z"/>
        </svg>
      );
    case 'node':
    case 'nodejs':
    case 'server':
      return (
        <svg className="w-5 h-5" viewBox="0 0 256 289">
          <path fill="#339933" d="M128 0L0 73.9v147.8L128 295.6l128-73.9V73.9L128 0zm71.7 185.3c-2.3 3.9-5.7 7.1-9.9 9.3l-51 29.4c-4.2 2.4-9 3.7-13.8 3.7s-9.6-1.3-13.8-3.7l-51-29.4c-4.2-2.3-7.6-5.4-9.9-9.3-2.3-3.9-3.5-8.4-3.5-13V123c0-4.6 1.2-9.1 3.5-13 2.3-3.9 5.7-7.1 9.9-9.3l51-29.4c4.2-2.4 9-3.7 13.8-3.7s9.6 1.3 13.8 3.7l51 29.4c4.2 2.3 7.6 5.4 9.9 9.3 2.3 3.9 3.5 8.4 3.5 13v49.3c0 4.6-1.2 9.1-3.5 13z"/>
        </svg>
      );
    default:
      return <Layers className="w-5 h-5 text-blue-600" />;
  }
};
