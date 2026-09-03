import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactFormSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cf-fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#f9f9f9] text-black overflow-hidden px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden cf-fade-up">
        
        {/* Left Side: Info (Black Block) */}
        <div className="w-full lg:w-[40%] bg-[#050505] text-white p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="mb-12 relative z-10">
             <span className="text-brand-yellow text-xs font-mono tracking-[0.3em] uppercase mb-6 block font-bold">
                GET IN TOUCH
             </span>
             <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold uppercase leading-[1.05] tracking-tight mb-6">
                WE ARE READY<br/>
                TO <span className="text-brand-yellow">LISTEN.</span>
             </h2>
             <p className="text-lg text-white/70 font-light leading-relaxed max-w-sm">
                Whether you have a premium property requiring dedicated stewardship, or a complex architectural project, our team is here.
             </p>
          </div>

          <div className="flex flex-col gap-8 mt-12 lg:mt-auto relative z-10">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Email</h3>
              <p className="text-lg font-medium tracking-tight hover:text-brand-yellow transition-colors cursor-pointer w-max">info@safehands.com</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Phone</h3>
              <p className="text-lg font-medium tracking-tight hover:text-brand-yellow transition-colors cursor-pointer w-max">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Location</h3>
              <p className="text-base font-light text-white/80 max-w-[250px] leading-relaxed">
                123 Architectural Ave, Suite 400<br/>Design District, NY 10001
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form (White Block) */}
        <div className="w-full lg:w-[60%] bg-[#ffffff] p-12 lg:p-16 flex flex-col justify-center">
            
          <div className="mb-12">
             <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-black leading-[1.1]">
                START A<br/>
                CONVERSATION.
             </h3>
          </div>

          <form className="flex flex-col gap-8 w-full max-w-2xl">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col relative group">
                <input type="text" id="name" required className="w-full bg-transparent border-b border-black/20 py-3 text-black outline-none focus:border-brand-yellow transition-colors peer placeholder-transparent" placeholder="Name" />
                <label htmlFor="name" className="absolute left-0 top-3 text-black/40 text-xs font-mono uppercase tracking-[0.1em] transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-yellow peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-black/40 cursor-text font-semibold">Name</label>
              </div>
              <div className="flex flex-col relative group">
                <input type="email" id="email" required className="w-full bg-transparent border-b border-black/20 py-3 text-black outline-none focus:border-brand-yellow transition-colors peer placeholder-transparent" placeholder="Email" />
                <label htmlFor="email" className="absolute left-0 top-3 text-black/40 text-xs font-mono uppercase tracking-[0.1em] transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-yellow peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-black/40 cursor-text font-semibold">Email</label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col relative group">
                <input type="tel" id="phone" required className="w-full bg-transparent border-b border-black/20 py-3 text-black outline-none focus:border-brand-yellow transition-colors peer placeholder-transparent" placeholder="Phone" />
                <label htmlFor="phone" className="absolute left-0 top-3 text-black/40 text-xs font-mono uppercase tracking-[0.1em] transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-yellow peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-black/40 cursor-text font-semibold">Phone</label>
              </div>
              <div className="flex flex-col relative group">
                <select id="property-type" required defaultValue="" className="w-full bg-transparent border-b border-black/20 py-3 text-black outline-none focus:border-brand-yellow transition-colors peer appearance-none rounded-none cursor-pointer">
                  <option value="" disabled hidden></option>
                  <option value="res" className="text-black">Residential Care</option>
                  <option value="com" className="text-black">Commercial Care</option>
                  <option value="arch" className="text-black">Architectural Planning</option>
                  <option value="dev" className="text-black">Property Development</option>
                  <option value="other" className="text-black">Other</option>
                </select>
                <label htmlFor="property-type" className="absolute left-0 top-3 text-black/40 text-xs font-mono uppercase tracking-[0.1em] transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-yellow peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-black/40 font-semibold">Property Type</label>
              </div>
            </div>

            <div className="flex flex-col relative group">
              <textarea id="message" rows="4" required className="w-full bg-transparent border-b border-black/20 py-3 text-black outline-none focus:border-brand-yellow transition-colors peer placeholder-transparent resize-none" placeholder="Message"></textarea>
              <label htmlFor="message" className="absolute left-0 top-3 text-black/40 text-xs font-mono uppercase tracking-[0.1em] transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-brand-yellow peer-valid:-top-4 peer-valid:text-[10px] peer-valid:text-black/40 cursor-text font-semibold">Message</label>
            </div>
            
            <button type="submit" className="group mt-4 flex items-center justify-between w-full lg:w-max py-4 px-8 bg-black text-white hover:bg-brand-yellow hover:text-black transition-colors font-mono text-sm tracking-[0.2em] uppercase rounded-lg">
              <span className="transition-colors pr-8">Send Message</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
            </button>
            
          </form>

        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;
