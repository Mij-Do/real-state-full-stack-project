import { PropertyCard } from "@/components/cardDemo";
import { getPropertiesByStatus } from "./actions/properties";

export default async function Home() {
  const units = await getPropertiesByStatus("APPROVED");
  return (
    <div>
      <h1 className="text-xl md:text-3xl mt-2 text-center"> عقارات بني سويف </h1>
      <div className="flex flex-col md:flex-row flex-wrap  items-center justify-between gap-2 p-4">
        {units.length === 0 ? (
          <p className="text-center w-full">لا توجد عقارات معروضة حالياً.</p>
        ) : (
          units.map((unit) => (
            <PropertyCard key={unit.id} property={unit} />
          ))
        )}
      </div>
    </div>
  );
}
