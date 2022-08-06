import React from "react";
import { InputTypes } from "../utils/TTEnum";

interface IProps{
    type: InputTypes,
    id: string,
    placeholder: string
}
interface IState {
    value?: string | number,
    error: string
}

export class InputText extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: "",
            error: ""
        }
    }
    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: event.target.value
        });
    }
    render(): React.ReactNode {
        const { type, id, placeholder } = this.props;
        const { value, error } = this.state;
        return (
            <div className="tta-input-comp tt-input-text">
                <label htmlFor={id}></label>
                <input 
                    type={type} 
                    id={id} 
                    onChange={this.onChange} 
                    value={value} 
                    placeholder={placeholder}/>
                <div className="tta-input-error">{error}</div>
            </div>
        );
    }
}