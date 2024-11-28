import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useParams } from 'react-router-dom';


const ItemDetail = () => {

  const {id} = useParams()

  console.log("id received via params",id);
  

  return (
    <div className='flex flex-col'>
      {/* <img src="" alt="" /> */}
      <Skeleton height="100%" />
      <div>

      </div>
    </div>
  )
}

export default ItemDetail
