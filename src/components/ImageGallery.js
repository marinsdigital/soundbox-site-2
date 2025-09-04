'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function ImageGallery({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Imagem Principal */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${title} - Imagem ${index + 1}`}
            fill
            className={`object-contain transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      {/* Controles (Setas e Thumbnails) - apenas se houver mais de 1 imagem */}
      {images.length > 1 && (
        <>
          {/* Setas de Navegação */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/60 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white transition z-10"
            aria-label="Imagem anterior"
          >
            <IconChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/60 backdrop-blur-sm rounded-full p-2 text-gray-800 hover:bg-white transition z-10"
            aria-label="Próxima imagem"
          >
            <IconChevronRight size={24} />
          </button>

          {/* Thumbnails */}
          <div className="mt-4 flex justify-center space-x-3">
            {images.map((src, index) => (
              <button
                key={src}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-md border-2 overflow-hidden transition ${
                  index === currentIndex ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
