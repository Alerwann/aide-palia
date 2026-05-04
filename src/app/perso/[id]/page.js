'use client';
import * as React from 'react'

export default function perso({ params }) {
 const id = React.use(params).id
  console.log(`Slug : ${id}`)
  return <div>nom du perso : {id} </div>;
}
