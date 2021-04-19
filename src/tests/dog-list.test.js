import axiosMock from 'axios';
import React from 'react';
import {render, cleanup, waitFor, within, fireEvent} from '@testing-library/react';
import DogList from '../views/dog-list/dog-list';

jest.mock('axios');

describe('Dogs List tests suite', () =>
{
    afterEach(cleanup);

    it('fetches and displays data', async () =>
    {
        const url = 'https://dog.ceo/api/breeds/list/all';
        const mockData = {
            message: {
                dog1: [],
                dog2: ['aaa', 'bbb'],
                dog3: []
            },
            success: true
        };

        axiosMock.get.mockResolvedValue({data: mockData});

        const { getByTestId } = render(<DogList/>);

        const resolvedDiv = await waitFor(() => getByTestId('resolved'));

        const content = getByTestId('content');
        const dog = within(content).getAllByTestId('dog');

        expect(dog.length).toBe(3);
        expect(resolvedDiv).not.toBeEmptyDOMElement();
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
    });

    it('tries to fetch data but has an error', async () =>
    {
        axiosMock.get.mockRejectedValueOnce();

        const { getByTestId } = render(<DogList/>);

        const errorDiv = await waitFor(() => getByTestId('error'));

        expect(errorDiv).toBeTruthy();
        expect(errorDiv).toHaveTextContent('Something went wrong');
    });

    it('renders list of dog breeds title', async () =>
    {
        const { getByTestId } = render(<DogList />);

        expect(getByTestId('welcome-title')).toHaveTextContent('Welcome!');
        expect(getByTestId('list-title')).toHaveTextContent('List of Dog Breeds');
    });

    it('search bar correctly and filtering data', async () =>
    {
        const { getByTestId } = render(<DogList />);

        const searchBar = getByTestId('search-bar');
        expect(searchBar).toBeTruthy();
        
        fireEvent.change(searchBar, {target: {value: '1'}});
        expect(searchBar).toHaveValue('1');
    });

});