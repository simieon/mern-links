import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const CreatePage = () =>{
    const navigate = useNavigate()
    const auth = useContext(AuthContext)//to get user token
    const { request } = useHttp()
    const [link, setLink] = useState('')

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event =>{
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                navigate(`/detail/${data.link._id}`)
            } catch (e) {
                
            }
        }
    }

    return (
        <div className='row'>
            <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
                <input
                    placeholder='Enter link'
                    id='link'
                    type='text'
                    onChange={e => setLink(e.target.value)}
                    value={link}
                    onKeyPress={pressHandler}
                />
                <label htmlFor='link'>Enter link</label>
            </div>
        </div>
    )
}