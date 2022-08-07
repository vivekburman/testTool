import React from "react";

const TTUtil = {
    isNullOrEmpty: function (data: any) {
        if (data === null || data === undefined) return true;
        if (typeof data == "string" && data.length == 0) return true;
        if (Array.isArray(data)) {
            return data.length === 0;
        }
        if (data instanceof Object) {
            return Object.keys(data).length === 0;
        }
        return false;
    },
    getEmptyFunction: () => {
        return () => {};
    },
    isValidFormInput: function ({props, value}: {props: Readonly<any>, value: string}) {
        if (props.required && this.isNullOrEmpty(value)) {
            return false;
        }
        return true;
    }
}
export default TTUtil;