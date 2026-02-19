import type { ReactNode } from "react";
import { HeroVideo } from "@/components/hero-video";
import { NewArrivals } from "@/components/new-arrivals";
import { Catalog } from "@/components/catalog";
import { ContactBlockUnusual } from "@/components/contact";
import { products } from "@/data/products";

function Home(): ReactNode {
  return (
    <main className="flex flex-1 flex-col">
      <HeroVideo videoSrc="/IMG_0740.MP4" title="dariy" subtitle="одежда для всех" />
      <NewArrivals products={products} />
      <Catalog />
      <section
        id="contacts"
        className="flex min-h-[calc(100dvh-4.5rem)] flex-col border-t border-border bg-neutral-900 scroll-mt-[4.5rem]"
      >
        <ContactBlockUnusual />
      </section>
    </main>
  );
}

export default Home;
