import { HeaderBox } from "../Box/HeaderBox";
import { Icon, IconButton, Spacer } from "@chakra-ui/react";
import { BsGearWideConnected } from "react-icons/bs";

export type NormalHeaderProps = {
  //
};

export const NormalHeader: React.FC<NormalHeaderProps> = ({}) => {
  return (
    <HeaderBox>
      <Spacer />
      <IconButton
        aria-label="admin menu"
        as={BsGearWideConnected}
        isRound
        size="sm"
      />
    </HeaderBox>
  );
};
