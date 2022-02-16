import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import app from 'flarum/forum/app';

export class SortDirectionToggler extends Component {
  view() {
    let sortDirection = app.__sortDirection;

    if (!['asc', 'desc'].includes(sortDirection)) sortDirection = 'desc';

    return (
      <Button
        class="Button Button--icon Blomstra-SortDirectionToggle"
        onclick={this.toggleSortDirection}
        icon={sortDirection === 'desc' ? 'fas fa-sort-alpha-down' : 'fas fa-sort-alpha-up'}
      />
    );
  }

  toggleSortDirection() {
    app.__sortDirection = app.__sortDirection === 'asc' ? 'desc' : 'asc';
    app.discussions.refresh();
  }
}
