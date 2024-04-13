
import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import {
    EffectFade,
    Autoplay,
    Navigation,
    Pagination,
  } from "swiper/modules";
  import "swiper/css/bundle";
import { useNavigate } from "react-router";
export default function Slider() {
    const navigate = useNavigate();
    const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination])
  useEffect(() => {
    async function fetchListings() {
        
      const listingRef = collection(db, "listings")
      const q = query(listingRef, orderBy("timestamp", "desc"),limit(5)) //afiseaza ultima oferta creata prima pe site
      const querySnap = await getDocs(q);
      let listings =[];
      querySnap.forEach((doc)=> {
        return listings.push({
          id: doc.id,
          data: doc.data(),

        })
      })
      setListings(listings);
      setLoading(false);
    }
    fetchListings()

  },[]);

  if(loading) {
    return <Spinner />;
  }

  if(listings.length === 0 ) {
    return <></>; // nu avem nicio oferta in db, e gen cand returnam aplicatia clientlui , i-o dam goala
  }
  return (
    listings && (
    <>
      <Swiper
        slidesPerView={1} navigation pagination={{type: 'bullets'}} effect="fade" modules={{EffectFade}} autoplay={{delay: 3000}}
      >
      {listings.map(({data, id})=> (
            <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
                <div style={{background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: 'cover'}  } 
                className=" relative w-full h-[300px] overflow-hidden">

                </div>
            <p className="text-white absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.titlu}</p>
            <p className="text-white absolute left-1 bottom-1 font-semibold max-w-[90%] bg-green-600 shadow-lg opacity-90 p-2 rounded-tr-3xl">{data.pretDiscount ?? data.pretNormal} 
            {data.type === "rent" ? " € / Luna" : "€"}
            
            </p>
            </SwiperSlide>
        ))}
      </Swiper>
    </>
    )
  )
}
