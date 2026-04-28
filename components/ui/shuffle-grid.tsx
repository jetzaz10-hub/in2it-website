"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { galleryData } from "@/constants/gallery-data";

const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const ShuffleGrid = ({ onItemClick }: { onItemClick?: (id: number) => void }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Initial shuffle
    setItems(shuffle([...galleryData]));

    const shuffleItems = () => {
      setItems(shuffle([...galleryData]));
      timeoutRef.current = setTimeout(shuffleItems, 3000);
    };

    const timeoutId = setTimeout(shuffleItems, 3000);

    return () => {
      clearTimeout(timeoutId);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1.5">
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          onClick={() => onItemClick?.(item.id)}
          className="w-full h-full rounded-lg overflow-hidden ring-1 ring-white/10 cursor-pointer hover:opacity-90 transition-opacity group"
          style={{
            backgroundImage: `url(${item.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            transform: "translateZ(0)"
          }}
        >
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      ))}
    </div>
  );
};

export { ShuffleGrid };
export default ShuffleGrid;
