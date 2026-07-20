"use client";

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
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { formSchema, PropertyFormValues } from "@/schema";
import { Checkbox } from "./ui/checkbox";
import SelectPropertyType from "./SelectPropertyType";
import ImageUpload from "./ImageUpload";

export default function AddPropertyDialog() {
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
            images: [], // 👈 تم التصليح: مصفوفة فارغة تماماً
        },
    });

    const onSubmit = async (data: PropertyFormValues) => {
        await addProperty({
            title: data.title,
            description: data.description,
            type: data.type,
            price: data.price,
            isNegotiable: data.isNegotiable,
            ownerName: data.ownerName,
            ownerNumber: data.ownerNumber,
            images: data.images
        });
        console.log(data);
    }

    return (
        <Dialog>
            <DialogTrigger render={
                <Button>
                    <Plus />
                    إضافة عقار
                </Button>
            } />
            
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <DialogContent className="sm:max-w-sm">
                    <FieldGroup>
                        {/* Title */}
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Title"
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
                                    <FieldLabel htmlFor="form-rhf-demo-description">Description</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="أدخل تفاصيل العقار بدقة..."
                                            rows={6}
                                            className="min-h-24 resize-none placeholder:text-gray"
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </InputGroup>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* Type & Price */}
                        <div className="flex items-center justify-between gap-2">
                            <Controller
                                name="type"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-type">Type</FieldLabel>
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
                                        <FieldLabel htmlFor="form-rhf-demo-price">Price</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-price"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Price"
                                            autoComplete="off"
                                            type="number"
                                            onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Owner Info */}
                        <div className="flex items-center justify-between gap-2">
                            <Controller
                                name="ownerName"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-ownerName">OwnerName</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-ownerName"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="OwnerName"
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
                                        <FieldLabel htmlFor="form-rhf-demo-ownerNumber">OwnerNumber</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-ownerNumber"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="ownerNumber"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Cloudinary Images Upload */}
                        <Controller
                            name="images"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>صور العقار</FieldLabel>
                                    <ImageUpload
                                        value={field.value || []}
                                        onChange={(urlArray) => field.onChange(urlArray)}
                                        onRemove={(urlToRemove) =>
                                            field.onChange(field.value.filter((url) => url !== urlToRemove))
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
                                <Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
                                    <FieldLabel>Is Negotiable</FieldLabel>
                                    <Checkbox checked={value} onCheckedChange={onChange} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    
                    <DialogFooter>
                        <Field orientation="horizontal">
                            <DialogClose render={<Button variant={"destructive"}> Close </Button>} />
                            <Button type="submit" form="form-rhf-demo">Submit</Button>
                            <Button type="button" variant="secondary" onClick={() => form.reset()}>Reset</Button>
                        </Field>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}