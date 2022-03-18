import { FC } from "react";
import { useCSVDownloader } from "react-papaparse";
interface CSVDownloaderProps {
  data: any;
}

const CSVDownloader: FC<CSVDownloaderProps> = ({ data }) => {
  const { CSVDownloader, Type } = useCSVDownloader();
   

  return (
    <CSVDownloader
    
      type={Type.Button}
      filename={"filename"}
      bom={true}
      config={{
        delimiter: ";",
      }}
      data={data}
    >
      Download
    </CSVDownloader>
  );
};
export default CSVDownloader;
