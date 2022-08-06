import React from "react";
import TTUtil from "../utils/helpers";
import { ServerCredentials } from "../utils/TTEnum";
import ServerConnection from "./ServerConnComp";

interface IProps {

}
interface IState {
    serverCreds?: ServerCredentials | null,
    
}
export default class AppComp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            serverCreds: null,
        }
    }
    componentDidMount() {

    }
    render(): React.ReactNode {
        const { serverCreds } = this.state;
        return (
            <div className="tta-full-width tta-full-height">
                {
                    TTUtil.isNullOrEmpty(serverCreds) ? <ServerConnection /> : <></>
                }
            </div>
        );
    }
}