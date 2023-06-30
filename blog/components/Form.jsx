import React from 'react'

const Form = ({ type, submitting, post, setPost, handleSubmit }) => {
  return (
    <section>
      <h1>{ type } Post </h1>
      <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, quisquam velit in unde voluptates saepe soluta et
         error ullam quos corporis blanditiis officiis, similique perferendis minima tempore quam illo veritatis!</p>

      <form onSubmit = { handleSubmit }>
        <label>
          
        </label>
      </form>
    </section>
  )
}

export default Form