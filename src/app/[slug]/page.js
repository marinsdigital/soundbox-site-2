import { getProductSlugs, getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery"; // Importa o novo componente

// --- Componente para a Seção de Detalhes da Variação ---
function ProductVariant({ variant, index }) {
  const isEven = index % 2 === 0;
  const textOrder = isEven ? "md:order-1" : "md:order-2";
  const imageOrder = isEven ? "md:order-2" : "md:order-1";

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 items-start gap-x-12 gap-y-8">
        {/* Coluna de Texto */}
        <div className={`space-y-10 ${textOrder}`}>
          <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
            {variant.title}
          </h2>
          
          <div>
            <h3 className="text-sm font-bold bg-gray-800 text-white py-2 px-4 inline-block tracking-widest">
              DIMENSÕES
            </h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              {variant.dimensions.map((d) => (
                <li key={d.label} className="flex justify-between border-b border-gray-200 pb-2 text-sm">
                  <span>{d.label}</span>
                  <span className="font-medium text-gray-900">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold bg-gray-800 text-white py-2 px-4 inline-block tracking-widest">
              ESPECIFICAÇÕES
            </h3>
            <ul className="mt-4 space-y-3 text-gray-600">
              {variant.specs.map((s) => (
                <li key={s.label} className="flex justify-between border-b border-gray-200 pb-2 text-sm">
                  <span className="w-1/2">{s.label}</span>
                  <span className="font-medium text-gray-900 text-right w-1/2">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna da Galeria de Imagens */}
        <div className={imageOrder}>
          <ImageGallery images={variant.images} title={variant.title} />
        </div>
      </div>
    </div>
  );
}

// --- Página Principal do Produto ---
export async function generateStaticParams() {
  const slugs = getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Product({ params }) {
  const { slug } = params;
  const product = getProductBySlug(slug);
  
  if (!product || !product.variants) return notFound();

  return (
    <main>
      <section
        className="relative w-full h-[50vh] min-h-[400px] max-h-[550px] bg-gray-800 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.bannerBg})` }}
      >
        <div className="absolute inset-0" />
        <div className="relative z-10 h-full flex items-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex justify-between items-center">
                <div className="max-w-md">
                    <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight"
                        style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                        {product.title.toUpperCase()}
                    </h1>
                </div>
                <div className="hidden md:block max-h-[450px] max-w-[450px]"
                >
                    <Image
                        src={product.bannerCover}
                        alt={product.title}
                        width={450}
                        height={450}
                        priority
                        className="object-contain transform max-h-[450px] max-w-[450px]"
                    />
                </div>
            </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {product.variants.map((variant, index) => (
            <ProductVariant key={variant.title} variant={variant} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
