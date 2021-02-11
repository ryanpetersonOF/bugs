import React from 'react';
import Quantitator from '../Quantitator/Quantitator';

import Styles from './WindowControl.module.scss';

type Props = {
    onIncrement: () => void;
    onDecrement: () => void;
    onClose: () => void;
    id: string;
}
const WindowController: React.FC<Props> = ({ id, onClose, onDecrement, onIncrement }) => {
    return (
        <div className={Styles.container}>
            <p>Portal Control for {id}</p>
            <Quantitator label="Add children" onIncrement={onIncrement} onDecrement={onDecrement}></Quantitator>
            <p><button onClick={onClose}>Close Window</button></p>
        </div>
    )
}

export default WindowController;