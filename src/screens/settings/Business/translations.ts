import { createTranslations } from "@/core/language";

const translations = createTranslations({
  ENG: {
    address: "Address",
    name: "Business name",
    phone: "Phone",
    phoneEx: "Ex. +1 (555) 000-0000",
    taxId: "Tax ID",
    taxIdEx: "Ex. TIN 12345678",
    title: "Business",
  },
  SPA: {
    address: "Dirección",
    name: "Nombre del negocio",
    phone: "Teléfono",
    phoneEx: "Ej. +57 300 123 4567",
    taxId: "ID Fiscal (NIT / CC)",
    taxIdEx: "Ej. NIT 12345678",
    title: "Negocio",
  },
});

export { translations };
