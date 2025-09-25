import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
interface InspectionSectionProps {
  control: any; // dari react-hook-form
  title: string;
  description?: string;
  fields: FormFieldData[];
}

// Definisikan tipe untuk field
type FormFieldData = {
  name: string;
  label: string;
  type: "select" | "checkbox" | string; // Bisa diperluas jika ada tipe lain
};

export function InspectionSection({
  control,
  title,
  description,
  fields,
}: InspectionSectionProps) {
  const checkboxFields = fields.filter((f) => f.type === "checkbox");
  const selectFields = fields.filter((f) => f.type === "select");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Render semua field tipe 'select' dalam grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectFields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              render={({ field: renderField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <ConditionSelect field={renderField} />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Render semua field tipe 'checkbox' di bawahnya */}
        {checkboxFields.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {checkboxFields.map((field) => (
              <FormField
                key={field.name}
                control={control}
                name={field.name}
                render={({ field: renderField }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={renderField.value}
                        onCheckedChange={renderField.onChange}
                      />
                    </FormControl>
                    <FormLabel>{field.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const ConditionSelect = ({
  field,
  placeholder,
}: {
  field: any;
  placeholder?: string;
}) => (
  <Select onValueChange={field.onChange} defaultValue={field.value}>
    <FormControl className="w-full">
      <SelectTrigger>
        <SelectValue placeholder={placeholder || "Pilih Kondisi"} />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectItem value="good">Good / Baik</SelectItem>
      <SelectItem value="repaired">Bad / Repaired required</SelectItem>
      <SelectItem value="bad">Bad / Rusak</SelectItem>
      <SelectItem value="na">N/A (Tidak Tersedia)</SelectItem>
    </SelectContent>
  </Select>
);
