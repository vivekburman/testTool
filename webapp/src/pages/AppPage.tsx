import React from "react";
import AppComp from "../components/AppComp";

export default class AppPage extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="tta-full-width tta-full-height">
                <AppComp />
            </div>
        );
    }
}