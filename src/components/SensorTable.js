import React from 'react';
import { formatTimestamp } from '../services/api';

const SensorTable = ({ data }) => {
    if (!data || !data.readings || data.readings.length === 0) {
        return <p>No sensor readings found</p>;
    }

    return (
        <div>
            <h2>Sensor Readings:</h2>
            <p>Total readings: {data.count}</p>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Value</th>
                        <th>Unit</th>
                        <th>Location</th>
                        <th>Sensor ID</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.readings.map((reading, index) => (
                        <tr key={index}>
                            <td>{reading.parameter_type}</td>
                            <td>{reading.value}</td>
                            <td>{reading.unit}</td>
                            <td>{reading.location}</td>
                            <td>{reading.sensor_id}</td>
                            <td>{formatTimestamp(reading.timestamp)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorTable;