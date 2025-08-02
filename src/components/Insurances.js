import React, {useEffect, useState} from "react";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const API =process.env.REACT_APP_API;

export const Insurances = () => {
    const [insurances, setInsurances] = useState([])
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/shopcar');
    }

    const getInsurances = async () => {
        const resp = await fetch(`${API}/insurance`)
        const data = await resp.json()
        console.log(data)
        setInsurances(data)
    }

    const getInsuranceTypes = async () => {
        const resp = await fetch(`${API}/insurance_type`)
        const data = await resp.json()
        console.log(data)
    }

    useEffect(() => {
        getInsurances();
    }, [])


    return (
        <div className='row'>
            <div className='col md-4'>
                <form onSubmit={handleSubmit} className="card card-body">

                    <div>
                        {insurances.map(insurance => (
                            <div className="card p-2 m-2">
                                <div className="card-body">
                                    <h4 className="card-title">{insurance.name}</h4>
                                    <p className="card-text">{insurance.description}</p>
                                    <p className="card-text">{insurance.benefits}</p>
                                </div>
                                <button className="btn btn-primary btn-block">Comprar</button>
                            </div>
                        ))}
                    </div>
                </form>
            </div>
            <div className="col md-8">

            </div>
        </div>
    )
}