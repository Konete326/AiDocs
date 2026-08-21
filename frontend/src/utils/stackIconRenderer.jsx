import { Layers, Smartphone, ShoppingBag } from 'lucide-react';

export const renderStackIcon = (type) => {
  switch (type) {
    case 'flutter':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M14.2 2L4 12.2L7.1 15.3L14.2 8.2L20.4 2H14.2Z" fill="#54C5F8"/>
          <path d="M14.2 12.2L8.6 17.8L11.7 20.9L14.2 18.4L17.3 21.5H20.4L14.2 15.3L17.3 12.2H14.2Z" fill="#01579B"/>
          <path d="M11.7 15.3L8.6 17.8L11.7 20.9L14.2 18.4L11.7 15.3Z" fill="#29B6F6"/>
        </svg>
      );
    case 'react_native':
    case 'expo':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="2" width="14" height="20" rx="3" fill="#61DAFB" fillOpacity="0.2" stroke="#61DAFB" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="4.5" ry="1.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="1" fill="#61DAFB"/>
        </svg>
      );
    case 'swift':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#FA7343" fillOpacity="0.2" stroke="#FA7343" strokeWidth="1.5"/>
          <path d="M17.5 17C14.5 17 11 15 9 12C12 13 14 12.5 15.5 11.5C12 11 9 9 7.5 5.5C8.5 7 10.5 8.5 12.5 8.5C9.5 6.5 8 4 8 4C9.5 5.5 12 7.5 15 7.5C14 6 13.5 4.5 13.5 4.5C15 6 17 8 18 10C17.5 9 17 8.5 17 8.5C18.5 10 19.5 12 19.5 14C19.5 15.8 18.7 17 17.5 17Z" fill="#FA7343"/>
        </svg>
      );
    case 'kotlin':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5" fill="#7F52FF" fillOpacity="0.2" stroke="#7F52FF" strokeWidth="1.5"/>
          <path d="M4 4L12 12L4 20V4Z" fill="#7F52FF"/>
          <path d="M12 12L20 4H12V12Z" fill="#C757BC"/>
          <path d="M12 12L20 20H4L12 12Z" fill="#E24462"/>
        </svg>
      );
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
    case 'nextjs_commerce':
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
          <path fill="#FFD43B" d="M65.3 124.8c28.7 0 26.9-12.4 26.9-12.4l-.1-12.9H64.7v-3.9h38.5s19.1 2.1 19.1-26.8c0-28.9-16.7-27.9-16.7-27.9h-9.9v13.9s.5 16.7-16.4 16.7H51.7s-15.7-.3-15.7 15.3v23.5s-1.8 15.5 30.1 15.5zm14.7-8.3c-2.7 0-4.8-2.2-4.8-4.8s2.2-4.8 4.8-4.8 4.8 2.2 4.8-4.8-2.2 4.8-4.8 4.8z" />
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
    case 'mobile':
      return <Smartphone className="w-5 h-5 text-[#6C63FF]" />;
    case 'ecommerce':
      return <ShoppingBag className="w-5 h-5 text-[#6C63FF]" />;
    default:
      return <Layers className="w-5 h-5 text-[#6C63FF]" />;
  }
};
