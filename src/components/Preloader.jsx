import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  { text: '> initializing gourav.dev...', delay: 0, suffix: ' [OK]', suffixColor: '#00FF9D' },
  { text: '> loading neural networks......', delay: 400, suffix: ' [OK]', suffixColor: '#00FF9D' },
  { text: '> mounting AI/ML systems.......', delay: 800, suffix: ' [OK]', suffixColor: '#00FF9D' },
  { text: '> compiling 3+ years experience', delay: 1200, suffix: ' [OK]', suffixColor: '#00FF9D' },
  { text: '> calibrating intelligence.....', delay: 1600, suffix: ' [OK]', suffixColor: '#00FF9D' },
  { text: '> ready.', delay: 2000, suffix: '', suffixColor: '' },
];

export const Preloader = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 600);
        }
      }, line.delay);
    });
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020608',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: done ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(12px, 1.5vw, 15px)',
          lineHeight: '2',
          color: '#8BA3B8',
          minWidth: '360px',
        }}
      >
        {/* Terminal Header dots */}
        <div className="flex gap-2 mb-4 pb-2 border-b border-[#1A2332]">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-[#8BA3B8] text-xs ml-2">neural_terminal_boot.sh</span>
        </div>

        {/* Boot Logs */}
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span>{line.text}</span>
            {line.suffix && (
              <span style={{ color: line.suffixColor, fontWeight: 600, marginLeft: '4px' }}>
                {line.suffix}
              </span>
            )}
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{BOOT_LINES[visibleLines]?.text.slice(0, 3)}</span>
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '16px',
                background: '#00D9FF',
                marginLeft: '2px',
                animation: 'blink 1s step-end infinite',
              }}
            />
          </div>
        )}
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
};

export default Preloader;
