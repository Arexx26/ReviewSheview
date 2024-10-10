import React, { useRef } from 'react';
import Image from 'next/image';

interface MediaItem {
    id: string;
    title: string;
    rating: number;
    imageUrl: string;
}

interface ScrollableMediaSectionProps {
    title: string;
    items: MediaItem[];
}

const ScrollableMediaSection: React.FC<ScrollableMediaSectionProps> = ({ title, items }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 200; // Adjust this value as needed
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mb-8 relative">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 z-10"
                >
                    &lt;
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
                >
                    {items.map((item) => (
                        <div key={item.id} className="flex-none w-36">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={144}
                                height={208}
                                className="w-full h-52 object-cover rounded-lg shadow-lg"
                            />
                            <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
                            <p className="text-xs text-gray-500">Rating: {item.rating}</p>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 z-10"
                >
                    &gt;
                </button>
            </div>
        </section>
    );
};

export default ScrollableMediaSection;