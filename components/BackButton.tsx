import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center font-medium mb-4 sm:hidden"
    >
      <ArrowLeft className="size-6" />
      Kembali
    </button>
  );
}
