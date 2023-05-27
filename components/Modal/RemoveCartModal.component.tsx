import { Center, AlertDialog, Button } from "native-base";
import React from "react";

export default function RemoveCartModal({
  setRemoveCart,
  setIsRemoveModalOpen,
  isRemoveModalOpen,
}: any) {
  const onClose = () => setIsRemoveModalOpen(false);
  const buttonPressed = () => {
    setRemoveCart(true);
    onClose();
  };

  const cancelRef = React.useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isRemoveModalOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Remove Cart</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to your Cart. This action cannot
            be reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={buttonPressed}>
                Remove
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
}
