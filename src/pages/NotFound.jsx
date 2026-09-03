import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="w-full h-screen bg-[#030303] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-brand-yellow text-xs sm:text-sm font-mono tracking-[0.4em] uppercase mb-6 block font-bold">
          ERROR {error?.status || 404}
        </span>
        
        <h1 className="text-6xl sm:text-8xl lg:text-[120px] font-bold text-white leading-[1.0] tracking-tighter mb-8">
          PAGE NOT<br/>
          <span className="text-brand-yellow italic">FOUND.</span>
        </h1>
        
        <p className="text-lg text-white/50 font-light max-w-md mx-auto mb-12">
          {error?.statusText || error?.message || "The page you are looking for doesn't exist or has been moved."}
        </p>

        <Link 
          to="/" 
          className="group flex items-center gap-4 border border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-mono tracking-[0.2em] uppercase font-bold">RETURN HOME</span>
        </Link>
      </div>

    </section>
  );
};

export default NotFound;
