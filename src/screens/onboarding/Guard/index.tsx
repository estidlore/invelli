import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";

import { useBusinessStore } from "@/screens/settings/Business";

const OnboardingGuard = (): React.ReactNode => {
  const businessName = useBusinessStore((state) => state.info.name);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hasBusinessName = businessName.trim().length > 0;

    if (pathname === "/onboarding") {
      if (hasBusinessName) {
        router.replace("/");
      }
    } else if (!hasBusinessName) {
      router.replace("/onboarding");
    }
  }, [businessName, pathname, router]);

  return null;
};

export { OnboardingGuard };
