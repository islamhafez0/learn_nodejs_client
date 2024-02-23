import { useState } from "react"
import axios from "axios"
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import App from "./App";
function App2() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    likes: ""
  })
  const [loading, setLoading] = useState(false);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/articles", formData);
      if(res.ok) {
        setFormData({
          title: "",
          body: "",
          likes: ""
        })
      }
      navigate("/articles")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }


  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
      <div style={{width: "100%", marginBottom: 15, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <h1>Add New Articles</h1>
          <Link to="/articles">Show all articles</Link>
        </div>
        <label htmlFor="title">Title</label>
        <input onChange={handleChange} value={formData.title} type="text" id="title" name="title" />
        <label htmlFor="body">Body</label>
        <input onChange={handleChange} value={formData.body} type="text" id="body" name="body" />
        <label htmlFor="likes">Likes</label>
        <input onChange={handleChange} value={formData.likes} type="number"  id="likes" name="likes" />
        <button type="submit" className="submit">{loading ? "Loading...." : "Submit"}</button>
      </form>
      <Routes>
        <Route path="/" index />
        <Route path="/articles" element={<App />} />
      </Routes>
    </>
  )
}

export default App2;