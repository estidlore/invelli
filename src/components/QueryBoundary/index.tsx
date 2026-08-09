import { View } from "react-native";

import { Spinner } from "@/components/Spinner";
import { Text } from "@/components/Text";
import { commonStyles } from "@/core/theme";
import { logError } from "@/utils";

import type { QueryBoundaryProps } from "./types";

const QueryBoundary = ({
  children,
  error,
  errorMsg,
  isPending,
}: QueryBoundaryProps): React.ReactNode => {
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

  return children;
};

export { QueryBoundary };
