import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItems from "../Components/ListingItems";

const Home = () => {
    // pt oferte
    const [listareOferta, setListareOferta] = useState(null);
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [filterData, setFilterData] = useState({
      address: "",
      minPrice: null,
      maxPrice: null,
      type: null,
    });
  
    // Function to fetch listings from Firestore
    const fetchListings = async () => {
      try {
        const listRef = collection(db, "listings");
        const q = query(listRef, orderBy("timestamp", "desc"), limit(7)); // Adjust limit as needed
        const querySnap = await getDocs(q);
        const fetchedListings = [];
        querySnap.forEach((doc) => {
          fetchedListings.push({ id: doc.id, data: doc.data() });
        });
        setListings(fetchedListings);
      } catch (error) {
        console.error(error);
      }
    };
    
    // Function to handle filter changes
    const handleFilterChange = (event) => {
      setFilterData({
        ...filterData,
        [event.target.name]: event.target.value,
      });
    };
    
    // Function to apply filters
    const applyFilters = () => {
      const filtered = listings.filter((listing) => {
        const { address, minPrice, maxPrice, type } = filterData;
        let addressMatch = true; // Assuming address is a string field in listing.data
    
        if (address) {
          addressMatch = listing.data.adresa.toLowerCase().includes(address.toLowerCase()); // Changed to adresa
        }
    
        let priceMatch = true; // Assume price matches by default

        // Check if minPrice filter is provided and compare with minPrice
        if (minPrice !== null && listing.data.pretNormal < parseInt(minPrice)) {
          priceMatch = false;
        }
    
        // Check if maxPrice filter is provided and compare with maxPrice
        if (maxPrice !== null && listing.data.pretNormal > parseInt(maxPrice)) {
          priceMatch = false;
        }
    
        return addressMatch && priceMatch; // Filter based on address and price criteria
      });
    
      setFilteredListings(filtered);
    };
    
    // Function to clear filters
    const clearFilters = () => {
      setFilterData({ address: "", minPrice: null, maxPrice: null, type: null });
      setFilteredListings([]); // Reset filtered listings
    };
    
    // Fetch listings on component mount
    useEffect(() => {
      fetchListings();
    }, []);
    
  

    useEffect(() => {
      async function fetchListings() {
        try{
          ///get reference
          const listRef = collection(db, "listings")
          //fa query sa iei datele din firebase
          const q = query(listRef, where("oferta", "==" , true),orderBy("timestamp", "desc"), limit(3));
          // 
          const querySnap = await getDocs(q);
          const listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),

            })
          })
          setListareOferta(listings)
          
        }
        catch(error) {
          console.log(error);
        }
      }
      fetchListings();
    }, [])

    const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(3)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);
  // Places for rent
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(3)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchListings();
  }, []);

  return (

    <div>
      <Slider/>

      <div className="flex justify-center items-center mt-7">
  <div className="filter-container flex space-x-4 items-center">
    <input
      type="text"
      name="address"
      placeholder="Filtrare după adresă"
      value={filterData.address}
      onChange={handleFilterChange}
      className="filter-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <input
      type="number"
      name="minPrice"
      placeholder="Preț minim"
      value={filterData.minPrice}
      onChange={handleFilterChange}
      className="filter-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <input
      type="number"
      name="maxPrice"
      placeholder="Preț maxim"
      value={filterData.maxPrice}
      onChange={handleFilterChange}
      className="filter-input px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
    <button onClick={applyFilters} className="filter-button px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
      Aplică filtre
    </button>
    <button onClick={clearFilters} className="filter-button px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
  Șterge filtre
</button>
  </div>
</div>


{filteredListings.length > 0 && (
  <div className="filtered-results flex justify-center mt-4">
  <div className="max-w-6xl w-full">
    <h2 className="filtered-results-heading text-2xl font-bold mb-4">Rezultate filtrate</h2>
    
    <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredListings.map((listing) => (
        <ListingItems key={listing.id} listing={listing.data} id={listing.id} />
      ))}
    </ul>
  </div>
</div>
)}



      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {listareOferta && listareOferta.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Oferte recente</h2>
            <Link to ="/offers">
              <p className="px-3 text-sm text-blue-500 hover:text-blue-700">Arata mai multe oferte</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listareOferta.map((listing)=>(
                <ListingItems key={listing.id} listing={listing.data} id = {listing.id}/>

              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Proprietati de inchiriat
            </h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Mai multe proprietati de inchiriat
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {rentListings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Locuinte de vanzare
            </h2>
            <Link to="/category/sale">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Mai multe proprietati de vanzare
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {saleListings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
  )

};
 


export default Home;
