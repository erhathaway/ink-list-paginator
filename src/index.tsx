import {useEffect, useState} from 'react';
import {useInput} from 'ink';

export type ListProps<ListItem> = {
    list: ListItem[];
    pageSize?: number;
    isCursorOn: boolean;
    children: ({
        data,
        pageSize,
        isCursorOn,
        pageRange
    }: {
        data: ListItem[];
        pageSize?: number;
        isCursorOn: boolean;
        pageRange: [number, number];
    }) => JSX.Element;
};

const movePageRangeClosure =
    (pageRange: [number, number], totalSetSize: number, pageSize: number) =>
    (movement: number): [number, number] => {
        const [start, end] = pageRange;
        let newStart = start;
        let newEnd = end;

        // apply changes
        newStart = start + movement;
        newEnd = end + movement;

        // make sure 'start' isn't greater than last page
        if (newStart > totalSetSize - pageSize) {
            newStart = totalSetSize - pageSize;
        }

        // make sure 'start' isn't less than first page
        if (newStart < 0) {
            newStart = 0;
        }

        // make sure 'end' isn't greater than last page
        if (newEnd > totalSetSize - 1) {
            newEnd = totalSetSize - 1;
        }

        // make sure 'end' isn't less than first page
        if (newEnd < pageSize) {
            newEnd = pageSize - 1;
        }

        // make sure 'start' and 'end' are within set limits
        if (pageSize > totalSetSize) {
            newStart = 0;
            newEnd = totalSetSize - 1;
        }

        return [newStart, newEnd];
    };

export const PaginatedList = <ListItem extends any>({
    list: _ls,
    pageSize: _ps,
    isCursorOn,
    children
}: ListProps<ListItem>): JSX.Element => {
    const pageSize = _ps == null ? 100 : _ps;
    const [pageRange, setPageRange] = useState<[number, number]>([0, pageSize - 1]);
    const [paginatedListData, setPaginatedListData] = useState<ListItem[]>(_ls.slice(...pageRange));

    useInput((_input, key) => {
        if (!isCursorOn) {
            return;
        }

        const movePageRange = movePageRangeClosure(pageRange, _ls.length, pageSize);

        if (key.downArrow) {
            setPageRange(movePageRange(1));
        } else if (key.upArrow) {
            setPageRange(movePageRange(-1));
        } else if (key.pageDown) {
            setPageRange(movePageRange(pageSize));
        } else if (key.pageUp) {
            setPageRange(movePageRange(-pageSize));
        }
    });

    useEffect(() => {
        const rangeWithSliceSupport = [pageRange[0], pageRange[1] + 1] as [number, number];
        const fn = () => setPaginatedListData(_ls.slice(...rangeWithSliceSupport));

        // TOOD add throttle here
        fn();
    }, pageRange);

    return children({data: paginatedListData, pageRange, pageSize, isCursorOn});
};
