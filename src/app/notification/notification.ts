export interface Notification {
    id: string;
    level: NotificationLevel;
    detail: string;
}

export const ERROR_LEVEL = 'ERROR';
export const INFO_LEVEL = 'INFO';
export const WARNING_LEVEL = 'WARNING';

type NotificationLevel = typeof ERROR_LEVEL | typeof INFO_LEVEL | typeof WARNING_LEVEL;
