import React from 'react';
import ReactDOM from 'react-dom';
import { CommonType } from '@monorepo/common';

const someTest: CommonType = {
    a: 2,
    b: 4
};

ReactDOM.render(
    <React.StrictMode>
        <h1>Testing {someTest.a}</h1>
    </React.StrictMode>,
    document.getElementById('root')
);
