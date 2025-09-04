import { getProductSlugs, getProductBySlug } from '@/lib/products';
import Catalog from '@/components/Catalog';

export default function Home() {
  const productSlugs = getProductSlugs();
  const products = productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Explore Nossos Produtos
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Qualidade e inovação em áudio profissional para todas as suas necessidades.
        </p>
      </div>
      <div className="max-w-6xl mx-auto pb-24 px-6">
        <Catalog products={products} />
      </div>
    </div>
  );
}
