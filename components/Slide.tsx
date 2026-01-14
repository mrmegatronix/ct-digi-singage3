import React from 'react';
import { DailySpecial } from '../types';

interface SlideProps {
  special: DailySpecial;
  isActive: boolean;
}

const LOGO_URL = "./Coasters-Logo-Web.png";

export const Slide: React.FC<SlideProps> = ({ special, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-zinc-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={special.imageUrl} 
          alt={special.title} 
          className="w-full h-full object-cover opacity-60 transition-transform duration-[20s] ease-linear transform scale-100 hover:scale-110 motion-safe:animate-ken-burns" 
          style={{ animation: isActive ? 'kenburns 20s infinite alternate' : 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>

      {/* Logo Watermark */}
      <div className="absolute top-8 left-8 z-30 opacity-90">
        <img src={LOGO_URL} alt="Coasters Tavern" className="w-32 md:w-48 drop-shadow-lg" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 z-10">
        <div className="mb-4">
          <span className="inline-block px-4 py-1 uppercase tracking-widest text-sm font-semibold text-white bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
            {special.day} Special
          </span>
        </div>
        
        <h1 
          className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-xl"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {special.title}
        </h1>
        
        <div 
          className="h-1 w-32 mb-8 rounded"
          style={{ backgroundColor: special.highlightColor }}
        />
        
        <p className="text-xl md:text-3xl text-zinc-100 max-w-4xl mb-10 leading-relaxed drop-shadow-md font-light">
          {special.description}
        </p>

        <div className="relative group">
          <div 
            className="absolute -inset-1 blur opacity-40 group-hover:opacity-75 transition duration-1000"
            style={{ backgroundColor: special.highlightColor }}
          />
          <div className="relative px-12 py-6 bg-black border border-white/10 rounded-lg">
            <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
              {special.price}
            </span>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 text-center opacity-60">
          <p className="text-sm uppercase tracking-widest">Coasters Tavern &bull; Redwood, Christchurch</p>
        </div>
      </div>
    </div>
  );
};