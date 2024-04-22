import React, { useEffect, useState } from 'react'
import { Card, Flex, Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa6'

const { Title, Text } = Typography;

export const PostCard = ({ postData }) => {

  const [isReadMoreText, setIsReadMoreText] = useState(false)
  useEffect(() => {
    if (postData && postData?.body && postData.body.length > 100) {
      setIsReadMoreText(true)
    }
  }, [postData])
  return (
    <Card hoverable style={{ borderRadius: '24px' }} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
      <Flex justify='space-between' gap={'25px'}>
        <div>
          <img
            alt="avatar"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            style={{
              width: '200px',
              height: '100%',
              objectFit: 'fill',
              borderRadius: '24px 0px 0px 24px',
            }}

          // style={imgStyle}
          />
        </div>
        <div style={{ width: '250px', padding: '12px 5px' }}>
          <Title level={3}>{postData.title.slice(0, 20)}</Title>
          <Text>{postData.body.slice(0, 100)}...</Text>
          {isReadMoreText && <Link>Читать далее</Link>}
        </div>
        <Flex align="end" style={{ padding: '20px' }}>
          <div style={{
            border: '1px solid #333',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Link><FaChevronRight size={30} /></Link>
          </div>
        </Flex>
      </Flex>
    </Card>
  )
}
