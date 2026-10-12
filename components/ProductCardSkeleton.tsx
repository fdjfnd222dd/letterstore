export default function ProductCardSkeleton() {
  return (
    <div className="block">
      {/* Image container — matches ProductCard 3:4 aspect ratio */}
      <div className="relative overflow-hidden aspect-[3/4] bg-fti-gray border border-fti-border animate-pulse" />

      {/* Info skeleton */}
      <div className="mt-4 space-y-2.5 px-0.5">
        <div className="h-2.5 bg-fti-gray rounded-sm w-3/4 animate-pulse" />
        <div className="h-5 bg-fti-gray rounded-sm w-1/3 animate-pulse" style={{ animationDelay: "75ms" }} />
      </div>
    </div>
  );
}
