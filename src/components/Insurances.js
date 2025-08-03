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
        <form onSubmit={handleSubmit}>
        <div className="row border-0 pt-5">
            
                {insurances.map(insurance => (

                    <div key={insurance._id} className='col-4'>
                        <div  className="card p-2 m-2">
                            <h4 className="card-header text-center">{insurance.name} <span className="badge text-bg-success"> {insurance.value}</span></h4>
                            <img src={`../assets/images/${insurance.image}`} className="card-img-top" alt={insurance.name}></img>
                            <div className="card-body">
                                <h5 className="card-title"><b>Tipo de Seguro: </b>{insurance.insurance_type}</h5>
                                <p className="card-text"><b>Descripción: </b>{insurance.description}</p>
                                <p className="card-text"><b>Beneficios: </b>{insurance.benefits}</p>
                            </div>
                            <button  className="btn btn-primary btn-block">Comprar</button>
                        </div>
                    </div>

                ))}
            
        </div>
        </form>
    )
}