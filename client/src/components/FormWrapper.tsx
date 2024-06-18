import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

function FormWrapper({
  children,
  ...propriedades
}: { children: React.ReactNode } & BoxProps) {
  return (
    <Box w="100%" maxW="container.sm" boxShadow="xl" p="8" as="form" {...propriedades}>
      {children}
    </Box>
  );
}

export default FormWrapper;
