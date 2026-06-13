import { Redirect } from "expo-router";

const Index = (): React.JSX.Element => {
  return <Redirect href={"/(tabs)/inventory"} />;
};

export default Index;
