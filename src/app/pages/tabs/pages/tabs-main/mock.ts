import {IDiagram} from './tabs-main.page';

export const MAIN_PAGE_DATA: IDiagram = {
    total: 14,
    date: '19.01.2021',
    sections: [
        {
            name: 'Новые',
            value: 5,
            showValue: '4/5',
            color: 'var(--gray-slyder)'
        },
        {
            name: 'Выполнены',
            value: 7,
            color: 'var(--border-blue-color)'
        }
    ]
};
