import React, { useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useAuth } from '../../Context/AuthContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage,db } from '../../../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      console.log(imageUrl);

      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: new Date()
      });

     navigate('/')
     
      setName('');
      setCategory('');
      setPrice('');
      setImage(null);

      console.log('Product uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image and saving data:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button type="submit" className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
