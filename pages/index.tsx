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
import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react";
import { eachDayOfInterval, format, subDays } from "date-fns";
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

  // get last 30 days

  useEffect(() => {
    const result = eachDayOfInterval({
      end: new Date(),
      start: new Date(subDays(new Date(), dayInterval)),
    }).map((date) => format(date, "MMM dd"));
    setLabels(result);
  }, [setLabels, dayInterval]);

  console.log(
    labels,
    labels.map(() => faker.datatype.number({ min: 0, max: 50 }))
  );

  const data = {
    labels,
    datasets: [
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
    ],
  };

  return (
    <Container maxW={"container.lg"}>
      <Stack boxShadow="xl" borderRadius="xl" p="4">
        <Flex justify="space-between">
          <Flex></Flex>
          <Flex gap={4}>
            {[30, 60, 90].map((days) => (
              <Box
                key={days}
                onClick={() => setDateInterval(days)}
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
