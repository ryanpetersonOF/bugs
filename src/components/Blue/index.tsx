import React from 'react';
import { increment, decrement } from '../../slices/counter';
import Styles from './Style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Quantitator from '../Quantitator/Quantitator';

export type BlueProps = {
    title: string;
    onIncrement: () => void;
    onDecrement: () => void;
    parentCount: number;
}

const Blue: React.FC<BlueProps> = ({ title, parentCount, onIncrement, onDecrement, children }) => {
    const dispatch = useDispatch();
    const [localCount, setLocalCount] = React.useState(0);
    const stateCount = useSelector<any>(state => state.counter.count);

    const incrementLocalCount = () => setLocalCount(prev => prev + 1);
    const decrementLocalCount = () => setLocalCount(prev => prev - 1);

    return (
        <div className={Styles.container}>
            <h3>{title}</h3>
            <p>Local State Count: {localCount}</p>
            <p>Parent State Count: {parentCount}</p>
            <p>Store State Count: {stateCount}</p>
            <Quantitator label="Local State" onIncrement={incrementLocalCount} onDecrement={decrementLocalCount} />
            <Quantitator label="Parent State" onIncrement={onIncrement} onDecrement={onDecrement} />
            <Quantitator label="Store State" onIncrement={() => dispatch(increment())} onDecrement={() => dispatch(decrement())} />
            <div className={Styles.children}>
                {children}
            </div>
        </div>
    )
}

export default Blue;