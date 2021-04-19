import axiosMock from 'axios';
import { render } from "@testing-library/react";
import PageNotFound from "../views/page-not-found/page-not-found";7

jest.mock('axios');

describe('Dogs List tests suite', () =>
{
    it('loads correct layout', () =>
    {
        const url = 'https://dog.ceo/api/breeds/image/random';
        const mockData = {
            message: 'random-dog',
            success: true
        };
        
        axiosMock.get.mockResolvedValue({data: mockData});

        const { getByTestId } = render(<PageNotFound />);

        expect(getByTestId('not-found')).toHaveTextContent('Page not found');
        expect(getByTestId('not-found')).toHaveTextContent(`Here's a cute dog`);
        expect(getByTestId('not-found')).toContainElement(getByTestId('random-image'))
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(url);
    })
});