import React, {useState, useEffect, useContext, } from 'react';
import { } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { collection,getFirestore,getDocs } from 'firebase/firestore';
import { postContext } from '../../Context/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
const[products,setProducts]=useState([]);
const {setPostDetails}=useContext(postContext)
const navigate=useNavigate()

useEffect(() => {
  const db = getFirestore();
  const productsCollectionRef = collection(db, 'products'); // Reference to the 'products' collection in Firestore

  const getProducts = async () => {
    const productsSnapshot = await getDocs(productsCollectionRef);
    const productsData = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    setProducts(productsData);
  };

  getProducts();
}, []);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map(product => (
          <div
            className="card"
            onClick={()=>{setPostDetails(product)
              navigate('/view')

            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name">{product.name}</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
            ))}
        </div>
      </div>
      
    </div>
  );
}

export default Posts;
