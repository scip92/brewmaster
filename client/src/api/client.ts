import { apiUrl } from "./config";

const headers = {"Content-Type": "application/json"};

export const getCurrentTemperature = async (): Promise<{ current_temperature: number }> => {
    const res = await fetch(`${apiUrl}/current_temperature`);
    return await res.json() as Promise<{ "current_temperature": number }>;
}

export const getTargetTemperature = async (): Promise<{ target_temperature: number }> => {
    const res = await fetch(`${apiUrl}/target_temperature`);
    return await res.json() as Promise<{ "target_temperature": number }>;
}

export const saveTargetTemperature = (targetTemperature: number) => {
    const request = {
        body: JSON.stringify({"new_value": targetTemperature}),
        headers,
        method: 'post',
    }
    return fetch(`${apiUrl}/target_temperature`, request);
}

