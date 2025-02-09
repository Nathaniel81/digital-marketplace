import ProductListing from './ProductListing';
import { useGetProducts } from '@/lib/react-query/queries';
import { Product } from '@/types';
import { Link } from 'react-router-dom';

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href } = props;

  const { data: products, isLoading, error } = useGetProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-400 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>

        {href ? (
          <Link
            to={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products?.map((product: Product, i: number) => (
              <ProductListing key={`product-${i}`} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
