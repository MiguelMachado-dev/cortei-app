const LoadingTimeSelect = () => {
  return (
    <div
      title="Carregando... Escolha um horário"
      className="space-y-6"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-slow" />
          <div className="h-4 w-16 rounded-lg bg-white/10 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`manha-${i}`}
              className="h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-slow" />
          <div className="h-4 w-12 rounded-lg bg-white/10 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`tarde-${i}`}
              className="h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse-slow" />
          <div className="h-4 w-10 rounded-lg bg-white/10 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`noite-${i}`}
              className="h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse-slow"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingTimeSelect;
