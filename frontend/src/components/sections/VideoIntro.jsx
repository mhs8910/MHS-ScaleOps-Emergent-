import { useState } from 'react';
import { Play } from 'lucide-react';

// Placeholder video — swap LOOM_URL or YOUTUBE_EMBED with a real one when available.
const LOOM_PLACEHOLDER = '';

export default function VideoIntro() {
  const [playing, setPlaying] = useState(false);

  return (
    <section data-testid="video-intro-section" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[140px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-10">
          <div className="label-eyebrow mb-4">90-Second Intro</div>
          <h2 className="heading-tight text-white text-3xl sm:text-4xl lg:text-5xl mb-4">
            From the operator<span className="text-amber-500">.</span>
          </h2>
          <p className="font-body text-slate-400 max-w-xl mx-auto">
            A short straight-talk explainer on the model, who it's for, and how we'll work together.
          </p>
        </div>

        <div className="relative aspect-video bg-[#0a0b0e] border border-slate-800 rounded-sm overflow-hidden group">
          {playing && LOOM_PLACEHOLDER ? (
            <iframe
              title="MHS-ScaleOps Founder Intro"
              src={LOOM_PLACEHOLDER}
              allow="autoplay; fullscreen; picture-in-picture"
              className="w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              data-testid="video-play-button"
              disabled={!LOOM_PLACEHOLDER}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white transition-all"
              aria-label="Play founder intro video"
            >
              {/* Background visual */}
              <img
                src="https://images.pexels.com/photos/10657877/pexels-photo-10657877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=720&w=1280"
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-50 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/95 via-[#050505]/70 to-teal-500/10" />

              {/* Play visual */}
              <div className="relative z-10 flex flex-col items-center gap-5">
                <div className={`w-20 h-20 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-2xl glow-amber group-hover:scale-110 transition-transform ${LOOM_PLACEHOLDER ? '' : 'opacity-70'}`}>
                  <Play size={28} fill="currentColor" className="ml-1" />
                </div>
                {!LOOM_PLACEHOLDER && (
                  <div className="bg-[#0f1115]/90 border border-slate-800 px-4 py-2 rounded-sm text-xs text-slate-400 tracking-wide">
                    Founder video coming soon — Hassan will record this directly.
                  </div>
                )}
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
