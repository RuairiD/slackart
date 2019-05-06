import React from 'react';

import CanvasPixel from './CanvasPixel';

type Props = {
    width: number,
    height: number
};

type State = {
    selectedColor: string,
};

class Canvas extends React.Component<Props, State> {
    state = {
        selectedColor: '#00FF00',
    }

    render() {
        return (
            <div>
                <CanvasPixel x={1} y={1} selectedColor={this.state.selectedColor} onClick={(x, y) => { console.log(x, y); }} />
                <CanvasPixel x={1} y={2} selectedColor={this.state.selectedColor} onClick={(x, y) => { console.log(x, y); }} />
            </div>
        );
    }
}

export default Canvas;
