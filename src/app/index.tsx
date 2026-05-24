import { View } from "react-native";

import { Text } from "@/components/Text";

const Index = (): React.JSX.Element => {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text>{"Edit app/index.tsx to edit this screen."}</Text>
    </View>
  );
};

export default Index;
