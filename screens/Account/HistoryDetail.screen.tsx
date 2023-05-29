import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";

export default function HistoryDetailScreen({ route }: any) {
  const { totalCost, products, marketName } = route.params;

  return Array.isArray(products) && products.length > 0 ? (
    <Center h="full">
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "cyan.600",
        }}
        flex="1"
        maxW="400px"
        minW={"300px"}
        w="100%"
      >
        <HStack justifyContent="space-between">
          <Heading color="white" p="4" pb="3" size="lg">
            {marketName}
          </Heading>
          {totalCost ? (
            <Heading color="green.200" p="4" pb="3" size="md">
              Total: <Text fontSize="2xl">${totalCost.toLocaleString()}</Text>
            </Heading>
          ) : (
            <></>
          )}
        </HStack>

        <Box bg="white" flex="1">
          {products.map((item, index) => (
            <Box key={index}>
              <Pressable
                _dark={{
                  bg: "coolGray.800",
                }}
                _light={{
                  bg: "white",
                }}
              >
                <Box pl="4" pr="5" py="2">
                  <HStack alignItems="center" space={3}>
                    <Avatar size="48px" />
                    <VStack>
                      <Text
                        color="coolGray.800"
                        _dark={{
                          color: "warmGray.50",
                        }}
                        bold
                      >
                        {item.productName}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        Qty: {item.quantity}
                      </Text>
                    </VStack>
                    <Spacer />
                    <VStack flex={1} space="1">
                      {item.quantity <= 1 && (
                        <Text
                          fontSize="sm"
                          color="coolGray.800"
                          _dark={{
                            color: "warmGray.50",
                          }}
                          alignSelf="flex-start"
                        >
                          ${item.price}
                        </Text>
                      )}
                      {item.quantity > 1 && (
                        <Text
                          fontSize="sm"
                          bold
                          color="coolGray.800"
                          _dark={{
                            color: "warmGray.50",
                          }}
                          alignSelf="flex-start"
                        >
                          Sum: ${item.price * item.quantity}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            </Box>
          ))}
        </Box>
      </Box>
    </Center>
  ) : (
    <></>
  );
}
