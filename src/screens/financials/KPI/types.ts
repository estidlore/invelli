import type { NumFormat } from "@/utils";

interface KpiProps {
  format?: NumFormat;
  label: string;
  value: number;
}

export type { KpiProps };
