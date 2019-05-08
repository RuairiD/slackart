import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type Props = {
    initialWidth: number,
    initialHeight: number,
    onResize: (width: number, height: number) => void,
    onClear: () => void,
};

type State = {
    width: number,
    height: number,
    showClearCanvasModal: boolean,
};

const MAX_WIDTH = 32;
const MAX_HEIGHT = 32;

class CanvasControls extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.initialWidth,
            height: this.props.initialHeight,
            showClearCanvasModal: false,
        }
    }

    updateWidth = (event) => {
        let width = event.target.value;
        if (width > MAX_WIDTH) {
            width = MAX_WIDTH;
        } else if (width < 1) {
            width = 1;
        }
        this.setState({
            width: width,
        });
    };

    updateHeight = (event) => {
        let height = event.target.value;
        if (height > MAX_HEIGHT) {
            height = MAX_HEIGHT;
        } else if (height < 1) {
            height = 1;
        }
        this.setState({
            height: height,
        });
    };

    onResize = () => {
        this.props.onResize(this.state.width, this.state.height);
    };

    showClearCanvasModal = () => {
        this.setState({
            showClearCanvasModal: true,
        });
    };

    onClearCanvasModalClose = () => {
        this.setState({
            showClearCanvasModal: false,
        });
    };

    onClearCanvas = () => {
        this.setState({
            showClearCanvasModal: false,
        });
        this.props.onClear();
    };

    render() {
        return (
            <React.Fragment>
                <Container style={{ padding: '0 0 1em 0' }}>
                    <Form className="canvas-controls" inline>
                        <Form.Control value={this.state.width} onChange={this.updateWidth} style={{ width: '3em' }} />
                        <span>x</span>
                        <Form.Control value={this.state.height} onChange={this.updateHeight} style={{ width: '3em' }} />
                        <Button variant="primary" onClick={this.onResize}>
                            Resize
                        </Button>
                        <Button
                            variant="danger"
                            onClick={this.showClearCanvasModal}
                        >
                            Clear Canvas
                        </Button>
                    </Form>
                </Container>
                <Modal show={this.state.showClearCanvasModal} onHide={this.onClearCanvasModalClose}>
                    <Modal.Dialog>
                        <Modal.Body>
                            <p>Are you sure you want to delete everything?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.onClearCanvas}>Yes</Button>
                            <Button variant="secondary" onClick={this.onClearCanvasModalClose}>No</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CanvasControls;
