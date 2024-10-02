const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-purple-500">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 border-4 border-purple-300 rounded-full" />

        {/* Spinning inner ring with gradient */}
        <div className="w-24 h-24 border-4 border-t-4 border-transparent border-t-purple-600 animate-spin rounded-full absolute left-0 top-0" />

        {/* Inner glow effect */}
        <div className="w-16 h-16 bg-purple-200 rounded-full absolute left-4 top-4 shadow-lg" />

        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
