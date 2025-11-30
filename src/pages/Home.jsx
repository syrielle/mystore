import { useState, useEffect } from 'react';
import HeroCarousel from '../components/ui/HeroCarousel';
import PriceBanner from '../components/ui/PriceBanner';
import BestSellers from '../components/ui/BestSellers';
import Advantages from '../components/ui/Advantages';
import LogoMarquee from '../components/ui/LogoMarquee';
import WhyLowPrices from '../components/ui/WhyLowPrices';
import RadianceSection from '../components/ui/RadianceSection';
import FeaturedProducts from '../components/ui/FeaturedProducts';
import { heroSlides } from '../data/heroSlides';
import { featuredImage } from '../data/bestSellers';
import { brandLogos, radianceMedia } from '../data/brands';
import { getAllProducts } from '../services/firebase/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les produits depuis Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromFirebase = await getAllProducts();
        // Filtrer uniquement les produits actifs pour le site public
        const activeProducts = productsFromFirebase.filter(p => p.isActive !== false);
        setProducts(activeProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Séparer les best sellers (produits avec isBestSeller: true)
  // Limiter à 8 produits maximum pour la section Best Sellers
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 8);

  // Produits pour la section "Notre Collection"
  // Stratégie: Prioriser les nouveaux produits, limiter à 8 maximum
  const featuredProducts = (() => {
    // 1. D'abord, essayer d'afficher les produits marqués "Nouveau"
    const newProducts = products.filter(p => p.isNew);

    if (newProducts.length >= 8) {
      // Si on a 8+ nouveaux produits, prendre les 8 plus récents
      return newProducts
        .sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.seconds - a.createdAt.seconds;
          }
          return 0;
        })
        .slice(0, 8);
    } else if (newProducts.length > 0) {
      // Si on a quelques nouveaux produits (moins de 8), les compléter avec d'autres
      const remainingCount = 8 - newProducts.length;
      const otherProducts = products
        .filter(p => !p.isNew)
        .sort((a, b) => {
          // Trier par date de création (les plus récents d'abord)
          if (a.createdAt && b.createdAt) {
            return b.createdAt.seconds - a.createdAt.seconds;
          }
          return 0;
        })
        .slice(0, remainingCount);

      return [...newProducts, ...otherProducts];
    } else {
      // Si aucun produit "Nouveau", afficher les 8 produits les plus récents
      return products
        .sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.seconds - a.createdAt.seconds;
          }
          return 0;
        })
        .slice(0, 8);
    }
  })();

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Section Hero avec Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Bannière Prix Attractifs */}
      <PriceBanner />

      {/* Section Best Sellers - Afficher seulement s'il y a des best sellers */}
      {!loading && bestSellers.length > 0 && (
        <BestSellers featuredImage={featuredImage} products={bestSellers} />
      )}

      {/* Section Nos Avantages */}
      <Advantages />

      {/* Logos qui défilent */}
      <LogoMarquee logos={brandLogos} />

      {/* Section Pourquoi Nos Prix Sont Si Bas */}
      <WhyLowPrices />

      {/* Section Un Éclat Incomparable */}
      <RadianceSection media={radianceMedia} isVideo={false} />

      {/* Section Collections - Produits en vedette */}
      {!loading && featuredProducts.length > 0 && (
        <FeaturedProducts products={featuredProducts} />
      )}
    </div>
  );
};

export default Home;
