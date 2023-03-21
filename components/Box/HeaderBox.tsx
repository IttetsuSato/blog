import { Box, BoxProps } from "@chakra-ui/react";

export type HeaderBoxProps = BoxProps;

export const HeaderBox: React.FC<HeaderBoxProps> = (props) => {
  return <Box w="full" {...props} h="16" bgColor="white" />;
};
