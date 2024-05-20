import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from './components/Loading/Loading';
const Login = lazy(() => import('./components/Login/Login'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Forget = lazy(() => import('./components/Forget/Forget'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));
const TableExtraction = lazy(() => import('./components/Main/TableExtraction'));
const MathConverter = lazy(() => import('./components/Main/MathConverter'));
const Pdf = lazy(() => import("./components/Main/Pdf"));
const HtmlGenerator = lazy(() => import('./components/Main/HtmlGenerator'));
const Assets = lazy(() => import('./components/Assets/Assets'));


export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/' element={<Dashboard />} >
            <Route path='/table-extraction' element={<TableExtraction />} />
            <Route path='/math-convertor' element={<MathConverter />} />
            <Route path='/pdf-to-word' element={<Pdf />} />
            <Route path='/html-generator' element={<HtmlGenerator />} />
          </Route> */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/table-extraction' element={<TableExtraction />} />
          <Route path='/math-convertor' element={<MathConverter />} />
          <Route path='/pdf-to-word' element={<Pdf />} />
          <Route path='/html-generator' element={<HtmlGenerator />} />
          <Route path='/assets' element={<Assets />} />
          <Route path="/forget" element={<Forget />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
