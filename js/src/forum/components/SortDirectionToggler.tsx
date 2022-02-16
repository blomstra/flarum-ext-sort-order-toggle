import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';

export class SortDirectionToggler extends Component {
  view() {
    let sortDirection = (app as any).__sortDirection;

    if (!['asc', 'desc'].includes(sortDirection)) sortDirection = 'desc';

    return (
      <Button
        class="Button Button--icon Blomstra-SortDirectionToggle"
        onclick={this.toggleSortDirection}
        aria-label={app.translator.trans(`blomstra-sort-order-toggle.forum.sort-toggle.${sortDirection}-label`)}
        icon={sortDirection === 'desc' ? 'fas fa-sort-amount-down' : 'fas fa-sort-amount-up'}
      />
    );
  }

  toggleSortDirection() {
    (app as any).__sortDirection = (app as any).__sortDirection === 'asc' ? 'desc' : 'asc';
    app.discussions.refresh();
  }
}
