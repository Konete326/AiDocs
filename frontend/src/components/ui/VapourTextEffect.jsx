"use client";

import React, { useRef, useEffect, useState, createElement, useMemo, useCallback, memo } from "react";
import { useInView } from "motion/react";

export const Tag = {
  H1: "h1",
  H2: "h2",
  H3: "h3",
  P: "p",
};

export default function VapourTextEffect({
  texts = ["Next.js", "React"],
  font = {
    fontFamily: "Inter, sans-serif",
    fontSize: "50px",
    fontWeight: 600,
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  animation = {
    vaporizeDuration: 2.5,
    fadeInDuration: 1.5,
    waitDuration: 2,
  },
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const isInView = useInView(wrapperRef, { margin: "-50px" });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationState, setAnimationState] = useState("static");
  const vaporizeProgressRef = useRef(0);
  const fadeOpacityRef = useRef(0);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.devicePixelRatio || 1;
    }
    return 1;
  }, []);

  const wrapperStyle = useMemo(() => ({
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }), []);

  const canvasStyle = useMemo(() => ({
    display: "block",
    pointerEvents: "none",
  }), []);

  const animationDurations = useMemo(() => ({
    VAPORIZE_DURATION: (animation.vaporizeDuration ?? 2.5) * 1000,
    FADE_IN_DURATION: (animation.fadeInDuration ?? 1.5) * 1000,
    WAIT_DURATION: (animation.waitDuration ?? 2) * 1000,
  }), [animation.vaporizeDuration, animation.fadeInDuration, animation.waitDuration]);

  const fontConfig = useMemo(() => {
    const fontSizeNum = parseInt(String(font.fontSize).replace("px", "") || "50");
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSizeNum);
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
    return {
      fontSize: fontSizeNum,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 400} ${fontSizeNum}px ${font.fontFamily}`, // Font logic handled in renderCanvas
    };
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread]);

  const memoizedUpdateParticles = useCallback((particles, vaporizeX, deltaTime, textBoundaries) => {
    return updateParticles(
      particles,
      vaporizeX,
      deltaTime,
      fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
      animationDurations.VAPORIZE_DURATION,
      direction,
      transformedDensity,
      textBoundaries
    );
  }, [fontConfig.MULTIPLIED_VAPORIZE_SPREAD, animationDurations.VAPORIZE_DURATION, direction, transformedDensity]);

  const memoizedRenderParticles = useCallback((ctx, particles) => {
    renderParticles(ctx, particles, globalDpr);
  }, [globalDpr]);

  // Handle intersection and initial load
  useEffect(() => {
    if (isInView) {
      if (animationState === "static") {
        setAnimationState("vaporizing");
      }
    } else {
      setAnimationState("static");
    }
  }, [isInView]);

  // Main animation loop
  useEffect(() => {
    if (!isInView || wrapperSize.width === 0) return;

    let lastTime = performance.now();
    let frameId;

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: true });

      if (!canvas || !ctx) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      // Initialize particles if empty
      if (particlesRef.current.length === 0) {
        renderCanvas({
          framerProps: { texts, font, color, alignment },
          canvasRef,
          wrapperSize,
          particlesRef,
          globalDpr,
          currentTextIndex,
        });
        frameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const textBoundaries = canvas.textBoundaries;

      switch (animationState) {
        case "static": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
        case "vaporizing": {
          vaporizeProgressRef.current += deltaTime * 100 / (animationDurations.VAPORIZE_DURATION / 1000 || 1);
          
          const progress = Math.min(100, vaporizeProgressRef.current);
          const vaporizeX = direction === "left-to-right"
            ? (textBoundaries?.left ?? 0) + (textBoundaries?.width ?? canvas.width) * progress / 100
            : (textBoundaries?.right ?? canvas.width) - (textBoundaries?.width ?? canvas.width) * progress / 100;

          const allVaporized = memoizedUpdateParticles(particlesRef.current, vaporizeX, deltaTime, textBoundaries);
          memoizedRenderParticles(ctx, particlesRef.current);

          if (vaporizeProgressRef.current >= 120 && allVaporized) { // Added buffer to ensure full vaporization
            const nextIndex = (currentTextIndex + 1) % texts.length;
            setCurrentTextIndex(nextIndex);
            setAnimationState("fadingIn");
            fadeOpacityRef.current = 0;
            vaporizeProgressRef.current = 0;
          }
          break;
        }
        case "fadingIn": {
          fadeOpacityRef.current += deltaTime * 1000 / (animationDurations.FADE_IN_DURATION || 1);
          const currentOpacity = Math.min(1, fadeOpacityRef.current);

          // Fast path for fading in: just draw original positions
          ctx.save();
          ctx.scale(globalDpr, globalDpr);
          particlesRef.current.forEach(particle => {
            const opacity = currentOpacity * (particle.originalAlpha || 1);
            if (opacity > 0.01) {
              const baseColor = particle.color.substring(0, particle.color.lastIndexOf(",") + 1);
              ctx.fillStyle = `${baseColor} ${opacity})`;
              ctx.fillRect(particle.originalX / globalDpr, particle.originalY / globalDpr, 1, 1);
            }
          });
          ctx.restore();

          if (fadeOpacityRef.current >= 1) {
            setAnimationState("waiting");
            setTimeout(() => {
              if (isInView) {
                setAnimationState("vaporizing");
                vaporizeProgressRef.current = 0;
                resetParticles(particlesRef.current);
              }
            }, animationDurations.WAIT_DURATION);
          }
          break;
        }
        case "waiting": {
          memoizedRenderParticles(ctx, particlesRef.current);
          break;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [
    animationState, isInView, texts, direction, globalDpr,
    memoizedUpdateParticles, memoizedRenderParticles,
    animationDurations, wrapperSize, currentTextIndex
  ]);

  // Re-render canvas when text/size changes
  useEffect(() => {
    if (wrapperSize.width > 0 && wrapperSize.height > 0) {
      renderCanvas({
        framerProps: { texts, font, color, alignment },
        canvasRef,
        wrapperSize,
        particlesRef,
        globalDpr,
        currentTextIndex,
      });
    }
  }, [texts, font, color, alignment, wrapperSize, currentTextIndex, globalDpr]);

  // Resize listener
  useEffect(() => {
    const container = wrapperRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setWrapperSize({ width: rect.width, height: rect.height });
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();
    
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} style={wrapperStyle} className="vapour-text-wrapper">
      <canvas ref={canvasRef} style={canvasStyle} />
      <SeoElement tag={tag} texts={texts} />
    </div>
  );
}

const SeoElement = memo(({ tag = Tag.P, texts }) => {
  const style = useMemo(() => ({
    position: "absolute",
    width: "1px",
    height: "1px",
    opacity: 0,
    overflow: "hidden",
    userSelect: "none",
    pointerEvents: "none",
  }), []);

  const safeTag = Object.values(Tag).includes(tag) ? tag : "p";
  return createElement(safeTag, { style }, texts?.join(" ") ?? "");
});

const renderCanvas = ({
  framerProps,
  canvasRef,
  wrapperSize,
  particlesRef,
  globalDpr,
  currentTextIndex,
}) => {
  const canvas = canvasRef.current;
  if (!canvas || !wrapperSize.width || !wrapperSize.height) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const { width, height } = wrapperSize;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = Math.floor(width * globalDpr);
  canvas.height = Math.floor(height * globalDpr);

  // Responsive font scaling
  let fontSize = parseInt(String(framerProps.font?.fontSize).replace("px", "") || "50");
  if (width < 640 && fontSize > 32) fontSize = 32; // Scale down for mobile if too big
  
  const font = `${framerProps.font?.fontWeight ?? 500} ${fontSize * globalDpr}px ${framerProps.font?.fontFamily ?? "Inter, sans-serif"}`;
  const color = parseColor(framerProps.color ?? "rgba(255, 255, 255, 0.9)");

  const currentText = framerProps.texts[currentTextIndex] || "";

  const { particles, textBoundaries } = createParticles(
    ctx, 
    canvas, 
    currentText, 
    fontSize * globalDpr, 
    font, 
    color, 
    framerProps.alignment || "center"
  );
  
  particlesRef.current = particles;
  canvas.textBoundaries = textBoundaries;
};

const createParticles = (ctx, canvas, text, lineHeight, font, color, alignment) => {
  const particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";

  const maxWidth = canvas.width * 0.9;
  const words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  // Helper for multi-line support
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  const totalHeight = lines.length * lineHeight;
  let startY = (canvas.height - totalHeight) / 2 + lineHeight / 2;
  let textX = alignment === "center" ? canvas.width / 2 : alignment === "left" ? canvas.width * 0.05 : canvas.width * 0.95;

  let minX = canvas.width, maxX = 0;

  lines.forEach((line, index) => {
    const y = startY + index * lineHeight;
    ctx.fillText(line, textX, y);
    const metrics = ctx.measureText(line);
    const lw = metrics.width;
    const lx = alignment === "center" ? textX - lw / 2 : alignment === "left" ? textX : textX - lw;
    minX = Math.min(minX, lx);
    maxX = Math.max(maxX, lx + lw);
  });

  const textBoundaries = { left: minX, right: maxX, width: maxX - minX };

  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const sampleRate = 2;

    for (let y = 0; y < canvas.height; y += sampleRate) {
      for (let x = 0; x < canvas.width; x += sampleRate) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];
        if (alpha > 40) {
          const normalizedAlpha = alpha / 255;
          particles.push({
            x, y, 
            originalX: x, originalY: y,
            color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]},`,
            originalAlpha: normalizedAlpha,
            opacity: normalizedAlpha,
            velocityX: 0, velocityY: 0, angle: 0, speed: 0,
          });
        }
      }
    }
  } catch (e) {
    console.warn("Canvas read error:", e);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { particles, textBoundaries };
};

const updateParticles = (particles, vaporizeX, deltaTime, MULTIPLIED_VAPORIZE_SPREAD, VAPORIZE_DURATION, direction, density, textBoundaries) => {
  let allParticlesVaporized = true;
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const shouldVaporize = direction === "left-to-right" 
      ? particle.originalX <= vaporizeX 
      : particle.originalX >= vaporizeX;

    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1.5 + 0.5) * (MULTIPLIED_VAPORIZE_SPREAD || 1);
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }
      
      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime * 1.5);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const damping = Math.max(0.85, 1 - dist / 500);
        
        particle.velocityX = (particle.velocityX + (Math.random() - 0.5) * 5) * damping;
        particle.velocityY = (particle.velocityY + (Math.random() - 0.5) * 5) * damping;
        
        particle.x += particle.velocityX * deltaTime * 40;
        particle.y += particle.velocityY * deltaTime * 30;
        particle.opacity = Math.max(0, particle.opacity - deltaTime * 0.4);
      }
      if (particle.opacity > 0.05) allParticlesVaporized = false;
    } else {
      allParticlesVaporized = false;
    }
  }
  return allParticlesVaporized;
};

const renderParticles = (ctx, particles, globalDpr) => {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    if (particle.opacity > 0.01) {
      ctx.fillStyle = `${particle.color} ${particle.opacity})`;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1.2, 1.2);
    }
  }
  ctx.restore();
};

const resetParticles = (particles) => {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x = p.originalX;
    p.y = p.originalY;
    p.opacity = p.originalAlpha;
    p.speed = 0;
    p.velocityX = 0;
    p.velocityY = 0;
  }
};

const calculateVaporizeSpread = (fontSize) => {
  const size = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  return Math.max(0.2, Math.min(2, size / 60));
};

const parseColor = (color) => {
  if (color.startsWith("rgba")) return color;
  const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (match) return `rgba(${match[1]}, ${match[2]}, ${match[3]}, 1)`;
  return color;
};

function transformValue(input, inputRange, outputRange, clamp = false) {
  const [iMin, iMax] = inputRange;
  const [oMin, oMax] = outputRange;
  let progress = (input - iMin) / (iMax - iMin);
  if (clamp) progress = Math.min(Math.max(progress, 0), 1);
  return oMin + progress * (oMax - oMin);
}
