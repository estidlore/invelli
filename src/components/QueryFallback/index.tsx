import { View } from "react-native";

import { Spinner } from "@/components/Spinner";
import { Text } from "@/components/Text";
import { commonStyles } from "@/core/theme";
import { logError } from "@/utils";

import type { QueryFallbackProps } from "./types";

const QueryFallback = ({ error, errorMsg, isPending }: QueryFallbackProps): React.ReactNode => {
  if (error) {
    logError(error.message);

    return (
      <View style={commonStyles.center}>
        <Text color={"textError"} style={commonStyles.textCenter}>
          {errorMsg}
        </Text>
      </View>
    );
  }

  if (isPending) {
    return <Spinner />;
  }

  return null;
};

export { QueryFallback };
