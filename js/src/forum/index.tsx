import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';

import ItemList from 'flarum/common/utils/ItemList';
import IndexPage from 'flarum/forum/components/IndexPage';
import DiscussionListState from 'flarum/forum/states/DiscussionListState';

import type Mithril from 'mithril';
import { SortDirectionToggler } from './components/SortDirectionToggler';
import SortDropdown from './components/SortDropdown';

export * from './components';

app.initializers.add('blomstra/sort-order-toggle', () => {
  extend(IndexPage.prototype, 'viewItems', function (items: ItemList<Mithril.Children>) {
    if ((app.current.data as any).routeName === 'byobuPrivate' || !items.has('sort')) return;

    items.add('sortDirectionToggle', <SortDirectionToggler />, 100);

    items.setContent('sort', <SortDropdown />);
  });

  // We can't just extend the original sortMap because some parts of the UI including the sort dropdown use it to build their options
  // We'll create a separate method than can be used only internally for the URL to REST mapping
  DiscussionListState.prototype.extendedSortMap = function () {
    const map: any = {};

    if (this.params.q) {
      map.relevance = '';
    }

    const extendedMap = app.forum.attribute<any>('sortOrderToggleExtendedMap') || {};

    for (let sortParam in extendedMap) {
      map[sortParam] = extendedMap[sortParam];
    }

    return map;
  };

  // Use our new extended map for the frontend-to-REST map
  extend(DiscussionListState.prototype, 'requestParams', function (params) {
    params.sort = this.extendedSortMap()[this.params.sort ?? ''];
  });
});
