import { Zap, Shield, Target } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="text-center pt-16 pb-10 sm:pt-20 sm:pb-14 px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
        Know exactly what's holding
        <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
          {' '}your resume back.
        </span>
      </h1>

      <p className="mt-5 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
        Upload your resume and get an ATS-focused breakdown of formatting,
        keywords, sections, and bullet points.
      </p>

      {/* Trust indicators */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-indigo-500" />
          <span>ATS-focused analysis</span>
        </div>
        <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-indigo-500" />
          <span>Recruiter-level insights</span>
        </div>
        <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-indigo-500" />
          <span>Results in under 30 seconds</span>
        </div>
      </div>
    </section>
  );
}
