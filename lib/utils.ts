import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeStatus = (
  status: string
): "PENDING" | "APPROVED" | "REJECTED" => {
  const upper = status.toUpperCase();
  if (upper === "PENDING" || upper === "APPROVED" || upper === "REJECTED") {
    return upper as "PENDING" | "APPROVED" | "REJECTED";
  }
  return "PENDING";
};
export const getStatusColor = (status: string) => {
  switch (normalizeStatus(status)) {
    case "APPROVED":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "REJECTED":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export const getEquipmentTypeLabel = (type: string) => {
  switch (type) {
    case "track":
      return "Track";
    case "wheel":
      return "Wheel";
    case "support":
      return "Support";
    default:
      return type;
  }
};

export const formatDate = (dateString: string) => {
  // Format tanggal ke format Indonesia
  return new Date(dateString).toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
