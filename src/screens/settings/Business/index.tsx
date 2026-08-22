import { Input, Text } from "@/components";
import { useTranslation } from "@/core/language";

import { useBusinessStore } from "./store";
import { styles } from "./styles";
import { translations } from "./translations";

const BusinessSettings = (): React.JSX.Element => {
  const businessInfo = useBusinessStore((state) => state.info);
  const setBusinessInfo = useBusinessStore((state) => state.setBusinessInfo);
  const t = useTranslation(translations);

  const setBussinessName = (name: string): void => {
    setBusinessInfo({ name });
  };

  const setBusinessTaxId = (taxId: string): void => {
    setBusinessInfo({ taxId });
  };

  const setBusinessAddress = (address: string): void => {
    setBusinessInfo({ address });
  };

  const setBusinessPhone = (phone: string): void => {
    setBusinessInfo({ phone });
  };

  return (
    <>
      <Text style={styles.title} type={"subtitle"}>
        {t.title}
      </Text>

      <Input label={t.name} onChange={setBussinessName} value={businessInfo.name} />
      <Input
        label={t.taxId}
        onChange={setBusinessTaxId}
        placeholder={t.taxIdEx}
        value={businessInfo.taxId}
      />
      <Input label={t.address} onChange={setBusinessAddress} value={businessInfo.address} />
      <Input
        label={t.phone}
        onChange={setBusinessPhone}
        placeholder={t.phoneEx}
        value={businessInfo.phone}
      />
    </>
  );
};

export * from "./store";
export { BusinessSettings };
