export function AuthBrandSection() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-rich-black via-rich-black to-rich-black/95 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(246,94,60,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,216,198,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        {/* Logo */}
        <div>
          <h2 className="font-heading font-bold text-3xl text-white">
            Orange<span className="text-tomato">VC</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Service Distribution Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white/90 font-semibold text-lg">Service Distribution</h3>
              <button className="text-sm text-white/60 hover:text-white transition-colors">
                View Services
              </button>
            </div>
            
            <p className="text-white/50 text-sm mb-6">Most Popular Services</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="space-y-1">
                <p className="text-white/50 text-xs">Administrative</p>
                <p className="text-white font-bold text-2xl">35%</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/50 text-xs">Customer Support</p>
                <p className="text-white font-bold text-2xl">45%</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/50 text-xs">Digital Marketing</p>
                <p className="text-white font-bold text-2xl">20%</p>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="h-32 flex items-end justify-center gap-4 px-4">
              <div className="w-24 h-20 bg-gradient-to-t from-tomato/60 to-tomato/30 rounded-t-lg"></div>
              <div className="w-24 h-28 bg-gradient-to-t from-tomato to-tomato/70 rounded-t-lg relative">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-rich-black px-3 py-1 rounded-full text-sm font-semibold">
                  45%
                </div>
              </div>
              <div className="w-24 h-16 bg-gradient-to-t from-pale-dogwood/60 to-pale-dogwood/30 rounded-t-lg"></div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h1 className="font-heading font-bold text-4xl text-white leading-tight">
              Reclaim Your Time,<br />
              Focus on <span className="text-tomato italic">Growth</span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Join Orange Virtual Connect to delegate tasks efficiently,<br />
              scale your business faster, and achieve more with dedicated support.
            </p>
          </div>
        </div>

        {/* Footer placeholder for spacing */}
        <div></div>
      </div>
    </div>
  );
}

