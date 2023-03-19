import { Box, BoxProps } from "@chakra-ui/react";

export type CardBoxProps = BoxProps;

export const CardBox: React.FC<CardBoxProps> = (props) => {
  return (
    <Box bgColor="white" w="2xl" minH="2xl" borderRadius="md" p="8" {...props} />
  );
};
