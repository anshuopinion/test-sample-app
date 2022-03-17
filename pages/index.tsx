import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import faker from "faker";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  HStack,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { IDataSets } from "../interface/IDataSets";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const labels = ["January", "February", "March", "April", "May", "June", "July"];

const Home = () => {
  const [dayInterval, setDateInterval] = useState(30);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataSets[]>([]);

  const dataSetsStored = [
    {
      label: "AAVE v2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Compound",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const updatedataSetHandler = (dataSetsStoredValue: IDataSets[]) => {
    setDatasets(
      dataSetsStoredValue.filter((set) =>
        datasets.map((data) => data.label).includes(set.label)
      )
    );

    console.log(
      dataSetsStoredValue.filter((set) =>
        datasets.map((data) => data.label).includes(set.label)
      )
    );
  };

  const dataSetHandler = (dataSet: IDataSets) => {
    if (!datasets.map((data) => data.label).includes(dataSet.label)) {
      setDatasets([...datasets, dataSet]);
    } else {
      setDatasets(
        datasets.filter((dataset) => dataset.label !== dataSet.label)
      );
    }
  };

  const changeIntervalHandler = (days: number) => {
    setDateInterval(days);
    updatedataSetHandler(dataSetsStored);
  };
  useEffect(() => {
    const result = eachDayOfInterval({
      end: new Date(),
      start: new Date(subDays(new Date(), dayInterval)),
    }).map((date) => format(date, "MMM dd"));
    setLabels(result);
  }, [setLabels, dayInterval]);

  const data = {
    labels,
    datasets: [...datasets],
  };
  return (
    <Container maxW={"container.lg"}>
      <Flex gap="4" p="4">
        {dataSetsStored.map((dataSet) => (
          <HStack key={dataSet.label}>
            <Text>{dataSet.label}</Text>
            <Switch onChange={() => dataSetHandler(dataSet)} />
          </HStack>
        ))}
      </Flex>
      <Flex></Flex>
      <Stack boxShadow="xl" borderRadius="xl" p="4">
        <Flex justify="space-between">
          <Flex></Flex>
          <Flex gap={4}>
            {[30, 60, 90].map((days) => (
              <Box
                key={days}
                onClick={() => changeIntervalHandler(days)}
              >{`${days}D`}</Box>
            ))}
          </Flex>
        </Flex>
        <Flex>
          {labels.length > 0 && (
            <Line
              options={{
                responsive: true,

                plugins: {
                  legend: {
                    display: false,
                    // onClick: () => {},
                    position: "bottom" as const,
                  },
                  title: {
                    display: false,
                    text: "Chart.js Line Chart",
                  },
                },
              }}
              data={data}
            />
          )}
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
