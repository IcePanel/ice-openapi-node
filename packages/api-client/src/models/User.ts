/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserStatus } from './UserStatus';

export type User = {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    status: UserStatus;
    updatedAt?: string;
};

