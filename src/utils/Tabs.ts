import { Json, Message } from '../types';

export const getCurrentTab = (): Promise<chrome.tabs.Tab> => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                resolve(tabs[0]);
            } else {
                resolve(undefined);
            }
        });
    });
};

export const sendMessage = async (message: Message): Promise<Json> => {
    const currentTab = await getCurrentTab();
    if (!currentTab) {
        return Promise.resolve(undefined);
    }
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(currentTab.id, message, (response) => {
            resolve(response);
        });
    });
};
