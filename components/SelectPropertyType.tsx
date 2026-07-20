import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ControllerRenderProps } from "react-hook-form"

interface IFieldProps {
    field: ControllerRenderProps<any, any>
}

const items = [
    { label: "شقة", value: "apartment" },
    { label: "فيلا", value: "villa" },
]

const SelectPropertyType = ({ field }: IFieldProps) => {
    return (
        <Select 
            value={field.value || ""} 
            onValueChange={field.onChange}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر نوع العقار" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>أنواع العقارات</SelectLabel>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                    {item.label}
                    </SelectItem>
                ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectPropertyType