import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import ProductAIFeatures from "@/components/products/ProductAIFeatures";
import ProductOrderCTA from "@/components/products/ProductOrderCTA";
import ProductHero from "@/components/products/ProductHero";
//import VideoCarousel from "@/components/products/VideoCarousel";
import { getProductBySlug, getAllProductSlugs } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} for Business | tax print & shivaami`,
    description: `${product.businessValue} Order the ${product.name} through tax print & shivaami with exclusive B2B benefits: 2-year protection, zero-touch deployment, and corporate pricing.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        {/* <VideoCarousel /> */}
        <ProductHero product={product} />
        <ProductAIFeatures features={product.aiFeatures} productName={product.name} />
        <ProductSpecsTable specs={product.specs} productName={product.name} />
        <ProductOrderCTA
          productName={product.name}
          ecosystemBenefits={product.ecosystemBenefits}
        />
      </main>
      <Footer />
    </>
  );
}
