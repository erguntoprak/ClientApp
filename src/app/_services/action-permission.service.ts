import { Injectable, OnInit } from '@angular/core';

import { Roles } from '../shared/enums';
import { AuthService } from './auth.service';
import { ActionPermissionModel } from '../shared/models';



@Injectable({ providedIn: 'root' })
export class ActionPermissionService {

    actionPermissionMap: ActionPermissionModel = {};
    constructor(private authService: AuthService) {
        this.actionPermissionMap['Admin'] = <string[]>[Roles.Admin];
        this.actionPermissionMap['User'] = <string[]>[Roles.User,Roles.Admin];
    }

    hasPermission = (actionName: string) => {
        let isPermission = false;
        const roles = this.actionPermissionMap[actionName];
        this.authService.currentUser.value.roles.forEach(item => {
            if (roles.includes(item)) {
                isPermission = true;
            }
        });
        return isPermission;
    }

}


