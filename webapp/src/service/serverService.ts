import { axiosPost, axiosGet, axiosPatch, axiosDelete } from '../utils/httpReq';

const pingService = (host: string, port: number) => {
    return axiosGet(`${host}:${port}/api/ping`);
}

export {
    pingService
}