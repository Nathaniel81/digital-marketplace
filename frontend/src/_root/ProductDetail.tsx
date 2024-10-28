import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ImageSlider from '@/components/product/ImageSlider'
import ProductReel from '@/components/product/ProductReel'
import { MaxWidthWrapper } from '@/components'
import { PRODUCT_CATEGORIES } from '@/config'
import { formatPrice } from '@/lib/utils'
import { Check, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/hooks/use-cart'
import { useGetProductDetail } from '@/lib/react-query/queries'

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, isError } = useGetProductDetail(id ?? "")
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsSuccess(false), 2000)
    return () => clearTimeout(timeout)
  }, [isSuccess])

  if (isLoading) return <p>Loading...</p>
  if (isError || !product) return <p>Product not found</p>

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
  const validUrls = product?.images
    .map((image: { image_url: string } | string) => (typeof image === 'string' ? image : image.image_url))
    .filter(Boolean) as string[]

  return (
    <MaxWidthWrapper className=''>
      <div className=''>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className='flex items-center text-sm'>
                    <Link
                      to={breadcrumb.href}
                      className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 && (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl'>
                {product?.name}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-300'>
                  {formatPrice(product?.price)}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {label}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product?.description}
                </p>
              </div>

              <div className='mt-6 flex items-center'>
                <Check
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-green-500'
                />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          {/* Add to cart */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <Button
              onClick={() => {
                if (product) {
                  addItem(product)
                  setIsSuccess(true)
                }
              }}
              size='lg'
              className='w-full'>
              {isSuccess ? 'Added!' : 'Add to cart'}
            </Button>
            <div className='mt-6 text-center'>
              <div className='group inline-flex text-sm text-medium'>
                <Shield
                  aria-hidden='true'
                  className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                />
                <span className='text-muted-foreground hover:text-gray-700'>
                  30 Day Return Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href='/products'
        title={`Similar ${label}`}
        subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
      />
    </MaxWidthWrapper>
  )
}

export default ProductDetail
