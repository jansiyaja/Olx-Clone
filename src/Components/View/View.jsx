import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { postContext } from '../../Context/PostContext';
import { collection, getFirestore, where, query, getDocs } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(postContext); 
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails){
console.log(postDetails);
      }
      
      const userId = postDetails.userId; 
      
      const db = getFirestore();
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where("uid", "==", userId));
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.size === 0) {
        console.error('No matching documents found for the given userId:', userId);
        return;
      }
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUserDetails(userData);
      });
    };

    fetchUserDetails();
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl || 'default-image-url.jpg'}
          alt={postDetails?.name || 'Product Image'}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails?.price}</p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{}</span> 
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username || 'No name'}</p>
          <p>{userDetails?.phone || 'No phone'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
