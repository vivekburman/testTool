import { MouseEventHandler, ReactElement } from "react";

export enum SpinnerSize {
    "XS" = 12,
    "SM" = 14,
    "MD" = 16,
    "LG" = 18,
    "XLG" = 20,
    "XXLG" = 50,
}
export interface ServerCredentials {
    host: string,
    port: number,
}
export enum ModalSize {
    "XS" = "xs",
    "SM" = "sm",
    "MD" = "md",
    "LG" = "lg",
}
export enum InputTypes {
    TEXT = "text",
    NUMBER = "number",
    PASSWORD = "password"
}

export enum ErrorMsg {
    GENERIC = "Field value required"
}
export interface ModalProps {
    size: ModalSize,
    title: string,
    bodyComponent: ReactElement,
    overlay: boolean,
    onClose?: MouseEventHandler<HTMLButtonElement>,
}