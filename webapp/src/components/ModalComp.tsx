import React from "react";
import { ModalProps, ModalSize } from "../utils/TTEnum";

interface IState {
    size: string,
    title: string,
}

export default class ModalComp extends React.Component<ModalProps, IState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            size: props.size,
            title: props.title,
        }
    }
    getSize = () => {
        return this.state.size;
    }
    setSize = (size: ModalSize) => {
        this.setState({
            size: size
        });
    }
    getTitle = () => {
        return this.state.title;
    }
    setTitle = (title: string) => {
        this.setState({
            title: title
        });
    }
    render(): React.ReactNode {
        const { size, title } = this.state;
        const { bodyComponent } = this.props;
        return (
            <div className="tta-modal-comp tta-full-width tta-full-height tta-position-fixed">
                <div className="tta-display-flex tta-full-height tt-align-center">
                    <div className={`tt-modal-body tt-width-${size}`}>
                        <div className="tta-head tta-display-flex tt-valign-center">
                            <div>{title}</div>
                        </div>
                        <div className="tt-modal-main">
                            { bodyComponent }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}