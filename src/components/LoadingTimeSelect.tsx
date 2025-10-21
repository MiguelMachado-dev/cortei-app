const LoadingTimeSelect = () => {
  return (
    <div
      title="Carregando... Escolha um horário"
      className="flex animate-pulse flex-col gap-6"
    >
      <div>
        <div className="mb-3 h-5 w-24 rounded bg-gray-600" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`manha-${i}`}
              className="h-10 w-20 rounded-lg bg-gray-600"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 h-5 w-20 rounded bg-gray-600" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`tarde-${i}`}
              className="h-10 w-20 rounded-lg bg-gray-600"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 h-5 w-16 rounded bg-gray-600" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`noite-${i}`}
              className="h-10 w-20 rounded-lg bg-gray-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingTimeSelect;
