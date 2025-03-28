import React from 'react';

const RawDataDisplay = ({ data }) => {
    return (
        <div>
            <h2>API Response:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default RawDataDisplay;