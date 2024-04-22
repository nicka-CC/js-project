import React, { useEffect } from 'react'
import { useParams, useLocation} from 'react-router-dom'
import { PostCard } from '../PostCard/PostCard'
import { useLazyGetPostsQuery } from '../../services/postService/postService'

export const Home = () => {
  
    const params = useParams()
    const location = useLocation()

    const [getPosts, { data: posts, isError, isSuccess, isLoading, error }] = useLazyGetPostsQuery()

    useEffect(() => {
      getPosts()
    }, [getPosts])

    console.log("🚀 ~ HomeCompnonent ~ location:", location)
  
    console.log("🚀 ~ HomeCompnonent ~ params:", params)
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px 50px'
        // width: '64em',
        // margin: '0 auto',
        // marginTop: '20px'
      }}>
        {isSuccess && posts.map((post, index) => <PostCard postData={post} />)}
      </div>
    )
}
