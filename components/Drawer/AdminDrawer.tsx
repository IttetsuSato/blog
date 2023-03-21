import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

export type AdminDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>メニュー</DrawerHeader>

        <DrawerBody>ヌートバーガー</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
