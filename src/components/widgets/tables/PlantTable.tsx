import React from 'react';
import { Grid } from 'gridjs-react';
import './PlantTable.css';

const PlantTable = () => {
  return (
    <Grid
      data={[
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
      ]}
      columns={['Name', 'Type', 'Capacities', 'Country', 'PV Power', 'Irr', 'Energy Today', 'PRV']}
      search={true}
      sort={true}
      pagination={{
        limit: 10,
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
  );
}

export default PlantTable;
