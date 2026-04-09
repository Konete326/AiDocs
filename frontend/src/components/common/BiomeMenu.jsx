"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Circle, FileText, Layout, Zap, Settings, X } from "lucide-react";

/**
 * BiomeMenu Component
 * A high-fidelity, dual-panel navigation modal for SwiftDocs AI.
 */
const BiomeMenu = ({
    isOpen,
    onClose,
    sidebarTitle = "SwiftDocs AI",
    sidebarDescription = "The next generation of AI-powered technical documentation.",
    items = [
        { title: "Generations", icon: <Zap className="w-4 h-4 text-white" /> },
        { title: "Workspace", icon: <Layout className="w-4 h-4 text-white" /> },
        { title: "Documents", icon: <FileText className="w-4 h-4 text-white" /> },
        { title: "Settings", icon: <Settings className="w-4 h-4 text-white" /> },
    ],
}) => {
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
                        className="relative z-[101] w-full max-w-[95vw] md:max-w-[700px] h-auto max-h-[90vh] md:h-[400px] flex flex-col md:flex-row overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
                        style={{
                            backgroundColor: "#000000",
                            borderRadius: "1.5rem",
                        }}
                    >
                        {/* Close button - mobile only */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 md:hidden w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>

                        {/* Sidebar */}
                        <div
                            className="relative overflow-hidden p-6 md:p-8 flex flex-col justify-between w-full md:w-[35%] shrink-0"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.03)",
                            }}
                        >
                            <div
                                className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full blur-[80px] opacity-20"
                                style={{ backgroundColor: "#ffffff" }}
                            />

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

                        {/* Content Grid */}
                        <div className="flex-1 p-4 md:p-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 bg-white/[0.02] overflow-y-auto">
                            {items.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl md:rounded-3xl p-3 md:p-5 transition-all cursor-pointer flex items-center gap-3 md:gap-5 hover:bg-white/5 border border-white/[0.03] group"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.02)",
                                    }}
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg bg-white/10 group-hover:bg-white/20 transition-colors shrink-0">
                                        {item.icon || <Circle className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className="text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors tracking-tight">
                                        {item.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BiomeMenu;
