import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';

export class SortDirectionToggler extends Component {
  view() {
    const sortDirection = this.getSortDirection();

    return (
      <Button
        class="Button Button--icon Blomstra-SortDirectionToggle"
        onclick={this.toggleSortDirection.bind(this)}
        aria-label={app.translator.trans(`blomstra-sort-order-toggle.forum.sort-toggle.${sortDirection}-label`)}
        icon={sortDirection === 'desc' ? 'fas fa-sort-amount-down' : 'fas fa-sort-amount-up'}
      />
    );
  }

  protected getApiSort(): string {
    const { sort } = app.search.params();

    const sortMap = app.discussions.sortMap();

    let apiSort = sortMap[sort || ''];

    if (!apiSort) {
      apiSort = Object.values(sortMap)[0];
    }

    return apiSort;
  }

  getSortDirection(): 'asc' | 'desc' {
    return this.getApiSort().startsWith('-') ? 'desc' : 'asc';
  }

  toggleSortDirection() {
    const currentSort = this.getApiSort();

    const newSort = currentSort.startsWith('-') ? currentSort.substring(1) : '-' + currentSort;

    const sortMap = app.discussions.sortMap();

    for (let sortParam in sortMap) {
      if (sortMap[sortParam] === newSort) {
        app.search.changeSort(sortParam);
        break;
      }
    }
  }
}
