import DiscussionListState from 'flarum/forum/states/DiscussionListState';

declare module 'flarum/forum/states/DiscussionListState' {
  export default interface DiscussionListState {
    extendedSortMap(): any;
  }
}
