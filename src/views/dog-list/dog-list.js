import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dog-list.scss';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchBar from '../../components/searchBar/searchBar';
import Loader from 'react-loader-spinner';
import arrow from '../../images/arrow-down.png';

export default function DogList(props)
{
    const [dogsList, setDogsList] = useState({});
    const [expandedElement, setExpandedElement] = useState();
    const [filterValue, setFilterValue] = useState('');
    const [list, setList] = useState();
    const [loading, setLoading] = useState(true);
    const [errorMode, setErrorMode] = useState(false);
    const history = useHistory();

    useEffect(() =>
    {
        getDogsList();
    }, []);

    useEffect(() =>
    {
        if (Object.keys(dogsList).length > 0)
        {
            prepareTableToShow();
        }
    }, [dogsList]);

    useEffect(() =>
    {
        if (list && Object.keys(list))
        {
            filterData();
        }
    }, [expandedElement]);

    useEffect(() =>
    {
        if (Object.keys(dogsList).length > 0)
        {
            filterData();
        }
    }, [filterValue]);

    useEffect(() =>
    {
        setLoading(false);
    }, [list]);

    const getDogsList = async () =>
    {
        axios.get('https://dog.ceo/api/breeds/list/all')
        .then(resp =>
        {
            setDogsList(resp.data.message);
        })
        .catch(err =>
        {
            setLoading(false);
            setErrorMode(true);
        });
    }

    const prepareTableToShow = (listToShow = dogsList) =>
    {

        const tempList = (
            <div className="dog-container m-4 scroll-75 row"
                data-testid="resolved">
                {Object.keys(listToShow).map(breed =>
                {
                    return (
                        <div className={`dog col-md-3 col-12 cursor-pointer`} 
                            key={breed}
                            onClick={() => onClickHandler(breed)}
                            data-testid="dog">
                            <div>
                                {breed} {listToShow[breed].length > 0 ? getArrowImg() : ''}
                            </div>
                            {expandedElement === breed && (
                                <div className="justify-content-between row mb-2">
                                    {listToShow[breed].map(subBreed =>
                                    {
                                        return (
                                            <div className="sub-breed mb-1"
                                                key={`${breed}-${subBreed}`}>
                                                <Link to={`/dog/${breed}/${subBreed}`} className="custom-links"> 
                                                    {subBreed}
                                                </Link>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        );

        setList(tempList);
    }

    const onClickHandler = breed =>
    {
        if (dogsList[breed].length > 0)
        {
            expandedElement === breed ? 
                setExpandedElement(null) :
                setExpandedElement(breed);
        }
        else
        {
            history.push(`/dog/${breed}/`);
        }
    }

    const filterData = () =>
    {
        if (filterValue === '')
        {
            prepareTableToShow();
            return;
        }

        let filteredList = Object.keys(dogsList).filter(breed =>
        {
            if (dogsList[breed].length < 1)
            {
                return breed.toLowerCase().includes(filterValue.toLowerCase());
            }
            else
            {
                return breed.toLowerCase().includes(filterValue.toLowerCase()) ||
                    dogsList[breed].some(subBreed => 
                        subBreed.toLowerCase().includes(filterValue.toLowerCase()));
            }
        });

        const newList = {};
        filteredList.forEach(breed => (newList[breed] = dogsList[breed]));

        prepareTableToShow(newList);
    }

    const getArrowImg = () =>
    {
        return (
            <img
                className="arrow"
                src={arrow}
                alt="arrow down"
            />
        )
    }

    return (
        <div>
            <div className="row ml-2 mb-3">
                <div className="col-12 col-md-4 align-left"
                    data-testid="welcome-title">
                    <h1 className="title-list">Welcome!</h1>
                </div>
                <SearchBar 
                    value={filterValue}
                    setValue={setFilterValue}
                />
            </div>
            <div data-testid="list-title">
                <h1>List of Dog Breeds</h1>
            </div>
            <div data-testid="content">
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
                        Something went wrong
                    </div>
                    :
                    list 
                }
            </div>
        </div>
    )
}