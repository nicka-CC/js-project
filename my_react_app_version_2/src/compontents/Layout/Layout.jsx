import React, {  useEffect, useRef, useState } from 'react'


import { Outlet, useNavigate } from 'react-router-dom'

import { Layout, Menu } from 'antd'

import classes from './Layout.module.css'

import {useDispatch, useSelector} from "react-redux";
import {resetCouter, setCouter} from "../../store/reducer/CounterSlice/counterSlice";

export const PageLayout = ({ children }) => {


  const navigate = useNavigate()
  const [number, setNumber] = useState(0)
  const { Header, Content, Footer, Sider } = Layout;
  // custom hook
  // const value = useCustomHook('change value to custom hook')


  // console.log("🚀 ~ Layout ~ value:", value)

  // useEffect(() => {
  //   alert('Component mount')
  // }, [number])


  const increment = () => {
    // let _number = number
    setNumber(number + 1)
  }


  // useMemo 
  // useCallback 

  // const memoMethod = useMemo(() => {
  //   return 'any value'
  // })

  // const callbackMethod = useCallback(() => {
  //   return 'any value'
  // })

  const textareaRef = useRef()

  const menuItems = [
    { id: 1, label: 'Главная', key: 1, link: '/' },
    { id: 2, label: 'Инфо', key: 2, link: '/info' },
    { id: 3, label: 'Пользователь', key: 3, link: '/user' },
    { id: 4, label: 'Вход/Регистрация', key: 4, link: '/auth' },
  ]

  const dispatch = useDispatch()
  const { value } = useSelector((state) => state.counterReducer)

  const handleNavigate = (key) => {
    let link = menuItems.find((item) => item.key == key)

    if (link) {
      navigate(link.link)
    }
  }

  const incrementStoreValue = (newValue ) => {
    dispatch(setCouter( { value: newValue} ))
  }

  useEffect(() => {

    return (() => {
      dispatch(resetCouter() )
    })
  }, []);

  return (

    <Layout>
      {/* <Content> */}
        <Layout>
          <Sider theme='light'><Menu items={menuItems}/></Sider>
          <Content style={{ height: '98vh', overflowY: 'auto', margin: '0 auto'}}>
            <Outlet />
          </Content>
          <div style={{ width: '430px', border: '1px solid'}}>
            right panel
          </div>
        </Layout>
      {/* </Content> */}
    </Layout>
  )
}
