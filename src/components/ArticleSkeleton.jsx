export default function ArticleSkeleton() {
    return (
        <article className="border-b border-gray-100 pb-6 animate-pulse">
            <div className="flex justify-between items-center mb-2">
                <div className="bg-gray-200 h-6 w-24 rounded-full"></div>
                <div className="bg-gray-200 h-4 w-20 rounded"></div>
            </div>
            <div className="bg-gray-200 h-8 w-3/4 rounded mb-2"></div>
            <div className="space-y-2 mb-4">
                <div className="bg-gray-200 h-4 w-full rounded"></div>
                <div className="bg-gray-200 h-4 w-full rounded"></div>
                <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="bg-gray-200 h-10 w-10 rounded-full mr-3"></div>
                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                </div>
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </div>
        </article>
    )
}

