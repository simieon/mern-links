import React from 'react'
import { Route, Routes, Navigate} from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return (
            <Routes>
                <Route path='/links' element={<LinksPage/>} exact />
                <Route path='/create' element={<CreatePage/>} exact />
                <Route path='/detail/:id' element={<DetailPage/>}/>
                <Route path='/*' element={<Navigate to="/create" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<AuthPage/>} exatc/>
            <Route path='/*' element={<Navigate to="/" />} />
        </Routes>
    )
}