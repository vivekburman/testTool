import React from "react";
import { InputTypes, ModalSize } from "../utils/TTEnum";
import { InputText } from "./Input";
import ModalComp from "./ModalComp";


export default class ServerConnection extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }
    getModalBody = () => {
        return (
            <div>
                <InputText type={InputTypes.TEXT} id="serverHost" placeholder="0.0.0.0"/>
                <InputText type={InputTypes.NUMBER} id="serverPort" placeholder="8888"/>
            </div>
        )
    }
    render(): React.ReactNode {
        return (
            <div className="tta-server-connection-comp tta-full-width tta-full-height">
                <ModalComp 
                    size={ModalSize.MD}
                    title="Server Connection"
                    bodyComponent={this.getModalBody()}/>
            </div>
        );
    }
}