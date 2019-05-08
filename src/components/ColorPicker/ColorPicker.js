import React from 'react';

import Container from 'react-bootstrap/Container';

import ColorChoice from './ColorChoice';

type Props = {
    pallette: Array<Object>,
    onChange: (color: number) => void,
    onEmojiChange: (color: number, emoji: string) => void,
};

type State = {
    selectedColor: number,
};

class ColorPicker extends React.Component<Props, State> {
    state = {
        selectedColor: 0,
    };

    onChange = (value) => {
        this.setState({
            selectedColor: value,
        });
        this.props.onChange(value);
    };

    render() {
        return (
            <Container>
                {this.props.pallette.map(
                    (emoji, i) => (
                        <ColorChoice
                            key={i}
                            isSelected={i === this.state.selectedColor}
                            color={i}
                            emoji={emoji}
                            onClick={this.onChange}
                            onEmojiChange={this.props.onEmojiChange}
                        />
                    )
                )}
            </Container>
        );
    }
}

export default ColorPicker;
