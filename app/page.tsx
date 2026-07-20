import { PropertyCard } from "@/components/cardDemo";
import { getPropertiesByStatus } from "./actions/properties";

export default async function Home() {
  const units = await getPropertiesByStatus();

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-2 bg-zinc-50 font-sans dark:bg-black">
      {units.map((unit) => (
        <PropertyCard key={unit.id} property={unit} />
      ))}
    </div>
  );
}
