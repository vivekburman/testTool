import React from "react";
import { SpinnerSize } from "../utils/TTEnum";
import { CircleSpinner } from "./SpinnerComp";

export default class SplashComp extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="tta-display-flex tt-align-center tta-full-width tta-full-height">
                <CircleSpinner size={SpinnerSize.XXLG}/>
            </div>
        );
    }
}