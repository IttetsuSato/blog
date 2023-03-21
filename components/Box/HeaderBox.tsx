import { Box, BoxProps, Container, Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export type HeaderBoxProps = BoxProps;

export const HeaderBox: React.FC<HeaderBoxProps> = (props) => {
  return (
    <Box
      w="full"
      {...props}
      h="16"
      bgColor="white"
      px="8"
      display="flex"
      alignItems="center"
    />
  );
};
