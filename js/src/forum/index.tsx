import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';

import ItemList from 'flarum/common/utils/ItemList';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';

import type Mithril from 'mithril';
import { SortDirectionToggler } from './components/SortDirectionToggler';

app.initializers.add('blomstra/sort-order-toggle', () => {
  extend(IndexPage.prototype, 'viewItems', function (items: ItemList<Mithril.Children>) {
    if (app.current.data.routeName === 'byobuPrivate' || !items.has('sort')) return;

    items.add('sortDirectionToggle', <SortDirectionToggler />, 100);
  });

  extend(DiscussionListState.prototype, 'requestParams', function (this: DiscussionListState, params: Record<string, any>) {
    if (params.sort) {
      if (params.sort.startsWith('-') && app.__sortDirection === 'asc') {
        params.sort = params.sort.substr(1);
      } else if (!params.sort.startsWith('-')) {
        params.sort = '-' + params.sort;
      }
    }
  });
});
