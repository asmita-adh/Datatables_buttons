import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IBeheergroepenProps {
  description: string;
  filter: string;
  context: WebPartContext;
  siteUrl: string;
  userPermissions: any;
  color: string;
  entries: string;
  hideEmpty: string;
}
