import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Circle, X } from "lucide-react";
import { useLocation } from "react-router-dom";

const BiomeMenu = ({
    isOpen,
    onClose,
    sidebarTitle = "SwiftDocs AI",
    sidebarDescription = "The next generation of AI-powered technical documentation.",
    items = [],
}) => {
    const location = useLocation();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-4 sm:pt-8 md:pt-24 px-2 sm:px-4 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="relative z-[101] w-full max-w-[95vw] md:max-w-[700px] h-auto max-h-[90vh] md:h-[400px] flex flex-col md:flex-row overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl bg-black/90 border-t border-l border-white/10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        <div className="relative overflow-hidden p-6 md:p-8 flex flex-col justify-between w-full md:w-[35%] shrink-0 bg-white/[0.03]">
                            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[80px] opacity-20 bg-white" />
                            <div className="relative z-10">
                                <h3 className="font-serif text-2xl md:text-3xl font-medium italic mb-2 md:mb-3 text-white tracking-tight">
                                    {sidebarTitle}
                                </h3>
                                <p className="text-xs md:text-sm text-white/40 leading-relaxed font-medium">
                                    {sidebarDescription}
                                </p>
                            </div>
                            <div className="relative z-10 mt-4 md:mt-auto hidden md:block">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                                    <ArrowUpRight className="text-white/60 w-4 h-4 md:w-5 md:h-5" />
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-4 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 bg-white/[0.02] overflow-y-auto content-start">
                            {items.map((item) => {
                                const isActive = item.href && location.pathname === item.href;
                                return (
                                    <div
                                        key={item.title}
                                        onClick={item.onClick}
                                        className={`rounded-2xl md:rounded-3xl p-3 md:p-5 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3 md:gap-5 group ${
                                            isActive
                                                ? "bg-white/10 ring-1 ring-white/20"
                                                : "bg-white/[0.02] hover:bg-white/5"
                                        }`}
                                    >
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg shrink-0 transition-colors ${isActive ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"}`}>
                                            {item.icon || <Circle className="w-4 h-4 text-white" />}
                                        </div>
                                        <span className={`text-sm md:text-base font-semibold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BiomeMenu;
