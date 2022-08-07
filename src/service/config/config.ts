type serverType = {
    port: string | number
};

const serverSettings: serverType = {
    port: process.env.COMPILE_PORT || 8080
};
export const config = serverSettings;