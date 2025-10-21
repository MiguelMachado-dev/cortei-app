const LoadingSidebar = () => {
  return (
    <div className="flex h-full max-h-full w-full max-w-sm flex-col rounded-lg bg-gray-700 p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-5 w-1/2 rounded bg-gray-500"></div>
        <div className="h-3 w-3/4 rounded bg-gray-600"></div>

        <div className="space-y-4">
          <div className="h-4 w-16 rounded bg-gray-600"></div>
          <div className="h-10 w-full rounded bg-gray-500"></div>
        </div>

        <div className="space-y-4">
          <div className="h-4 w-20 rounded bg-gray-600"></div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
            <div className="h-8 rounded bg-gray-500"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-4 w-16 rounded bg-gray-600"></div>
          <div className="h-10 w-full rounded bg-gray-500"></div>
        </div>
      </div>
      <div className="mt-auto h-10 w-full animate-pulse rounded bg-yellow-700"></div>
    </div>
  );
};

export default LoadingSidebar;
