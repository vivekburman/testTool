import React from "react";
import { InputTypes } from "../utils/TTEnum";
import '../scss/component/_input.scss';

interface IProps{
    type: InputTypes,
    id: string,
    label: string,
    placeholder: string,
    required: boolean,
    value: any,
    error?: string,
    isValidInput(event: React.ChangeEvent<HTMLInputElement>): string,
}
interface IState {
    value?: string | number,
    error: string
}

export class InputText extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: this.props.value,
            error: ""
        };
    }
    static getDerivedStateFromProps(props: IProps, state: IState) {
        if (props.error && state.error !== props.error) {
            return {
                value: state.value,
                error: props.error
            };
        }
        return null;
    }
    showErrorMsg = (errorMsg: string) => {
        this.setState({
            error: errorMsg
        });
    }
    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const errorMessage = this.props.isValidInput(event);
        this.setState({
            value: event.target.value,
            error: errorMessage
        });
    }
    render(): React.ReactNode {
        const { type, id, placeholder, label } = this.props;
        const { value, error } = this.state;
        return (
            <div className="tta-input-comp tti--margin-bottom-15">
                <label htmlFor={id} className="tt-input-label tta-display-block tti--margin-bottom-4">{label}</label>
                <input
                    className="tta-display-block tt-input-text tta-full-width"
                    type={type}
                    id={id} 
                    onChange={this.onChange} 
                    value={value} 
                    placeholder={placeholder}/>
                <div className="tt-input-error tti--margin-top-2">{error}</div>
            </div>
        );
    }
}