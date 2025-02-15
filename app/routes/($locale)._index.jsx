import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import HeroSection from '../components/HeroSection';
import FeaturedCollection from '../components/FeaturedCollection';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}) {
  const data = await context.storefront.query(FEATURED_COLLECTION_QUERY);

  console.log('Resultado de la consulta:', data); // Depuración para ver si devuelve datos

  if (!data || !data.collections || data.collections.nodes.length === 0) {
    console.error('No se encontraron colecciones destacadas.');
    return {featuredCollection: null};
  }

  return {
    featuredCollection: data.collections.nodes[0],
  };
}

function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData();

  return (
    <div>
      <HeroSection />
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function RecommendedProducts({products}) {
  if (!products || !products.nodes || products.nodes.length === 0) {
    return <p>No se encontraron productos recomendados.</p>;
  }

  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response.products.nodes.map((product) => (
                <Link key={product.id} className="recommended-product" to={`/products/${product.handle}`}>
                  <Image data={product.images.nodes[0]} aspectRatio="1/1" sizes="(min-width: 45em) 20vw, 50vw" />
                  <h4>{product.title}</h4>
                  <small><Money data={product.priceRange.minVariantPrice} /></small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `
  query FeaturedCollection {
    collections(first: 5, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }

  query RecommendedProducts {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;
