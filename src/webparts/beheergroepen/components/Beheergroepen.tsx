import { Icon } from '@fluentui/react/lib/Icon';
import { green, red } from '@material-ui/core/colors';
import 'datatables.net-buttons-dt';
// import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive-dt';
// import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
import DataTable from 'datatables.net-dt';
import * as React from 'react';
import styles from './Beheergroepen.module.scss';
import type { IBeheergroepenProps } from './IBeheergroepenProps';
import { IBeheergroepenState } from './IBeheergroepenState';

export default class Beheergroepen extends React.Component<IBeheergroepenProps, IBeheergroepenState, {}> {
  public constructor(props: IBeheergroepenProps) {
    super(props);
    this.state = {
      items: [],
      groups: [],
      editPermission: false,
      hideEmpty: 'Nee'
    };
  }

  //invoked immediately after updating occurs
  //to operate on the DOM when the component has been updated
  public componentDidMount(): void {
    // var lengthDt = this.props.entries ? this.props.entries : 10;
    // if (this.state.groups.length > 0) {
    new DataTable('#SpfxDatatable', {
    // $('#SpfxDatatable').DataTable({
      pageLength: 10,
      language: { "search": "Filter: " },
      retrieve: true,
      responsive: true,
      scrollCollapse: true,
      scrollY: '50vh',
      buttons: [{ text: 'Show all groups', action: function () { alert('Clicked'); }, className:'hideEmptyButton' }],
      layout: {
        top2Start: 'pageLength',
        top2End: 'pageLength',
        topStart: 'info',
        topEnd: 'search',
        bottomStart: 'pageLength',
        bottomEnd: 'search',
        bottom2Start: 'info',
        bottom2End: 'paging'
}
    })
    // }
  }

  public render(): React.ReactElement<IBeheergroepenProps> {
    // const matchingNumber = /[u][0-9]+$/;
    let permsCheck;
    if (this.state.editPermission) {
      // permsCheck = <Icon iconName="Completed" style={{ color: green[700] }} />;
      permsCheck = <Icon iconName="Completed" style={{ color: green[700] }} />;
    } else {
      permsCheck = <Icon iconName="ErrorBadge" style={{ color: red[500] }} />;
    }
    console.log(permsCheck)

    return (
      <section className={`${styles.beheergroepen}`}>
        <div className={styles.container}>
          <span className={styles.title}>Beheer Groepen</span>
          <div>
            <table className='table-responsive table table-bordered dt-responsive display' id='SpfxDatatable'>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Users</th>
                  <th>Usernames</th>
                  <th>HasEditRight</th>
                </tr>
              </thead>
              <tbody id='SpfxDatatableBody'>
                <tr>
                  <td>Alfred</td>
                  <td>Anders</td>
                  <td>Germany</td>
                  <td>Icon</td>
                </tr>
                <tr>
                  <td>Futterkiste</td>
                  <td>Maria</td>
                  <td>Germanny</td>
                  <td>Icon1</td>
                </tr>
                <tr>
                  <td>Alfrkiste</td>
                  <td>Maers</td>
                  <td>Germmany</td>
                  <td>Icon2</td>
                </tr>
                <tr>
                  <td>Aiste</td>
                  <td>Marirs</td>
                  <td>Geermany</td>
                  <td>Icon3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }


  /*convert uNumber to number and redirect to wieIsWie
  private convertToLink(uNumber: string) {
    const numbers = /[u][0-9]+/;
    let linkAddress = 'https://www.kuleuven.be/wieiswie/nl/person/';
    if (uNumber.substr(uNumber.length - 8, 1) == 'u' && uNumber.match(numbers)) {
      let unum = uNumber.replace('u', '0');
      linkAddress += unum;
    }
    return window.open(linkAddress) || window.location.assign(linkAddress); // open in new tab or else in the same window if pop-up is blocked
  }
  */
}
