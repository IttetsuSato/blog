import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export type CenteredLayoutProps = {
  children: ReactNode;
};

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({ children }) => {
  return (
    <Flex justifyContent="center" w="full" pt="12">
      {children}
    </Flex>
  );
};
