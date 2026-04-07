"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Circle, FileText, Layout, Zap, Settings } from "lucide-react";

interface BiomeMenuItem {
    title: string;
    icon?: React.ReactNode;
    iconColor?: string;
}

interface BiomeMenuProps {
    isOpen: boolean;
    onClose: () => void;
    sidebarTitle?: string;
    sidebarDescription?: string;
    items?: BiomeMenuItem[];
}

const BiomeMenu: React.FC<BiomeMenuProps> = ({
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
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 overflow-hidden">
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
                        className="relative z-[101] w-full max-w-[700px] h-[400px] flex overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
                        style={{
                            backgroundColor: "#000000",
                            borderRadius: "2.5rem",
                        }}
                    >
                        {/* Sidebar */}
                        <div
                            className="relative overflow-hidden p-8 flex flex-col justify-between"
                            style={{
                                width: "35%",
                                backgroundColor: "rgba(255,255,255,0.03)",
                            }}
                        >
                            <div
                                className="absolute top-[-50px] left-[-50px] w-48 h-48 rounded-full blur-[80px] opacity-20"
                                style={{ backgroundColor: "#ffffff" }}
                            />

                            <div className="relative z-10">
                                <h3 className="font-serif text-3xl font-medium italic mb-3 text-white tracking-tight">
                                    {sidebarTitle}
                                </h3>
                                <p className="text-sm text-white/40 leading-relaxed font-medium">
                                    {sidebarDescription}
                                </p>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer">
                                    <ArrowUpRight className="text-white/60 w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="flex-1 p-10 grid grid-cols-2 gap-5 bg-white/[0.02]">
                            {items.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-3xl p-5 transition-all cursor-pointer flex items-center gap-5 hover:bg-white/5 border border-white/[0.03] group"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.02)",
                                    }}
                                >
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                                        {item.icon || <Circle className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className="font-semibold text-white/80 group-hover:text-white transition-colors tracking-tight">
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
