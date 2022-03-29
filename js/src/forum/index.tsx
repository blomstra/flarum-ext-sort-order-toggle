import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';

import ItemList from 'flarum/common/utils/ItemList';
import IndexPage from 'flarum/forum/components/IndexPage';

import type Mithril from 'mithril';
import { SortDirectionToggler } from './components/SortDirectionToggler';

export * from './components';

app.initializers.add('blomstra/sort-order-toggle', () => {
  extend(IndexPage.prototype, 'viewItems', function (items: ItemList<Mithril.Children>) {
    if ((app.current.data as any).routeName === 'byobuPrivate' || !items.has('sort')) return;

    items.add('sortDirectionToggle', <SortDirectionToggler />, 100);
  });
});
