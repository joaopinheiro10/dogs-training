import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './page-not-found.scss';

export default function PageNotFound(props)
{
    const [image, setImage] = useState();

    useEffect(() =>
    {
        getRandomDog();
    }, []);

    const getRandomDog = () =>
    {
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then(resp =>
        {
            setImage(resp.data.message);
        })
    }

    return (
        <div className="page-not-found"
            data-testid="not-found">
            <h1>Page not found!</h1>
            <h2>Here's a cute dog</h2>
            <img
                className="random-img"
                src={image}
                alt="random dog"
                data-testid="random-image"
            />
        </div>
    )
}