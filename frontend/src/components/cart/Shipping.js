import React, { Fragment, useState } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfoAction } from '../../redux/actions/cartActions'
import { MetaData } from '../layout/MetaData'
export const Shipping = ({ history }) => {
    const countriesList = Object.values(countries)
    const dispatch = useDispatch();

    const { shippingInfo } = useSelector(state => state.cartReducer)
    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfoAction({
            address,
            city,
            postalCode,
            phoneNo,
            country
        }))
        history.push('/confirm')
    }

    return (
        <Fragment>
            <MetaData title='Shipping Info  | ShopIT' />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={(e) => submitHandler(e)} encType="'multipart/form-data">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input type="text" className="form-control" id="address_field" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input type="text" className="form-control" id="city_field" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input type="phone" className="form-control" id="phone_field" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input type="number" className="form-control" id="postal_code_field" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select id="country_field" name="country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required>

                                {countriesList.map(country => (<option key={country.name} value={country.name}>{country.name}</option>))}
                            </select>
                        </div>
                        <button id="shipping_btn" type="submit" className="btn btn-block py-3">Continue <i className="fa fa-arrow-right" /></button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}
