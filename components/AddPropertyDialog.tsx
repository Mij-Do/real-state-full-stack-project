"use client";

import { useState } from "react";
import { addProperty } from "@/app/actions/properties";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    InputGroup,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { formSchema, PropertyFormValues } from "@/schema";
import { Checkbox } from "./ui/checkbox";
import SelectPropertyType from "./SelectPropertyType";
import ImageUpload from "./ImageUpload";

// دالة لمعالجة الأرقام العربية وتحويلها إلى إنجليزية
const parseNumber = (val: string) => {
    const englishNumbers = val.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
    const num = Number(englishNumbers);
    return isNaN(num) ? 0 : num;
};

export default function AddPropertyDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "",
            price: 0,
            isNegotiable: false,
            ownerName: "",
            ownerNumber: "",
            images: [],   
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    const onSubmit = async (data: PropertyFormValues) => {
        try {
            await addProperty({
                title: data.title,
                description: data.description,
                type: data.type,
                price: Number(data.price),
                isNegotiable: data.isNegotiable,
                ownerName: data.ownerName,
                ownerNumber: data.ownerNumber,
                images: data.images
            });
            
            form.reset();
            setOpen(false); // إغلاق النافذة بعد الإضافة بنجاح
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={
                <Button>
                    <Plus />
                    إضافة عقار
                </Button>
            } />
            
            <DialogContent className="sm:max-w-sm max-h-[90vh] overflow-y-auto">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        {/* Title */}
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="title">العنوان</FieldLabel>
                                    <Input
                                        {...field}
                                        id="title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="مثال: شقة للبيع في المعادي"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Description */}
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="description">الوصف</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="description"
                                            placeholder="أدخل تفاصيل العقار بدقة..."
                                            rows={4}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Type & Price */}
                        <div className="grid grid-cols-2 gap-2">
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="type">النوع</FieldLabel>
                                        <SelectPropertyType field={field}/>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="price"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="price">السعر</FieldLabel>
                                        <Input
                                            {...field}
                                            id="price"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="السعر"
                                            autoComplete="off"
                                            type="text"
                                            inputMode="numeric"
                                            onChange={(e) => field.onChange(parseNumber(e.target.value))}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Owner Info */}
                        <div className="grid grid-cols-2 gap-2">
                            <Controller
                                name="ownerName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="ownerName">اسم المعلن</FieldLabel>
                                        <Input
                                            {...field}
                                            id="ownerName"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="الاسم"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="ownerNumber"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="ownerNumber">رقم الهاتف</FieldLabel>
                                        <Input
                                            {...field}
                                            id="ownerNumber"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="01xxx"
                                            type="tel"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Cloudinary Images Upload  */}
                        <Controller
                            name="images"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>صور العقار</FieldLabel>
                                    <ImageUpload
                                        value={field.value || []}
                                        onChange={(newUrls) => field.onChange(newUrls)}
                                        onRemove={(urlToRemove) =>
                                            field.onChange((field.value || []).filter((url) => url !== urlToRemove))
                                        }
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Is Negotiable */}
                        <Controller
                            name="isNegotiable"
                            control={form.control}
                            render={({ field: {onChange, value}, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} orientation={"horizontal"} className="flex items-center gap-2 pt-2">
                                    <Checkbox checked={value} onCheckedChange={onChange} id="isNegotiable" />
                                    <FieldLabel htmlFor="isNegotiable" className="cursor-pointer">قابل للتفاوض</FieldLabel>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    
                    <DialogFooter className="flex flex-row justify-end gap-2 pt-4">
                        <Button type="button" variant="secondary" onClick={() => form.reset()} disabled={isSubmitting}>
                            إعادة ضبط
                        </Button>
                        <DialogClose render={
                            <Button variant="destructive" type="button" disabled={isSubmitting}> 
                                إلغاء 
                            </Button>
                        } />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin ml-1" />
                                    جاري الإضافة...
                                </>
                            ) : (
                                "إضافة"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}