export default function SkeletonCard() {
    return (
        <div className="glass-card p-6 rounded-2xl animate-pulse">
            {/* Cover skeleton */}
            <div className="w-full aspect-[3/4] rounded-xl skeleton-gold mb-4"></div>

            {/* Title skeleton */}
            <div className="h-5 w-3/4 skeleton rounded mb-2"></div>

            {/* Author skeleton */}
            <div className="h-4 w-1/2 skeleton rounded"></div>
        </div>
    );
}

export function SkeletonText({ lines = 3 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="h-4 skeleton-teal rounded"
                    style={{ width: `${100 - (i * 15)}%` }}
                ></div>
            ))}
        </div>
    );
}
