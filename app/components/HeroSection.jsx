import {Link} from '@remix-run/react';

export default function HeroSection() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{backgroundImage: `url('https://cdn.shopify.com/s/files/1/0802/5997/3427/files/BANNER4.webp?v=1738782418')`}}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Tu Producto Estrella</h1>
        <p className="text-lg mb-8">Descubre la combinación perfecta de estilo y comodidad.</p>
        <Link to="/collections/all" className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-300 transition">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
