import React from "react";
import SplashComp from "../components/SplashComp";

export default class LandingPage extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="tta-landing-page tta-full-width tta-full-height">
                <SplashComp />
            </div>
        );
    }
}