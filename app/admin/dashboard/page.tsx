"use client";

import { useState, useEffect } from "react";
import { Check, X, Handshake, Building2, Phone, MapPin } from "lucide-react";
import { 
  getPropertiesByStatus, 
  approveProperty, 
  declineProperty, 
  markAsSold 
} from "@/app/actions/properties";

interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  isNegotiable: boolean;
  ownerName: string;
  ownerPhone: string;
  images: string[];
  status: "PENDING" | "APPROVED" | "DECLINED" | "SOLD";
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeTab, setActiveTab] = useState<"PENDING" | "APPROVED" | "SOLD">("PENDING");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProperties = async () => {
    setIsLoading(true);
    const data = await getPropertiesByStatus(activeTab);
    setProperties(data as Property[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, [activeTab]);

  const handleApprove = async (id: string) => {
    const res = await approveProperty(id);
    if (res.success) fetchProperties();
  };

  const handleDecline = async (id: string) => {
    const res = await declineProperty(id);
    if (res.success) fetchProperties();
  };

  const handleMarkAsSold = async (id: string) => {
    const res = await markAsSold(id);
    if (res.success) fetchProperties();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 dir-rtl" dir="rtl">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl font-cairo">لوحة تحكم الإدارة</h1>
          <p className="text-sm text-muted-foreground mt-1">إدارة طلبات وإعلانات العقارات</p>
        </div>
        <div className="flex items-center gap-2 self-start bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm">
          <Building2 className="w-4 h-4" />
          <span>القسم الحالي: {properties.length}</span>
        </div>
      </div>

      <div className="flex border-b gap-2 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`flex items-center gap-2 pb-3 px-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === "PENDING"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          طلبات الانتظار
        </button>

        <button
          onClick={() => setActiveTab("APPROVED")}
          className={`flex items-center gap-2 pb-3 px-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === "APPROVED"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          العقارات المعروضة
        </button>

        <button
          onClick={() => setActiveTab("SOLD")}
          className={`flex items-center gap-2 pb-3 px-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
            activeTab === "SOLD"
              ? "border-amber-600 text-amber-600"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          أرشيف المبيعات
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-500 font-medium">جاري تحميل البيانات...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-slate-200 rounded-xl p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">لا توجد عقارات في هذا القسم حالياً.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {properties.map((property) => (
              <div key={property.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex gap-3 mb-3">
                  <img src={property.images[0] || "/placeholder.png"} alt={property.title} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md mb-1 ${property.type === "villa" ? "bg-purple-100 text-purple-700" : "bg-indigo-100 text-indigo-700"}`}>
                      {property.type === "villa" ? "فيلا" : "شقة"}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{property.title}</h3>
                  </div>
                </div>

                <div className="border-t border-b border-slate-100 py-2 my-2 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">السعر:</span>
                    <span className="font-bold text-emerald-600">{property.price.toLocaleString()} ج.م</span>
                    {property.isNegotiable && <span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded mr-1">قابل للتفاوض</span>}
                  </div>
                  <div>
                    <span className="text-slate-400 block">المعلن:</span>
                    <span className="font-medium text-slate-800">{property.ownerName}</span>
                    <span className="text-[10px] text-slate-500 block">{property.ownerPhone}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  {property.status === "PENDING" && (
                    <>
                      <button onClick={() => handleApprove(property.id)} className="flex-1 flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                        <Check className="w-3.5 h-3.5" /> قبول
                      </button>
                      <button onClick={() => handleDecline(property.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                        <X className="w-3.5 h-3.5" /> رفض
                      </button>
                    </>
                  )}
                  {property.status === "APPROVED" && (
                    <button onClick={() => handleMarkAsSold(property.id)} className="w-full flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                      <Handshake className="w-3.5 h-3.5" /> تم البيع 🤝
                    </button>
                  )}
                  {property.status === "SOLD" && (
                    <span className="w-full text-center bg-amber-50 text-amber-700 text-xs py-1.5 rounded-lg font-medium">تمت البيعة وأرشفته بنجاح</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-600 text-sm font-semibold">
                  <th className="p-4">العقار</th>
                  <th className="p-4">النوع</th>
                  <th className="p-4">السعر</th>
                  <th className="p-4">المعلن</th>
                  <th className="p-4 text-left">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img src={property.images[0] || "/placeholder.png"} alt={property.title} className="w-12 h-12 object-cover rounded-lg border border-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900 max-w-70 truncate">{property.title}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-md ${property.type === "villa" ? "bg-purple-100 text-purple-700" : "bg-indigo-100 text-indigo-700"}`}>
                        {property.type === "villa" ? "فيلا" : "شقة"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-emerald-600">{property.price.toLocaleString()} ج.م</div>
                      {property.isNegotiable && <span className="text-[10px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded">قابل للتفاوض</span>}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{property.ownerName}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {property.ownerPhone}
                      </div>
                    </td>
                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        {property.status === "PENDING" && (
                          <>
                            <button onClick={() => handleApprove(property.id)} className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
                              <Check className="w-3.5 h-3.5" /> قبول
                            </button>
                            <button onClick={() => handleDecline(property.id)} className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors">
                              <X className="w-3.5 h-3.5" /> رفض
                            </button>
                          </>
                        )}
                        {property.status === "APPROVED" && (
                          <button onClick={() => handleMarkAsSold(property.id)} className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-1.5 px-4 rounded-lg transition-colors">
                            <Handshake className="w-3.5 h-3.5" /> تم البيع 🤝
                          </button>
                        )}
                        {property.status === "SOLD" && (
                          <span className="text-xs font-medium text-slate-400 bg-slate-100 py-1 px-3 rounded-lg">تمت العملية ومؤرشف</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}