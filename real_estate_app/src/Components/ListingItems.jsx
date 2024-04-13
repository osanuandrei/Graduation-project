import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export default function ListingItems({listing,id, onEdit, onDelete }) {
  return (
    <li className='bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden
                    transition-shadow duration-200 relative m-[10px]'>
        
        <Link className='contents' to={`/category/${listing.type}/${id}`}>   {/*after we click on Offer's image ,we will redirect to a unique URL for each offer*/}
            <img className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading='lazy' src={listing.imgUrls[0]}/>
            <Moment className='absolute top-2 left-2 bg-[#3377cc] text-white text-xs font-semibold rounded-md px-2 py-1 shadow-lg' fromNow>
                {listing.timestamp?.toDate()}
            </Moment>
            <div className='w-full p-[10px]'>
                <div className='flex items-center space-x-1'>

            
                <MdLocationOn className='h-4 w-4 text-red-600'/>
                <p className='font-semibold text-sm mb-[2px] text-gray-500 truncate'>
                    {listing.adresa}
                </p>
                </div>
                <p className='font-semibold m-0 text-xl truncate'>{listing.titlu}</p>
                <p className='text-[#457b9d] mt-2 font-semibold'>€ {listing.offer
              ? listing.pretDiscount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // this is to format the price with commas
              : listing.pretNormal
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Luna"}
            </p>
            
            <div className='flex items-center mt-[10px] space-x-3'>
                <div className='flex items-center space-x-1'>
                    <p className='font-bold text-xs'>
                        {listing.camere > 1 ? `${listing.camere} Camere` : "O camera"} {/* ia nr de camere in caz ca sunt mai multe scrie Camere in caz contrar scrie o camera*/}
                    </p>
                </div>
                <div>
                    <p className='font-bold text-xs'>
                        {listing.bai > 1 ? `${listing.bai} Bai` : '1 Baie'}
                    </p>
                </div>
            </div>
            </div>
        </Link>
        {onDelete && (
            <FaTrash className='absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500' onClick={()=>onDelete(listing.id)}/>
        )
        }
       {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer "
          onClick={() => onEdit(listing.id)}
        />
      )}

    </li>
  )
}
