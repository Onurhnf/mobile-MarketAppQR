import { Box, HStack, Pressable, VStack, Skeleton } from "native-base";
import React, { LegacyRef, RefObject } from "react";
import { View } from "react-native";

const CartItemSkeleton = React.forwardRef((props, ref: LegacyRef<View>) => {
  return (
    <Box>
      <View ref={ref}>
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
              <Skeleton
                borderWidth={1}
                borderColor="coolGray.200"
                endColor="warmGray.50"
                size="48px"
                rounded="full"
              />
              <VStack>
                <Skeleton.Text lines={2} width="100px" />
              </VStack>
              <Skeleton.Text lines={1} width="100px" />
            </HStack>
          </Box>
        </Pressable>
      </View>
    </Box>
  );
});

export default CartItemSkeleton;
