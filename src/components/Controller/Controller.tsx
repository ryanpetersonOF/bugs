import React, { useState } from 'react';
import Portal from '../Portal/Portal';
import Blue, { BlueProps } from '../Blue';
import { useSelector } from 'react-redux';
import { renderComponentInWindow } from '../../utils/renderComponentInWindow';
import WindowController from '../WindowController/WindowController';
import getEmoji from '../../utils/getEmoji';

type CustomElement = { id: string, emojis: string[] }

const Controller: React.FC = () => {
    const [count, setCount] = React.useState<number>(0);
    const incrementCount = () => setCount(prev => prev + 1);
    const decrementCount = () => setCount(prev => prev - 1);
    const stateCount = useSelector<any>(state => state.counter.count);
    const [elements, setElements] = useState<CustomElement[]>([]);
    const elementsRef = React.useRef([]);
    elementsRef.current = elements;

    const createElementConfig = (): CustomElement => ({ id: (Math.random() * 10000).toFixed(2).toString(), emojis: [] });

    const removeElement = id => {
        const idx = elementsRef.current.findIndex(e => e.id === id);

        if (idx !== -1) {
            const newState = [...elementsRef.current];
            newState.splice(idx, 1);
            setElements(newState);
        }
    }

    const createElement = () => setElements(prev => [...prev, createElementConfig()]);

    const addChildToElement = (id: string) => {
        const stateCopy = [...elements];
        const idx = stateCopy.find(e => e.id === id);

        if (idx) {
            idx.emojis.push(getEmoji());
            setElements(prev => stateCopy);
        }
    }

    const removeChildFromElement = (id: string) => {
        const stateCopy = [...elements];
        const idx = stateCopy.find(e => e.id === id);

        if (idx) {
            idx.emojis.pop();
            setElements(prev => stateCopy);
        }
    }

    const createDetachedWindow = async () => {
        const finWin = await fin.Window.create({
            url: '/template.html',
            name: Math.random().toString(),
            autoShow: false,
            defaultHeight: 300,
            defaultWidth: 200,
            defaultLeft: 50,
            defaultTop: 500
        });

        renderComponentInWindow<BlueProps>(Blue, finWin.getWebWindow().document.getElementById('root'), {
            title: "Detached Window",
            parentCount: count,
            onDecrement: decrementCount,
            onIncrement: incrementCount
        });

        finWin.show();
    }

    const createPageWindow = () => {
        fin.Window.create({
            url: `/blue.html?count=${count}`,
            name: Math.random().toString(),
            autoShow: true,
            defaultHeight: 400,
            defaultWidth: 400,
            defaultLeft: 50,
            defaultTop: 800
        });
    }

    return (
        <div>
            <h3>Parent State Count: {count}</h3>
            <h3>Store State Count: {stateCount}</h3>
            <h3>Elements: {elements.length}</h3>
            <p>
                <button onClick={() => createElement()}>Create Portal Window</button>
            </p>
            <p>
                <button onClick={() => createDetachedWindow()}>Create Detached Window</button>
            </p>
            <p>
                <button onClick={() => createPageWindow()}>Create Page Window</button>
            </p>
            <p>
                <button onClick={() => fin.Application.getCurrentSync().restart()}>Restart App</button>
            </p>
            {
                elements.map(e => (
                    <WindowController key={e.id} id={e.id} onIncrement={() => addChildToElement(e.id)} onDecrement={() => removeChildFromElement(e.id)} onClose={() => removeElement(e.id)} />
                ))
            }
            {
                elements.map((e, i) => (
                    <Portal key={e.id} id={e.id} initialBounds={{ height: 300, width: 200, x: (i * (1 + 250)), y: 100 }} onWindowClose={() => removeElement(e.id)}>
                        <Blue title="Portal Window" parentCount={count} onDecrement={decrementCount} onIncrement={incrementCount}>
                            {e.emojis.map((emoji, x) => {
                                return (<span key={x}>{emoji}</span>)
                            })}
                        </Blue>
                    </Portal>
                ))
            }
        </div>
    )
}

export default Controller;