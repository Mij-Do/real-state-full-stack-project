import { PropertyCard } from "@/components/cardDemo";
import { getPropertiesByStatus } from "./actions/properties";

export default async function Home() {
  const units = await getPropertiesByStatus("APPROVED");

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-2 bg-zinc-50 font-sans dark:bg-black p-4">
      {units.length === 0 ? (
        <p className="text-center w-full text-muted-foreground">لا توجد عقارات معروضة حالياً.</p>
      ) : (
        units.map((unit) => (
          <PropertyCard key={unit.id} property={unit} />
        ))
      )}
    </div>
  );
}
