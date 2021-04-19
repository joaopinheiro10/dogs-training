import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './dog-images.scss';
import home from '../../images/home.png';
import Loader from 'react-loader-spinner';

export default function DogImages(props)
{
    const pathToSearch = useLocation().pathname.split('/');
    const [images, setImages] = useState();
    const [loading, setLoading] = useState(true);
    const [errorMode, setErrorMode] = useState(false);

    useEffect(() =>
    {
        getDogImages();
    }, []);

    const getDogImages = () =>
    {
        setLoading(true);
        const request = pathToSearch[3] ? 
            `https://dog.ceo/api/breed/${pathToSearch[2]}/${pathToSearch[3]}/images/random/10` :
            `https://dog.ceo/api/breed/${pathToSearch[2]}/images/random/10`;

        axios.get(request)
        .then(resp =>
        {
            prepareDataToShow(resp.data.message);
        })
        .catch(err =>
        {
            setLoading(false);
            setErrorMode(true);
        });
    }

    const prepareDataToShow = dogsImages =>
    {
        setImages(dogsImages.map((image, index) =>
        {
            return (
                <div className="m-1 align-center col-3"
                    key={index}
                    data-testid="dog-image">
                    <img className="image-dog p-3" 
                        src={image} 
                        alt={`Dog ${index}`} 
                    />
                </div>
            )
        }));

        setLoading(false)
    }

    return (
        <div>
            <div className="ml-4 justify-content-between row">
                <h1 className="title-images" data-testid="breed-title">
                    {pathToSearch[2]} {pathToSearch[3]}
                </h1>
                <Link to="/" className="col-2 align-left custom-links"
                    data-testid="home-button">
                    <img
                        src={home}
                        alt="home"
                        className={'home-image'} 
                    />
                </Link>
            </div>
            <div className="col-12 row align-items-center justify-content-center images"
                data-testid="content">
                {loading ?
                    <Loader
                        type="Puff"
                        height={100}
                        width={100}
                        show={loading}
                        data-testid="loader"
                    />
                :
                errorMode ?
                    <div data-testid="error">
                        <h2>Something went wrong</h2>
                    </div>
                :
                    images
            }
            </div>
            <button className="button-images"
                onClick={() => getDogImages()}
                data-testid="reload-button">
                New Images
            </button>
        </div>
    )
}