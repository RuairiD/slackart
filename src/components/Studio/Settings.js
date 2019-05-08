import React from 'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

type Props = {
    rightPad: boolean,
    showPixelGrid: boolean,
    toggleRightPad: () => void,
    toggleShowPixelGrid: () => void,
};

class Settings extends React.Component<Props> {
    render() {
        return (
            <Container>
                <Row style={{ paddingLeft: '1em' }}>
                    <Form.Check type="checkbox" label="Right pad :empty: emojis." checked={this.props.rightPad} onChange={this.props.toggleRightPad} />
                </Row>
                <Row style={{ paddingLeft: '1em' }}>
                    <Form.Check type="checkbox" label="Show pixel grid" checked={this.props.showPixelGrid} onChange={this.props.toggleShowPixelGrid} />
                </Row>
            </Container>
        );
    }
}

export default Settings;
