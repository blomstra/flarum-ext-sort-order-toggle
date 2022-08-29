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
        class={classList([
          'Button',
          'Button--icon',
          'Blomstra-SortDirectionToggle',
          {
            active: this.isExtendedSortField(),
            disabled: !this.oppositeFrontendSort(),
          },
        ])}
        onclick={this.toggleSortDirection.bind(this)}
        aria-label={app.translator.trans(`blomstra-sort-order-toggle.forum.sort-toggle.${sortDirection}-label`)}
        icon={sortDirection === 'desc' ? 'fas fa-sort-amount-down' : 'fas fa-sort-amount-up'}
      />
    );
  }

  protected getApiSort(): string {
    const { sort } = app.search.params();

    let apiSort = sort && app.discussions.extendedSortMap()[sort];

    if (!apiSort) {
      // If no explicit sort option was provided, we will take the first one in the original sortMap
      // it's important to use sortMap and not extendedSortMap because extensions might customize the order in sortMap to indicate a new default
      apiSort = Object.values(app.discussions.sortMap())[0];
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

  oppositeFrontendSort(): string | null {
    const currentApiSort = this.getApiSort();

    const newApiSort = apiSortReverse(currentApiSort);

    const sortMap = app.discussions.extendedSortMap();

    let newFrontendSort: string | null = null;

    for (let sortParam in sortMap) {
      if (sortMap[sortParam] === newApiSort) {
        newFrontendSort = sortParam;
        break;
      }
    }

    return newFrontendSort;
  }

  toggleSortDirection() {
    const newFrontendSort = this.oppositeFrontendSort();

    // Shouldn't happen because the button will be disabled
    if (!newFrontendSort) {
      return;
    }

    app.search.changeSort(newFrontendSort);
  }
}
