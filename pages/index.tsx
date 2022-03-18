import React, { useEffect, useState } from "react";

import "chartjs-adapter-date-fns";
import { enIN } from "date-fns/locale";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  DateAdapter,
} from "chart.js";

import { Line } from "react-chartjs-2";
import faker from "faker";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { IDataSets } from "../interface/IDataSets";
import CSVDownloader from "../components/CSVDownloader";
import TopBar from "../components/TopBar";
import IntervalToggler from "../components/IntervalToggler";
import DataSetSwitcher from "../components/DataSetSwitcher";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Home = () => {
  const [dayInterval, setDateInterval] = useState(30);
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<IDataSets[]>([]);
  const [zoom, setZoom] = useState(false);
  const data = {
    labels,
    datasets: [...datasets],
  };
  const dataSetsStored = [
    {
      label: "AAVE v2",
      data: labels.map((value, i) => {
        return {
          x: format(new Date(value), "yyyy-MM-dd"),
          y: faker.datatype.number({ min: i, max: i + 3 }),
        };
      }),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Compound",
      data: labels.map((value, i) => {
        return {
          x: format(new Date(value), "yyyy-MM-dd"),
          y: faker.datatype.number({ min: i + 10, max: i + 13 }),
        };
      }),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  const convertDataToJsonFromObject = (data: {
    labels: string[];
    datasets: IDataSets[];
  }) => {
    const { labels, datasets } = data;

    const labelsJsonData = labels.map((value) => {
      return {
        Date: value,
      };
    });

    const datasetsJson = datasets.map((dataset) => {
      const data = dataset.data.map((value) => {
        return {
          [dataset.label]: value,
        };
      });
      return data;
    });

    const finalData = labelsJsonData.map((value) => {
      let obj = {};
      datasetsJson.forEach((dataset) => {
        obj = { ...obj, ...dataset[0] };
      });
      return { ...value, ...obj };
    });

    return finalData;
  };

  const updatedataSetHandler = (dataSetsStoredValue: IDataSets[]) => {
    setDatasets(
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
  };

  const toggleZoom = () => {
    setZoom(!zoom);
  };

  useEffect(() => {
    const result = eachDayOfInterval({
      end: new Date(),
      start: new Date(subDays(new Date(), dayInterval)),
    }).map((date) => format(date, "yyyy-MM-dd"));
    setLabels(result);
  }, [setLabels, dayInterval]);

  useEffect(() => {
    updatedataSetHandler(dataSetsStored);
    // This is be executed when `loading` state changes
  }, [labels]);

  console.log(data);

  return (
    <Container maxW={zoom ? "100%" : "container.lg"}>
      <DataSetSwitcher
        dataSetHandler={dataSetHandler}
        dataSetsStored={dataSetsStored}
      />
      <TopBar
        downloadData={() => convertDataToJsonFromObject(data)}
        toggleZoom={toggleZoom}
      />

      <Stack boxShadow="xl" borderRadius="xl" p="4">
        <IntervalToggler
          changeIntervalHandler={changeIntervalHandler}
          dayInterval={dayInterval}
        />

        <Flex>
          {labels.length > 0 && (
            <Line
              options={{
                scales: {
                  x: {
                    axis: "x",
                    type: "time",
                    time: {
                      minUnit: "day",

                      unit: "day",
                      stepSize: 7,

                      // displayFormats: {
                      //   day: "dd",
                      //   month: "MMM",
                      //   year: "yyyy",
                      // },
                    },
                    adapters: {
                      date: {
                        locale: enIN,
                      },
                    },
                  },
                },

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
              data={{
                datasets,
              }}
            />
          )}
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
