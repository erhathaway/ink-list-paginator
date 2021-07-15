# ink-list-paginator

A list pagination component for React Ink. Works out of the box with [ink-table](https://github.com/maticzav/ink-table/)

# Install

```shell
npm run --save ink-list-paginator
```


This component is very simple. You may want to just copy the contents of [src/index.tsx](./src/index.tsx) instead of installing it. 

The only dependencies are the two peer dependencies: `React` and [`React Ink`](https://github.com/maticzav/ink-table/)

# Usage

The component works using the function as child (FACC) pattern.

```tsx
import PaginateList from 'ink-list-paginator'

<PaginatedList
    list={tableData}
    pageSize={22}
    isCursorOn={!isInInteractiveMode && mode === 'dataView'}
>
    {({data}) => (
        <Table data={data} />
    )}
</PaginatedList>

```


The `PaginatedList` component takes 3 props:

```ts
    list: ListItem[];
    pageSize?: number; // defaults to 100
    isCursorOn: boolean;
```

- `list` is any list of data
- `pageSize` is optional. It is the size of the page to be maintained
- `isCursorOn` is a flag to tell if the component is in view and the user can interact with it. If `true` the list can be paginated incrementally using the `up` and `down` arrow keys, or paginated by page using the `pgup` and `pgdn` keys.



The child function has the type signature:

```
({
    data: ListItem[];
    pageSize?: number;
    isCursorOn: boolean;
    pageRange: [number, number];
}) => JSX.Element;
```