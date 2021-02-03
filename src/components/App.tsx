import React from 'react';
import Styles from './App.module.scss';
import Menu from './Menu/Menu';

const App: React.FC = (props) => {
    return (
        <div className={Styles.container}>heyo
            <Menu />
        </div>
    )
};

export default App;