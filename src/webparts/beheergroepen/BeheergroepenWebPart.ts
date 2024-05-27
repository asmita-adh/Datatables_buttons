import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import {
  PropertyPaneDropdown,
  PropertyPaneTextField,
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { PropertyFieldColorPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { SPFx as spSPFx, spfi } from '@pnp/sp';
import Beheergroepen from './components/Beheergroepen';
import { IBeheergroepenProps } from './components/IBeheergroepenProps';

export interface IBeheergroepenWebPartProps {
  description: string;
  hideEmpty: string;
  filter: string;
  color: string;
  entries: string;
}

export default class BeheergroepenWebPart extends BaseClientSideWebPart<IBeheergroepenWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IBeheergroepenProps> = React.createElement(
      Beheergroepen,
      {
        description: this.properties.description,
        filter: this.properties.filter,
        context: this.context,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        userPermissions: this.context.pageContext.web.permissions,
        color: this.properties.color,
        entries: this.properties.entries,
        hideEmpty: this.properties.hideEmpty
      }
    );

    ReactDom.render(element, this.domElement);
  }

  onInit(): Promise<void> {
    // spfi().using(SPFx(this.context));
    spfi().using(spSPFx(this.context));
    return super.onInit();
    
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'ICTS.BeheerGroepen Settings'
          },
          groups: [
            {
              groupName: 'Webpart configuratie',
              groupFields: [
                PropertyPaneTextField('filter', {
                  label: 'Filter Resultaten:'
                }),
                PropertyPaneDropdown('entries',{
                  label: 'Aantal Resultaten:',
                  options: [{ key: 10, text: '10' }, { key: 25, text: '25' }, { key: 50, text: '50' }, { key: 100, text: '100' }],
                  selectedKey: 10,
                  disabled: false
                }),
                PropertyPaneDropdown('hideEmpty', {
                  label: 'Toon leeg groepen?',
                  options: [{ key: 'Ja', text: 'Ja' }, { key: 'Nee', text: 'Nee' }],
                  selectedKey: 'Nee',
                  disabled: false
                }),
                /*
                PropertyFieldColorPicker('color', {
                  label: 'Webpart Background Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  disabled: false,
                  debounce: 1000,
                  isHidden: false,
                  alphaSliderHidden: false,
                  // style: PropertyFieldColorPickerStyle.Full,
                  iconName: 'Precipitation',
                  key: 'colorFieldId'
                }),*/         
              ]
            }
          ]
        }
      ]
    };
  }
}


