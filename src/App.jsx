import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "./PopUp";

function App() {
  const [loading, setLoading] = useState()
  const [data, setData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [popUp, setPopup] = useState(false);
  const [updateId, setUpdateId] = useState("")

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("http://localhost:8000/articles");
      setData(data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleDeleteDocument = async (id) => {
    setDeleteLoading((prev) => ({...prev, [id]: true}))
    try {
      const articleToDelete = await axios.delete(`http://localhost:8000/articles/${id}`);
      console.log("Document deleted successfully", articleToDelete);
      fetchData();
    } catch (error) {
      console.error("Error while deleting documet", error);
    } finally {
      setDeleteLoading((prev) => ({...prev, [id]: false}))
    }
  }

  const handleUpdateDocument = async (id, title, body, likes) => {
    setUpdateLoading(true)
    try {
      const bodyData = {
        title: title,
        body: body,
        likes: likes
      }
      await axios.put(`http://localhost:8000/articles/${id}`, bodyData)
      setPopup(false);
      fetchData();
    } catch (error) {
      console.log(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  function handleUpdate(id) {
    setPopup(true)
    setUpdateId(id)
  }

  return (
    <>
      <div style={{padding: "50px"}}>
        <div style={{marginBottom: 15, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h1>{data?.length <= 0 ? "No avaliable articles" : "All Articles"}</h1>
          <Link to="/">Add New Article</Link>
        </div>
        {loading && <h1>Loading....</h1>}
        {data?.map(item => {
          return (
            <Link to={`/articles/${item._id}`} key={item._id} style={{display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ccc", padding: 10, border: "1px solid #333", marginBottom: 10}}>
              <div>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
                <small>{item.likes}</small>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <button onClick={(e)  => {
                  e.preventDefault()
                  handleDeleteDocument(item._id)
                }}>{deleteLoading[item._id] ? "Loading": "Delete"}</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleUpdate(item._id)
                  }
                }>Edit</button>
              </div>
            </Link>
          )
        })}
      </div>
      {popUp && <PopUp
        setPopup={setPopup}
        handleUpdateDocument={handleUpdateDocument}
        id={updateId}
        updateLoading={updateLoading}
      />}
    </>
  )
}

export default App
