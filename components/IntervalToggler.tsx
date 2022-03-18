import { Flex, Box } from "@chakra-ui/react";
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
    <Flex justify="space-between">
      <Flex></Flex>
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
