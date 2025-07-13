
import React from 'react';

type CharacterStatus = 'idle' | 'success' | 'warning' | 'info';

interface CharacterProps {
  status: CharacterStatus;
  message: string;
}

const CharacterSVG: React.FC<{ status: CharacterStatus }> = ({ status }) => {
  const statusGlow = {
    idle: "drop-shadow-[0_0_8px_rgba(139,233,253,0.5)]",
    info: "drop-shadow-[0_0_8px_rgba(139,233,253,0.5)]",
    success: "drop-shadow-[0_0_8px_rgba(80,250,123,0.7)]",
    warning: "drop-shadow-[0_0_8px_rgba(255,85,85,0.7)]",
  };

  // 冒険者のパーツ
  const helmet = <g fill="#a1a1aa"><path d="M7 3h6v1H7z M6 4h8v1H6z M5 5h10v1H5z M5 6h1v2H5z M14 6h1v2h-1z" /></g>;
  const face = <g fill="#fde68a"><path d="M6 6h8v5H6z" /></g>;
  const armor = <g fill="#78716c"><path d="M5 11h10v4H5z M4 12h1v2H4z M15 12h1v2h-1z" /></g>;
  const eyes = <g fill="#27272a"><path d="M8 8h2v1H8z M12 8h2v1h-2z" /></g>;
  
  let mouth;
  let accessories = <></>;

  switch (status) {
    case 'success':
      mouth = <g fill="#27272a"><path d="M9 10c1 1 2 1 3 0v1H9z" /></g>; // Smile
      accessories = <g fill="#fef08a"><path d="M3 7h1v1H3z M16 7h1v1h-1z" /></g>; // Sparkle
      break;
    case 'warning':
      mouth = <g fill="#27272a"><path d="M9 11h4v-1h-4z" /></g>; // Worried
      accessories = <g fill="#8be9fd"><path d="M7 7h1v2H7z" /></g>; // Sweat drop
      break;
    case 'idle':
    case 'info':
    default:
      mouth = <g fill="#27272a"><path d="M9 10h4v1H9z" /></g>; // Neutral
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={`w-32 h-32 transition-all duration-300 ${statusGlow[status]}`}
      shapeRendering="crispEdges"
    >
      {helmet}
      {face}
      {armor}
      {eyes}
      {mouth}
      {accessories}
    </svg>
  );
};

export const Character: React.FC<CharacterProps> = ({ status, message }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <CharacterSVG status={status} />
      <div className="mt-4 relative w-full bg-[#44475a] border-2 border-[#6272a4] rounded-lg p-3 text-center">
        <p className="text-sm font-semibold text-[#f8f8f2]">{message}</p>
        <div className="absolute left-1/2 -top-3 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[12px] border-b-[#6272a4]"></div>
         <div className="absolute left-1/2 -top-2.5 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-[#44475a]"></div>
      </div>
    </div>
  );
};
