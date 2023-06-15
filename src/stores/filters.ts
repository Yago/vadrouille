import { range, splitEvery } from 'ramda';

const itemsPerPage = 9;

document.addEventListener('alpine:init', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Alpine.store('filters', {
    category: 'all',
    canton: 'all',
    season: 'all',
    duration: 'all',
    currentPage: 1,

    data: [],
    filteredData: [],
    pagedData: [],
    total: 0,
    pagination: [],
    displayMap: false,

    dispatch() {
      document.dispatchEvent(
        new CustomEvent('filtersUpdated', {
          detail: { filteredData: this.filteredData },
        })
      );
    },

    init() {
      this.data = JSON.parse(
        document.getElementById('balades')?.dataset?.data ?? '{}'
      );
      this.filteredData = [...this.data];
      this.updateFilteredData();
      this.dispatch();
    },

    toggleMap() {
      this.displayMap = !this.displayMap;
    },

    updateFilteredData() {
      this.filteredData = this.data.filter(
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        (i: any) =>
          (this.category === 'all' ||
            (this.category !== 'all' && i.data.category === this.category)) &&
          (this.season === 'all' ||
            (this.season !== 'all' && i.data.seasons.includes(this.season))) &&
          (this.canton === 'all' ||
            (this.canton !== 'all' && i.data.canton === this.canton)) &&
          (this.duration === 'all' ||
            (this.duration !== 'all' &&
              this.duration.split('.')[0] < i.data.duration / 60 &&
              i.data.duration / 60 <= this.duration.split('.')[1]))
      );
      this.updatePagedData();
      this.dispatch();
    },

    updatePagedData() {
      const pages = splitEvery(itemsPerPage, this.filteredData);
      this.pagedData = pages[this.currentPage - 1] ?? [];
      this.total = pages.length;
      this.updatePagination();
    },

    updatePagination() {
      // @see https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
      const delta = 1;
      const left = this.currentPage - delta;
      const right = this.currentPage + delta + 1;
      let l;
      const rangeWithDots = [];
      const pages = range(1, this.total + 1).filter(
        page =>
          page === 1 || page === this.total || (page >= left && page < right)
      );

      for (const i of pages) {
        if (l) {
          if (i - l !== 1) {
            rangeWithDots.push('...');
          }
        }
        rangeWithDots.push(i);
        l = i;
      }

      this.pagination = rangeWithDots;
    },

    decrement() {
      this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
      this.updatePagedData();
    },

    increment() {
      this.currentPage =
        this.currentPage < this.total ? this.currentPage + 1 : this.total;
      this.updatePagedData();
    },

    setPage(page: number) {
      this.currentPage = page;
      this.updatePagedData();
    },

    set(slug: string, value: string) {
      this[slug] = value;
      this.currentPage = 1;
      this.updateFilteredData();
    },
  });
});
