const TTUtil = {
    isNullOrEmpty: (data: any) => {
        if (data === null || data === undefined) return true;
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
    }
}
export default TTUtil;