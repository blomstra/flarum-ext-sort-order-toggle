import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import apiSortReverse from '../utils/apiSortReverse';

/**
 * A drop-in replacement for Flarum's native sort dropdown
 * Ours need to handle the special case of sort options that aren't actually visible in the dropdown itself
 */
export default class SortDropdown extends Component {
  view() {
    const sortMap = app.discussions.sortMap();

    const sortOptions = Object.keys(sortMap).reduce((acc, sortId) => {
      acc[sortId] = app.translator.trans(`core.forum.index_sort.${sortId}_button`);
      return acc;
    }, {});

    const activeSortFrontendKey = app.search.params().sort;

    let label = sortOptions[activeSortFrontendKey] || Object.keys(sortMap).map((key) => sortOptions[key])[0];

    const mappingInExtended = app.discussions.extendedSortMap()[activeSortFrontendKey];

    // If the currently active sort is present in the extended map but not the default map, we will use a custom label
    if (mappingInExtended && sortMap[activeSortFrontendKey] !== mappingInExtended) {
      const reverse = apiSortReverse(mappingInExtended);

      // This shouldn't happen, unless you manually type a REST sort option in the URL which has neither positive or negative entry in the map
      label = 'N/A';

      for (let sortParam in sortMap) {
        if (sortMap[sortParam] === reverse) {
          label = '- ' + sortOptions[sortParam];
          break;
        }
      }

      if (label === 'N/A') {
        console.warn('Could not find a label for REST sort ' + reverse);
      }
    }

    return Dropdown.component(
        {
          buttonClassName: 'Button',
          label,
          accessibleToggleLabel: app.translator.trans('core.forum.index_sort.toggle_dropdown_accessible_label'),
        },
        Object.keys(sortOptions).map((value) => {
          const label = sortOptions[value];
          const active = (activeSortFrontendKey || Object.keys(sortMap)[0]) === value;

          return Button.component(
            {
              icon: active ? 'fas fa-check' : true,
              onclick: app.search.changeSort.bind(app.search, value),
              active: active,
            },
            label
          );
        })
      );
  }
}
