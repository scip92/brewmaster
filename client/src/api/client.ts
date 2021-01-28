import { apiUrl } from "./config";
import { Stirrer } from "../models/Stirrer";

const headers = {"Content-Type": "application/json"};

export const getCurrentTemperature = async (): Promise<{ current_temperature: number }> => {
    const res = await fetch(`${apiUrl}/current_temperature`);
    return await res.json() as Promise<{ "current_temperature": number }>;
}

export const getTargetTemperature = async (): Promise<{ target_temperature: number }> => {
    const res = await fetch(`${apiUrl}/target_temperature`);
    return await res.json() as Promise<{ "target_temperature": number }>;
}

export const getStirrer = async (): Promise<Stirrer> => {
    const res = await fetch(`${apiUrl}/stirrer`);
    return await res.json() as Promise<Stirrer>;
}

export const setStirrer = async (enabled: boolean): Promise<any> => {
    const request = {
        body: JSON.stringify({enabled}),
        headers,
        method: 'put',
    }
    return fetch(`${apiUrl}/stirrer`, request);
}

export const saveTargetTemperature = async (targetTemperature: number): Promise<any> => {
    const request = {
        body: JSON.stringify({"new_value": targetTemperature}),
        headers,
        method: 'post',
    }
    return fetch(`${apiUrl}/target_temperature`, request);
}

