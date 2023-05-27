import { Center, AlertDialog, Button, HStack, Text } from "native-base";
import React from "react";

export default function PurchaseCartModal({
  setPurchaseCart,
  setIsPurchaseModalOpen,
  isPurchaseModalOpen,
  totalCost,
}: any) {
  const onClose = () => setIsPurchaseModalOpen(false);
  const buttonPressed = () => {
    setPurchaseCart(true);
    onClose();
  };

  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isPurchaseModalOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Purchase Cart</AlertDialog.Header>
          <AlertDialog.Body>
            <HStack>
              <Text>
                Total cost is <Text fontWeight={"bold"}>${totalCost}</Text> Are
                you sure your shopping is done?
              </Text>
            </HStack>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="outline"
                colorScheme="cyan"
                onPress={onClose}
                ref={cancelRef}
              >
                Not Yet
              </Button>
              <Button colorScheme="cyan" onPress={buttonPressed}>
                Purchase
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
