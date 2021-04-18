import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './dog-images.scss';
import home from '../../images/home.png';
import Loader from 'react-loader-spinner';

export default function DogImages(props)
{
    const pathToSearch = props.location.pathname.split('/');
    const [images, setImages] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        getDogImages();
    }, []);

    const getDogImages = () =>
    {
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
            console.log(err);
        });
    }

    const prepareDataToShow = dogsImages =>
    {
        setImages(dogsImages.map((image, index) =>
        {
            return (
                <div className="m-1 align-center col-3"
                    key={index}>
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
                <h1 className="title-images">{pathToSearch[1]} {pathToSearch[2]}</h1>
                <Link to="/" className="col-2 align-left custom-links">
                    <img
                        src={home}
                        alt="home"
                        className={'home-image'} 
                    />
                </Link>
            </div>
            <div className="col-12 row align-items-center justify-content-center images">
                {loading ?
                <Loader
                    type="Puff"
                    height={100}
                    width={100}
                    show={loading}
                />
                :
                images
            }
            </div>
        </div>
    )
}