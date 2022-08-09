import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import classList from 'flarum/common/utils/classList';
import app from 'flarum/forum/app';
import apiSortReverse from '../utils/apiSortReverse';

export class SortDirectionToggler extends Component {
  view() {
    const sortDirection = this.getSortDirection();

    return (
      <Button
        class={classList(['Button', 'Button--icon', 'Blomstra-SortDirectionToggle', this.isExtendedSortField() && 'active'])}
        onclick={this.toggleSortDirection.bind(this)}
        aria-label={app.translator.trans(`blomstra-sort-order-toggle.forum.sort-toggle.${sortDirection}-label`)}
        icon={sortDirection === 'desc' ? 'fas fa-sort-amount-down' : 'fas fa-sort-amount-up'}
      />
    );
  }

  protected getApiSort(): string {
    const { sort } = app.search.params();

    const sortMap = app.discussions.extendedSortMap();

    let apiSort = sortMap[sort || ''];

    if (!apiSort) {
      apiSort = Object.values(sortMap)[0];
    }

    return apiSort;
  }

  getSortDirection(): 'asc' | 'desc' {
    return this.getApiSort().startsWith('-') ? 'desc' : 'asc';
  }

  isExtendedSortField(): boolean {
    const { sort } = app.search.params();

    return sort && !app.discussions.sortMap()[sort] && app.discussions.extendedSortMap()[sort];
  }

  toggleSortDirection() {
    const currentApiSort = this.getApiSort();

    const newApiSort = apiSortReverse(currentApiSort);

    const sortMap = app.discussions.extendedSortMap();

    let newFrontendSort;

    for (let sortParam in sortMap) {
      if (sortMap[sortParam] === newApiSort) {
        newFrontendSort = sortParam;
        break;
      }
    }

    if (!newFrontendSort) {
      console.warn('Could not find a frontend sort key for REST sort ' + newApiSort);
      return;
    }

    app.search.changeSort(newFrontendSort);
  }
}
