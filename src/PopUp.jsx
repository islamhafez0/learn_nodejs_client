import React, { useState } from 'react'

const PopUp = ({ setPopup, handleUpdateDocument, id, updateLoading }) => {
  const [data, setData] = useState({
    title: "",
    body: "",
    likes: "",
  })
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, body, likes  } = data;
    if(!body.trim() || !title.trim() || !likes.trim()) {
      alert("All fields are required !");
      return;
    }
    await handleUpdateDocument(id, title, body, likes)

    setData({
      title: "",
      body: "",
      likes: "",
    })
  } 


  return (
    <div className='popup'>
      <span className='close' onClick={() => setPopup(false)}>X</span>
      <form onSubmit={handleSubmit} className='popup-form'>
        <label htmlFor="title">Title</label>
        <input value={data.title} onChange={handleChange} type="text" name='title' id='title' />
        <label htmlFor="body">Body</label>
        <input value={data.body} onChange={handleChange} type="text" name='body' id='body' />
        <label htmlFor="likes">Likes</label>
        <input value={data.likes} onChange={handleChange} type="number" name='likes' id='likes'/>
        <button type='submit'>{updateLoading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  )
}

export default PopUp