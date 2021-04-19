import axiosMock from 'axios';
import React from 'react';
import {render, cleanup, waitFor, within} from '@testing-library/react';
import DogImages from '../views/dog-images/dog-images';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom/cjs/react-router-dom.min';

jest.mock('axios');

describe('Dogs List tests suite', () =>
{
    afterEach(cleanup);

    it('fetches and displays data', async () =>
    {
        const dogBreed = '/dog/african';
        const url = `https://dog.ceo/api/breed/african/images/random/10`;
        const mockData = {
            message: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9', 'img10',],
            success: true
        };

        const history = createMemoryHistory();
        history.push(dogBreed);

        axiosMock.get.mockResolvedValue({data: mockData});

        const { getByTestId } = render(
        <Router history={history}>
            <DogImages />
        </Router>);

        const content = await waitFor(() => getByTestId('content'));
        const image = within(content).getAllByTestId('dog-image');

        expect(image.length).toBe(10);
        expect(content).not.toBeEmptyDOMElement();
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
    });

    it('tries to fetch data but has an error', async () =>
    {
        const dogBreed = '/dog/african';
        const history = createMemoryHistory();
        history.push(dogBreed);

        axiosMock.get.mockRejectedValueOnce();

        const { getByTestId } = render(
            <Router history={history}>
                <DogImages />
            </Router>);

        const errorDiv = await waitFor(() => getByTestId('error'));

        expect(errorDiv).toBeTruthy();
        expect(errorDiv).toHaveTextContent('Something went wrong');
    });

    it('shows buttons to reload and to go back home', () =>
    {
        const dogBreed = '/dog/african';
        const history = createMemoryHistory();
        history.push(dogBreed);

        const mockData = {
            message: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9', 'img10',],
            success: true
        };

        axiosMock.get.mockResolvedValue({data: mockData});

        const { getByTestId } = render(
            <Router history={history}>
                <DogImages />
            </Router>);
        
        expect(getByTestId('home-button')).toBeTruthy();
        expect(getByTestId('reload-button')).toBeTruthy();
    });

    it('renders list of dog breeds title', async () =>
    {
        const dogBreed = '/dog/african';
        const history = createMemoryHistory();
        history.push(dogBreed);

        const mockData = {
            message: ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img9', 'img10',],
            success: true
        };

        axiosMock.get.mockResolvedValue({data: mockData});

        const { getByTestId } = render(
            <Router history={history}>
                <DogImages />
            </Router>);
        
        expect(getByTestId('breed-title')).toHaveTextContent('african');
    });
});