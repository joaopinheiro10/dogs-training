import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dog-list.scss';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchBar from '../../components/searchBar/searchBar';
import Loader from 'react-loader-spinner';

export default function DogList(props)
{
    const [dogsList, setDogsList] = useState({});
    const [expandedElement, setExpandedElement] = useState();
    const [filterValue, setFilterValue] = useState('');
    const [list, setList] = useState();
    const [loading, setLoading] = useState(true);
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
            console.log(err);
        });
    }

    const prepareTableToShow = (listToShow = dogsList) =>
    {
        const tempList = (
            <div className="dog-container m-4 scroll-75 row">
                {Object.keys(listToShow).map(breed =>
                {
                    return (
                        <div className={`dog col-md-3 col-12 cursor-pointer`} 
                            key={breed}
                            onClick={() => onClickHandler(breed)}>
                            {breed}
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

    return (
        <div>
            <div className="row mx-auto mb-2">
                <div className="col-12 col-md-3 align-left">
                    <h1 className="title-list">Breed List</h1>
                </div>
                <SearchBar 
                    value={filterValue}
                    setValue={setFilterValue}
                />
            </div>
            <div>
                {!loading ?
                    list 
                    :
                    <Loader
                        type="Puff"
                        height={100}
                        width={100}
                        show={loading}
                    />
                }
            </div>
        </div>
    )
}