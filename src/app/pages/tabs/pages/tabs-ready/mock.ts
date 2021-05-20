import {IReadyItem} from './tabs-ready.page';

export const READY: IReadyItem[] = [
    {
        num: '№115621',
        manufacture: 'АТ-9',
        date: '11:00',
        verificationType: 'Рабочая проба',
        result: 'Все в норме',
        properties: [
            {
                name: 'Температура',
                value: 45,
                prevValue: 45,
            },
            {
                name: 'Примеси',
                value: 12,
                prevValue: 45,
            }
        ]
    },
    {
        num: '№115622',
        manufacture: 'АТ-8',
        date: '11:20',
        verificationType: 'Стандартный образец',
        result: 'Все в норме',
        properties: [
            {
                name: 'Температура',
                value: 47,
                prevValue: 47,
            },
            {
                name: 'Примеси',
                value: 5,
                prevValue: 5,
            }
        ]
    },
    {
        num: '№115623',
        manufacture: 'АТ-7',
        date: '11:40',
        verificationType: 'Эталонная проба',
        result: 'Все в норме',
        properties: [
            {
                name: 'Температура',
                value: 49,
                prevValue: 49,
                error: 0.01,
                prevError: 0.01
            },
            {
                name: 'Примеси',
                value: 0,
                prevValue: 0,
            }
        ]
    }
];
