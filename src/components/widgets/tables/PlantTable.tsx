import React, { useRef, useState } from 'react';
import { Grid } from 'gridjs-react';
import { _ } from "gridjs-react";
import './PlantTable.css';
import { MdFullscreen } from "react-icons/md";
import { Icon } from '@chakra-ui/react';

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

const PlantTable = () => {
  const tableRef = useRef(null);
  const [paginationLimit, setPaginationLimit] = useState<number>(10)
  
  const handleFullScreen = () => {
    if (tableRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setPaginationLimit(10);
      } else {
        (tableRef.current as HTMLElement)?.requestFullscreen();
        setPaginationLimit(20);
      }
    }
  };

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
        autoWidth = {true} 
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
