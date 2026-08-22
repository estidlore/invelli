import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BusinessInfo {
  address: string;
  name: string;
  phone: string;
  taxId: string;
}

interface BusinessState {
  info: BusinessInfo;
  setBusinessInfo: (info: Partial<BusinessInfo>) => void;
}

const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      info: {
        address: "",
        name: "",
        phone: "",
        taxId: "",
      },
      setBusinessInfo: (newInfo): void => {
        set((state) => ({
          info: { ...state.info, ...newInfo },
        }));
      },
    }),
    {
      name: "store:business",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export type { BusinessInfo };
export { useBusinessStore };
