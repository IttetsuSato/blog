import { HStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export type CenteredLayoutProps = {
  children: ReactNode;
};

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({ children }) => {
  return (
    <HStack justifyContent="center" w="full">
      {children}
    </HStack>
  );
};
