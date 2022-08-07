import { SpinnerSize } from "../utils/TTEnum";
import React from 'react';
import '../scss/component/_spinner.scss';
interface IProps {
    size: SpinnerSize
}
const CircleSpinner = (props: IProps) => {
    const { size } = props;
    return (
    <div className={`tta-ring tti-${size} tta-display-inlineblock tta-position-relative`}>
        <div className={`tti-item tta-position-absolute tti-${size}`}></div>
        <div className={`tti-item tta-position-absolute tti-${size}`}></div>
        <div className={`tti-item tta-position-absolute tti-${size}`}></div>
        <div className={`tti-item tta-position-absolute tti-${size}`}></div>
    </div>
    );
}

export {
    CircleSpinner
};