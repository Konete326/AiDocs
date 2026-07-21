import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  XOctagon,
  X,
} from "lucide-react";

const alertToastVariants = cva(
  "relative w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl flex items-start p-3.5 space-x-3 liquid-glass-strong border z-[9999] pointer-events-auto",
  {
    variants: {
      variant: {
        success: "border-emerald-500/30 text-white bg-emerald-950/80 backdrop-blur-2xl shadow-emerald-500/10",
        warning: "border-amber-500/30 text-white bg-amber-950/80 backdrop-blur-2xl shadow-amber-500/10",
        info: "border-blue-500/30 text-white bg-blue-950/80 backdrop-blur-2xl shadow-blue-500/10",
        error: "border-rose-500/30 text-white bg-rose-950/80 backdrop-blur-2xl shadow-rose-500/10",
      },
      styleVariant: {
        default: "liquid-glass-strong border-white/10",
        filled: "shadow-2xl",
      },
    },
    defaultVariants: {
      variant: "info",
      styleVariant: "default",
    },
  }
);

const iconMap = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: XOctagon,
};

const iconColorClasses = {
  default: {
    success: "text-emerald-400",
    warning: "text-amber-400",
    info: "text-blue-400",
    error: "text-rose-400",
  },
  filled: {
    success: "text-emerald-400",
    warning: "text-amber-400",
    info: "text-blue-400",
    error: "text-rose-400",
  },
};

const AlertToast = React.forwardRef(
  ({ className, variant = 'info', styleVariant = 'default', title, description, onClose, ...props }, ref) => {
    const Icon = iconMap[variant] || Info;

    return (
      <motion.div
        ref={ref}
        role="alert"
        layout
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={cn(alertToastVariants({ variant, styleVariant }), className)}
        {...props}
      >
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={cn("h-5 w-5", iconColorClasses[styleVariant]?.[variant] || "text-white")} aria-hidden="true" />
        </div>

        <div className="flex-1 min-w-0 pr-2">
          {title && <p className="text-xs font-semibold text-white tracking-tight">{title}</p>}
          {description && <p className="text-xs text-white/80 leading-relaxed mt-0.5">{description}</p>}
        </div>
        
        {onClose && (
          <div className="flex-shrink-0">
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors outline-none cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </motion.div>
    );
  }
);

AlertToast.displayName = "AlertToast";

export { AlertToast, alertToastVariants };
