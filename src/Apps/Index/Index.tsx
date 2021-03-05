import React from 'react';
import { Provider } from 'react-redux'
import Controller from '../../components/Controller/Controller';
import store from '../../store/store';
import './Index.scss';

const Index: React.FC = () => {
    return (
        <Provider store={store}>
            <div style={{ padding: '12px' }}>
                <h2>Template</h2>
                <hr />
                <Controller />
            </div>
        </Provider>
    )
}

export default Index;