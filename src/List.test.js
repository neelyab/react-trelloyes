import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import List from './List';


it('renders without crashing', ()=> {
    const store={
        id: '2',
        header: 'Second list',
        cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
    }
    const div = document.createElement('div');
    ReactDOM.render(<List cards={store}/>);

    ReactDOM.unmountComponentAtNode(div);
});