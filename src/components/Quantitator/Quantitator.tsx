import React from 'react';

type Props = {
    label: string;
    onIncrement: () => void;
    onDecrement: () => void;
}

const Quantitator: React.FC<Props> = ({ label, onIncrement, onDecrement }) => {
    return (
        <div>
            <span>{label}&nbsp;&nbsp;&nbsp;</span>
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    )
}

export default Quantitator;