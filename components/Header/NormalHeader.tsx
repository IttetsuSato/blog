import { HeaderBox } from "../Box/HeaderBox";
import { IconButton, Spacer, useDisclosure } from "@chakra-ui/react";
import { BsGearWideConnected } from "react-icons/bs";
import { AdminDrawer } from "../Drawer/AdminDrawer";

export type NormalHeaderProps = {
  //
};

export const NormalHeader: React.FC<NormalHeaderProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HeaderBox>
      <Spacer />
      <IconButton
        aria-label="admin menu"
        as={BsGearWideConnected}
        isRound
        size="sm"
        onClick={onOpen}
      />
      <AdminDrawer isOpen={isOpen} onClose={onClose} />
    </HeaderBox>
  );
};
