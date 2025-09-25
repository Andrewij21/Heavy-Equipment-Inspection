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
import { Input } from "../ui/input";
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
  const resultFields = fields.filter((f) => f.type === "result");
  const qtyFields = fields.filter((f) => f.type === "qty");
  const tempFields = fields.filter((f) => f.type === "temp");

  return (
    <Card className={`${title === "" ? "gap-0" : ""}`}>
      <CardHeader className="">
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
          {resultFields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              render={({ field: renderField }) => (
                <FormItem className="">
                  <FormLabel>{field.label}</FormLabel>
                  <ResultSelect field={renderField} />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {qtyFields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              render={({ field: renderField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <QtyInput field={renderField} />
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {tempFields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name}
              render={({ field: renderField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <TempInput field={renderField} />
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

const ResultSelect = ({ field }: { field: any }) => (
  <Select onValueChange={field.onChange} defaultValue={field.value}>
    <FormControl>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Hasil" />
      </SelectTrigger>
    </FormControl>
    <SelectContent>
      <SelectItem value="ok">OK</SelectItem>
      <SelectItem value="failure">Failure</SelectItem>
    </SelectContent>
  </Select>
);

const QtyInput = ({ field }: { field: any }) => (
  <Input
    type="number"
    placeholder="Qty"
    className="w-full"
    {...field}
    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
  />
);

const TempInput = ({ field }: { field: any }) => (
  <div className="flex items-center gap-2">
    <Input
      type="number"
      placeholder="°C"
      className="flex-grow"
      {...field}
      onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
    />
  </div>
);
