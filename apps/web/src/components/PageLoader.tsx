type PageLoaderProps = {
  title?: string;
  subtitle?: string;
};

export default function PageLoader({
  title = 'Loading...',
  subtitle = 'Preparing your page. This should only take a moment.',
}: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
      <div className="flex flex-col items-center gap-3 px-4" aria-live="polite">
        <div
          className="h-12 w-12 rounded-full border-4 border-dark-border border-t-primary-500 animate-spin"
          aria-hidden="true"
        />
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

