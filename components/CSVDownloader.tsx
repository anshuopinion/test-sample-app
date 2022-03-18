import { format } from "date-fns";
import { FC } from "react";
import { useCSVDownloader } from "react-papaparse";
interface CSVDownloaderProps {
  data: any;
}

const CSVDownloader: FC<CSVDownloaderProps> = ({ data, children }) => {
  const { CSVDownloader, Type } = useCSVDownloader();

  return (
    <CSVDownloader
      type={Type.Button}
      filename={format(new Date(), "yyyy-MM-dd")}
      bom={true}
      config={{
        delimiter: ";",
      }}
      data={data}
    >
      {children}
    </CSVDownloader>
  );
};
export default CSVDownloader;
