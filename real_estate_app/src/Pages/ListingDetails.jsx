import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { db } from '../firebase';
import { list } from 'firebase/storage';
import Spinner from '../Components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from 'swiper';
import { FaShare } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { LuParkingSquare } from "react-icons/lu";
import { FcFilingCabinet } from "react-icons/fc";
import {getAuth} from "firebase/auth";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css/bundle";
import Contact from '../Components/Contact';
export default function ListingDetails() {

    SwiperCore.use([Autoplay, Navigation, Pagination])
    const auth = getAuth();
    const params = useParams();
    const [listing, setListing]= useState(null);
    const [loading, setLoading]= useState(true);
    const [modalImage, setModalImage] = useState(null);
    const [shareLinkCopy, setShareLinkCopy] = useState(false)
    const [contactProprietar, setContactProprietar] = useState(false)
    useEffect(() => {
        async function fetchListing() {
            const docRef = doc(db, "listings", params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()) {
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing();
        
    }, [params.listingId])
    if(loading) {
        return <Spinner/>
    }

    const ListingDetails = ({ listing }) => {
        const images = listing.imgUrls.map((url, index) => ({
          original: url,
          thumbnail: url, // Poți folosi aceeași imagine pentru thumbnail sau să specifici altă imagine
          thumbnailClass: 'thumbnail', // Adaugă o clasă CSS pentru a stiliza thumbnail-ul
        }));
    }

    

  const images = listing.imgUrls.map((url, index) => ({
    original: url,
    thumbnail: url,
  }));

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };
      
  return (
    
    <main>
       <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect='fade'
        autoplay="300ms"
        style={{ height: "300px", width: "60%", overflowX: "scroll", marginBottom: "20px" }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index} style={{ width: "100%", height: "100%", marginRight: "10px" }}>
            <div
              className='relative w-full h-full overflow-hidden cursor-pointer'
              style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: "cover" }}
              onClick={() => openModal(listing.imgUrls[index])}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {modalImage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-white text-xl focus:outline-none">&times;</button>
            <img src={modalImage} alt="Modal" className="mx-auto max-w-full max-h-full" />
          </div>
        </div>
      )}


      <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 justify-center flex items-center' 
       onClick={() => {
                    navigator.clipboard.writeText(window.location.href) // copy link of current root
                    setShareLinkCopy(true)
                    setTimeout(() => {
                        setShareLinkCopy(false);
                    }, 2000)
                }} >
      <FaShare className='text-lg text-slate-500'/>
      </div>

      {shareLinkCopy && <p className='fixed top-[20%] right-7 font-semibold border-2 border-gray-400 z-10 bg-white rounded-sm '>Link copiat</p>}

      <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>
        <div className=' w-full '> 
            <p className='text-xl font-bold mb-3 text-black'>
                {listing.titlu} - €{listing.oferta ? listing.pretDiscount.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.pretNormal.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") } 
                  {listing.type === "rent" ? " / Luna " : ""}
            </p>
            <p className='flex items-center mt-6 mb-3 font-semibold'>
            <FaMapLocationDot className='text-red-700 mr-1'/>
                {listing.adresa}
            </p>
            <div className='flex justify-start items-center space-x-4 w-[75%]'>
                <p className='bg-red-600 w-full max-w-[200px] p-1 text-white text-center font-semibold'>
                    {listing.type === 'rent' ? "Inchiriere" : "Vanzare"}
                </p>
                {listing.oferta && (
                    <p className='w-full max-w-[200px] bg-green-600 text-white p-1 text-center font-semibold'>€{listing.pretNormal - listing.pretDiscount} Reducere</p>
                )}
            </div>
            <p className='mt-3 mb-3'>
                Descriere - <span className='font-semibold'>{listing.descriere}</span>
            </p>
            <ul className='mb-5 flex items-center space-x-2 lg:space-x-10 text-sm font-semibold'>
                <li className='flex items-center whitespace-nowrap'>
                <IoBed className='text-lg mr-1'/>
                    {+listing.camere > 1 ? `${listing.camere}Camere` : 'O camera'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                <FaBath className='text-lg mr-1'/>
                    {+listing.bai > 1 ? `${listing.bai}Bai` : 'O Baie'}
                </li>
                <li className='flex items-center whitespace-nowrap'>
                <LuParkingSquare  className='text-lg mr-1'/>
                    {listing.parcare ? "Loc parcare inclus" : "Fara loc de parcare"}
                </li>
               
                <li className='flex items-center whitespace-nowrap'>
                <FcFilingCabinet  className='text-lg mr-1'/>
                    {listing.mobilat ? "Mobilat" : "Nemobilat"}
                </li>
            </ul>
            {listing.userRef !== auth.currentUser?.uid && !contactProprietar && (
                <div className='mt-6'>
                <button onClick= {()=>setContactProprietar(true)} className='px-6 py-3 bg-blue-500 text-white font-medium text-sm uppercase rounded shadow-md
                hover:bg-blue-600 hover:shadow-lg w-full text-center'>Contacteaza proprietarul</button>
                </div>
            )}
            {contactProprietar && (<Contact userRef={listing.userRef} listing = {listing}/>)}
           
        </div>
        <div className='w-full md:h-[400px] h-[200px] overflow-x-hidden z-10 mt-6 lg:mt-0 md:ml-2'>

        <MapContainer center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false}
            style={{height: " 100% ", width: "100%"}}
        >
            <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
            <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>

        </div>
      </div>
    </main>
  )
}
