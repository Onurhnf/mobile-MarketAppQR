import { Text } from "native-base";

export default function HistoryDetailScreen({ route }: any) {
  const { totalCost, products } = route.params;
  return (
    <>
      <Text>{totalCost}</Text>
    </>
  );
}
