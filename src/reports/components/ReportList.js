import React from 'react';

import ReportItem from './ReportItem';
import './ReportList.css';

const ReportList = props => {

  return (
    <ul className="report-list">
      {props.items.map(report => (
        <ReportItem
          key={report.id}
          id={report.id}
          image={report.image}
          title={report.title}
          street={report.street}
          cityStateZip={report.cityStateZip}
          creatorId={report.creator}
          onDelete={props.onDeleteReport}
        />
      ))}
    </ul>
  );
};

export default ReportList;
