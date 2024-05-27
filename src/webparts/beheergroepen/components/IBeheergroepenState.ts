export interface IBeheergroepenState {
    items: [];
    groups: IGroupState[];
    editPermission: boolean;
    hideEmpty: string;
}

export interface IGroupState {
    name: string;
    id: number;
    members: [];
    userIds: [];
}

