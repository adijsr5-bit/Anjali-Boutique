import SectionHeader from '../../components/SectionHeader';
import CollectionCard from '../../components/CollectionCard';
import { getContentData } from '../../lib/data';

export const metadata = {
  title: 'Collections | Anjali Boutique',
  description: 'Discover the premium Anjali Boutique collections including designer sarees, casual wear, party wear, plus-size fashion, and accessories.'
};

export default async function CollectionsPage() {
  const content = await getContentData();

  return (
    <section className="bg-[#fff7f7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Collections" description="Explore curated boutique categories for every occasion." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.collections.map((item) => (
            <CollectionCard key={item.id} title={item.title} description={item.description} image={item.image} alt={item.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
