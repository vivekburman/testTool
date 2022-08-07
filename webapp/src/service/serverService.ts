import { axiosPost, axiosGet, axiosPatch, axiosDelete } from '../utils/httpReq';

const pingService = (host: string, port: number) => {
    return fetch(`${host}:${port}/compile/ping`).then(res => res.json());
}

export {
    pingService
}