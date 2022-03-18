import { Flex, Box, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface IntervalTogglerProps {
  dayInterval: number;
  changeIntervalHandler: (days: number) => void;
}

const IntervalToggler: FC<IntervalTogglerProps> = ({
  dayInterval,
  changeIntervalHandler,
}) => {
  return (
    <Flex justify="space-between" p="4">
      <Flex gap={4}>
        <VStack spacing={0}>
          <Text fontSize="sm">AAVE v2 </Text>
          <Text fontWeight="bold" fontSize="xl">
            22.4%
          </Text>
        </VStack>
        <VStack spacing={0}>
          <Text fontSize="sm">Compound </Text>
          <Text fontWeight="bold" fontSize="xl">
            33.24%
          </Text>
        </VStack>
      </Flex>
      <Flex gap={4}>
        {[30, 60, 90].map((days) => (
          <Box
            fontWeight={dayInterval === days ? "bold" : "normal"}
            key={days}
            onClick={() => changeIntervalHandler(days)}
          >{`${days}D`}</Box>
        ))}
      </Flex>
    </Flex>
  );
};
export default IntervalToggler;
