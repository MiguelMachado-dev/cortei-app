const LoadingSidebar = () => {
  return (
    <div className="glass-card rounded-2xl p-6 lg:p-8 h-full">
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full animate-pulse-slow" />
          <div className="space-y-2">
            <div className="h-8 w-48 rounded-lg bg-white/10 animate-pulse" />
            <div className="h-4 w-64 rounded-lg bg-white/5 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-12 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-slow" />
            <div className="h-4 w-32 rounded-lg bg-white/10 animate-pulse" />
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`loading-1-${i}`}
                  className="h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow"
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`loading-2-${i}`}
                  className="h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow"
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`loading-3-${i}`}
                  className="h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow"
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-slow" />
            <div className="h-4 w-32 rounded-lg bg-white/10 animate-pulse" />
          </div>
          <div className="h-12 w-full rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow" />
        </div>

        <div className="mt-auto">
          <div className="h-14 w-full rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10 animate-pulse-slow" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSidebar;
