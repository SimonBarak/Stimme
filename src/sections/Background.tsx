export const Background = () => {
  return (
    <div className="fade-in">
      <svg
        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="gradient">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(255,255,0)", stopOpacity: 1 }}
            />
            <stop
              offset="10%"
              style={{ stopColor: "rgb(255,200,0)", stopOpacity: 1 }}
            />
            <stop
              offset="33%"
              style={{ stopColor: "#FFA500", stopOpacity: 0.8 }}
            />
            <stop
              offset="70%"
              style={{ stopColor: "#800080", stopOpacity: 0.4 }}
            />
            <stop
              offset="90%"
              style={{ stopColor: "#FFD700", stopOpacity: 0 }}
            />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
      </svg>
    </div>
  );
};
