import React, { useState, useEffect, useRef } from "react";

export function ProjectMedia({ videoUrl, imageUrl, projectTitle }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      if (isHovered) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Auto-play prevented or failed
            console.log("Auto-play prevented: ", error);
          });
        }
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, videoUrl]);

  if (!videoUrl || videoFailed) {
    return (
      <img
        src={imageUrl}
        alt={projectTitle}
        className="w-full h-[200px] object-cover rounded-t-2xl transition-all duration-300"
        loading="lazy"
        onError={(e) => {
          // If the microlink screenshot API is slow/fails, fallback to a solid premium gradient
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
        }}
      />
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-t-2xl overflow-hidden h-[200px] w-full bg-[#030608]"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        onError={() => setVideoFailed(true)}
        className="w-full h-full object-cover"
      />
      {/* Play indicator overlay */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-[#00D9FF]/20 border border-[#00D9FF] flex items-center justify-center text-[#00D9FF] text-xs shadow-[0_0_15px_rgba(0,217,255,0.4)] animate-pulse">
            ▶
          </div>
        </div>
      )}
    </div>
  );
}
