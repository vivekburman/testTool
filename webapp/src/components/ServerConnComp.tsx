import React from "react";
import { ErrorMsg, InputTypes, ModalSize } from "../utils/TTEnum";
import { InputText } from "./Input";
import ModalComp from "./ModalComp";
import '../scss/customComponent/_serverConnComp.scss';
import TTUtil from "../utils/helpers";
import { pingService } from "../service/serverService";
import { setHostURL } from "../utils/httpReq";
import { DEFAULT_PORT, DEFAULT_URL } from "../config";

interface IProps {

}
interface IState {
    errorMsg: {
        host: string,
        port: string
    },
    startBtn: {
        isDisabled: boolean,
        showLoading: boolean,
    },
    serverConfig: {
        host: {
            value: string,
            id: string,
            type: InputTypes.TEXT,
            required: boolean,
        },
        port: {
            value: string | number | null,
            id: string,
            type: InputTypes.NUMBER,
            required: boolean,
        }
    }
}

export default class ServerConnection extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            errorMsg: {
                host: "",
                port: "",
            },
            startBtn: {
                isDisabled: false,
                showLoading: false,
            },
            serverConfig: {
                host: {
                    value: DEFAULT_URL,
                    id: "serverHost",
                    type: InputTypes.TEXT,
                    required: true,
                },
                port: {
                    value: DEFAULT_PORT,
                    id: "serverPort",
                    type: InputTypes.NUMBER,
                    required: true,
                }
            }
        }
    }
    connectToServer = async () => {
        const { serverConfig } = this.state;
        this.setState({
            startBtn: {
                isDisabled: true,
                showLoading: true,
            }
        });
        try {
            const response = await pingService(serverConfig.host.value, Number.parseInt(`${serverConfig.port.value}`));
            if (response) {
                // ok
                setHostURL(`${serverConfig.host.value}${serverConfig.port.value}`);
            } else {
                // not ok
            }
        }catch(e) {

        }finally {
            this.setState({
                startBtn: {
                    isDisabled: false,
                    showLoading: false,
                }
            });
        }
    }
    onFormSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
        const { serverConfig } = this.state;
        const isHostEmpty = TTUtil.isNullOrEmpty(serverConfig.host.value);
        const isPortEmpty = TTUtil.isNullOrEmpty(serverConfig.port.value);
        if (isHostEmpty || isPortEmpty) {
            this.showInputError(isHostEmpty, isPortEmpty);
            return false;
        }
        this.connectToServer();
    }
    onDownloadRequest = () => {
        console.log("downloading")
    }
    validateInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { serverConfig } = this.state;
        let errorMsg = "";
        switch(event.target.id) {
            case serverConfig.host.id:
                serverConfig.host.value = event.target.value;
                if (!TTUtil.isValidFormInput({props: serverConfig.host, value: event.target.value})) {
                    errorMsg = ErrorMsg.GENERIC;
                }
                break;
            case serverConfig.port.id:
                serverConfig.port.value = event.target.value;
                if (!TTUtil.isValidFormInput({props: serverConfig.port, value: event.target.value})) {
                    errorMsg = ErrorMsg.GENERIC;
                }
                break;
        }
        this.setState({
            serverConfig: serverConfig,
            errorMsg: {
                host: "",
                port : ""
            }
        });
        return errorMsg;
    }
    showInputError = (isHostEmpty: boolean, isPortEmpty: boolean) => {
        this.setState({
            errorMsg: {
                host: isHostEmpty ? ErrorMsg.GENERIC : "",
                port: isPortEmpty ? ErrorMsg.GENERIC : ""
            }
        });
    }
    getModalBody = () => {
        const { serverConfig, startBtn, errorMsg } = this.state;
        return (
            <form className="tti--margin-top-20">
                <div>
                    <InputText
                        error={errorMsg.host}
                        value={serverConfig.host.value}
                        type={serverConfig.host.type} 
                        id={serverConfig.host.id} 
                        required={serverConfig.host.required} 
                        placeholder="0.0.0.0" 
                        label="Server Host" 
                        isValidInput={this.validateInputs}/>
                    <InputText
                        error={errorMsg.port}
                        value={serverConfig.port.value}
                        type={serverConfig.port.type} 
                        id={serverConfig.port.id} 
                        required={serverConfig.port.required} 
                        placeholder="8888" 
                        label="Server Port" 
                        isValidInput={this.validateInputs}/>
                </div>
                <div className="tti--margin-top-20 tta-display-flex tt-column tt-valign-center">
                    <button className={`tta-primary-btn tt-btn tti--margin-bottom-15 ${ startBtn.isDisabled ? 'tt-disabled' : ''} ${startBtn.showLoading ? 'tt-loading' : ''}`} onClick={this.onFormSubmit}>Start Server</button>
                    <button className="tta-secondary-btn tt-btn" onClick={this.onDownloadRequest}>Download Server</button>
                </div>
            </form>
            
        )
    }
    render(): React.ReactNode {
        return (
            <div className="tta-server-connection-comp tta-display-flex tt-align-center tta-full-width tta-full-height">
                <ModalComp
                    overlay={false}
                    size={ModalSize.MD}
                    title="Server Connection"
                    bodyComponent={this.getModalBody()}/>
            </div>
        );
    }
}