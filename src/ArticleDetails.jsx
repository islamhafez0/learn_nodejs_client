import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
const ArticleDetails = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`http://localhost:8000/articles/${id}`);
        setData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])
  return (
    <>
    <div style={{padding: "50px"}}>
      <h1 style={{marginBottom: 15}}>Article <pre>{id}</pre></h1>
      {loading && <h1>Loading....</h1>}
      {data && (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ccc", padding: 10, border: "1px solid #333", marginBottom: 10}}>
          <div>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <small>{data.likes}</small>
          </div>
          <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
      )}
    </div>
  </>
  )
}

export default ArticleDetails