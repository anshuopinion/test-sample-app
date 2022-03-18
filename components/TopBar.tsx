import { Flex, Heading, HStack } from "@chakra-ui/react";
import { FC } from "react";
import { GiExpand } from "react-icons/gi";
import { GrDocumentDownload } from "react-icons/gr";
import { IDataSets } from "../interface/IDataSets";
import CSVDownloader from "./CSVDownloader";

interface TopBarProps {
  downloadData: (data: { labels: string[]; datasets: IDataSets[] }) => any;
  toggleZoom: () => void;
}

const TopBar: FC<TopBarProps> = ({ downloadData, toggleZoom }) => {
  return (
    <Flex
      borderTopRadius="md"
      p="2"
      bg="gray.100"
      justify="space-between"
      border="1px solid #000"
    >
      <Heading fontSize="lg">Liquidty Coverage Ratio (LCR)</Heading>
      <HStack fontSize="2xl">
        <CSVDownloader data={downloadData}>
          <GrDocumentDownload />
        </CSVDownloader>
        <GiExpand onClick={toggleZoom} />
      </HStack>
    </Flex>
  );
};
export default TopBar;
