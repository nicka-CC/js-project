import React, { useContext,  } from 'react'
import { Link, useNavigate} from 'react-router-dom'
// import { MyStore } from '../../store/Context'

export const Header = () => {



  const navigate = useNavigate()
  // const store = useContext(MyStore)

  // console.log('store', 'ok')


  const id = 'testID'
  const uuid = 'testUUID'

  const handleNavigate = () => {
    window.location.href = '/user'
  }
  return (
    <div style={{ border: '1px solid #333', height: '40px', position: 'fixed', width: '100%', background: '#fff' }}>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div><Link to={`/${id}/${uuid}`}>Главная </Link></div>
        <div onClick={() => navigate('/info', { state: { tel: '8800-35-35'} } )}>Инфо</div>
        <div onClick={() => handleNavigate()}>Пользователь</div>
      </div>
      <div>
      </div>
    </div>
  )
}
