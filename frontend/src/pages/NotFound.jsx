import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, LayoutDashboard, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full bg-[#E0E5EC] text-[#3D4852] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <style>{`
        .my-custom-face-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 240px;
          background: transparent;
          color: #1924beff;
        }

        .my-custom-face-container .face {
          width: 160px;
        }

        .my-custom-face-container .face__eyes,
        .my-custom-face-container .face__eye-lid,
        .my-custom-face-container .face__mouth-left,
        .my-custom-face-container .face__mouth-right,
        .my-custom-face-container .face__nose,
        .my-custom-face-container .face__pupil {
          animation: eyes 1s 0.3s forwards;
        }

        .my-custom-face-container .face__eye-lid,
        .my-custom-face-container .face__pupil {
          animation-duration: 4s;
          animation-delay: 1.3s;
          animation-iteration-count: infinite;
        }

        .my-custom-face-container .face__eye-lid {
          animation-name: eye-lid;
        }
        .my-custom-face-container .face__mouth-left {
          animation-name: mouth-left;
        }
        .my-custom-face-container .face__mouth-right {
          animation-name: mouth-right;
        }
        .my-custom-face-container .face__nose {
          animation-name: nose;
        }
        .my-custom-face-container .face__pupil {
          animation-name: pupil;
        }

        @keyframes eye-lid {
          0%, 40%, 45%, 100% {
            transform: translateY(0);
          }
          42.5% {
            transform: translateY(17.5px);
          }
        }

        @keyframes eyes {
          from {
            transform: translateY(112.5px);
          }
          to {
            transform: translateY(15px);
          }
        }

        @keyframes pupil {
          0%, 37.5%, 40%, 45%, 87.5%, 100% {
            stroke-dashoffset: 0;
            transform: translate(0, 0);
          }
          12.5%, 25%, 62.5%, 75% {
            transform: translate(-35px, 0);
          }
          42.5% {
            stroke-dashoffset: 35;
            transform: translate(0, 17.5px);
          }
        }

        @keyframes mouth-left {
          from, 50% {
            stroke-dashoffset: -102;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes mouth-right {
          from, 50% {
            stroke-dashoffset: 102;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes nose {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(0, 22.5px);
          }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-lg p-6 sm:p-8 rounded-[32px] bg-[#E0E5EC] neumorphic-card border border-white/60 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex flex-col items-center text-center space-y-6">
        <div className="my-custom-face-container">
          <svg className="face" viewBox="0 0 320 380">
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="25"
            >
              <g className="face__eyes" transform="translate(0,112.5)">
                <g transform="translate(15,0)">
                  <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                  <polyline
                    className="face__pupil"
                    points="55,120 55,155"
                    strokeDasharray="35 35"
                  />
                </g>
                <g transform="translate(230,0)">
                  <polyline className="face__eye-lid" points="37,0 0,120 75,120" />
                  <polyline
                    className="face__pupil"
                    points="55,120 55,155"
                    strokeDasharray="35 35"
                  />
                </g>
              </g>
              <rect
                className="face__nose"
                x="132.5"
                y="112.5"
                width="55"
                height="155"
                rx="4"
                ry="4"
              />
              <g transform="translate(65,334)" strokeDasharray="102 102">
                <path className="face__mouth-left" d="M 0 30 C 0 30 40 0 95 0" />
                <path className="face__mouth-right" d="M 95 0 C 150 0 190 30 190 30" />
              </g>
            </g>
          </svg>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6C63FF]/15 text-[#6C63FF] font-mono text-xs font-bold neumorphic-inset">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ERROR 404</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D4852] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto font-medium">
            The page or route you are looking for does not exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full">
          <button
            onClick={() => navigate(-1)}
            className="neumorphic-btn rounded-2xl px-5 py-2.5 text-xs text-[#3D4852] font-bold hover:text-[#6C63FF] transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#6C63FF]" />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            className="bg-[#6C63FF] hover:bg-[#8B84FF] text-white rounded-2xl px-6 py-2.5 text-xs font-extrabold shadow-[4px_4px_10px_rgba(108,99,255,0.35)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border-none"
          >
            {isAuthenticated ? (
              <>
                <LayoutDashboard className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </>
            ) : (
              <>
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
