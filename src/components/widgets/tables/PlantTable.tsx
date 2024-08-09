import React, { useEffect, useRef, useState } from 'react';
import { Grid } from 'gridjs-react';
import { _ } from "gridjs-react";
import './PlantTable.css';
import { MdFullscreen } from "react-icons/md";
import { Icon } from '@chakra-ui/react';


interface PlantTableProps {
  paginationLimitProps : number
}

const data = [
  ['Plant Name', 'PV', '900', 'Vienna', '2,675.7', '259.10', 'Col Name', '3478'],
  ['Plant Name', 'Wind', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV-BESS', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV-DG', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV-DG', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'Wind', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV-BESS', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'Wind', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678'],
  ['Plant Name', 'PV', '259.10', 'Berlin', '2,675.7', '259.10', 'Col Name', '5678']
]

const PlantTable : React.FC<PlantTableProps> = ({paginationLimitProps}) => {
  const tableRef = useRef(null);
  const [paginationLimit, setPaginationLimit] = useState<number>(paginationLimitProps)
  
  const handleFullScreen = () => {
    if (tableRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        (tableRef.current as HTMLElement)?.requestFullscreen();
        setPaginationLimit(20); // Increase pagination limit in fullscreen mode
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setPaginationLimit(paginationLimitProps);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [paginationLimitProps]);
  return (
    <div ref={tableRef} className="plant-table-container">
      <Grid
      columns={['Name', 'Type', 'Capacities', 'Country', 'PV Power', 'Irr', 'Energy Today', 'PRV']}
      data={data.map((value, index) => [...value])}
      search={true}
        sort={true}
        pagination={{
          limit: paginationLimit,
          summary: false,
        }}
        autoWidth = {false} 
        className={{
          table: 'plant-table',
          thead: 'gridjs-thead',
          th: 'gridjs-th',
          tr: 'gridjs-tr',
          td: 'gridjs-td',
          pagination: 'gridjs-pagination',
          error: 'gridjs-error'
        }}
      />
      <Icon 
        as={MdFullscreen}
        boxSize={5} 
        float={"right"} 
        pos={"relative"} 
        bottom={"32px"} 
        onClick={handleFullScreen}
        _fullScreen={{
          bottom : "35px"
        }}
        cursor={"pointer"}
        />
    </div>
  );
}

export default PlantTable;
