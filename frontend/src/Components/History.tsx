
import {useDispatch,useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { RootState } from '../redux/store'
const History = () => {
  
    const user=useSelector((store:RootState)=>store.authReducer.user)
    console.log(user._id);


    const [data, setData] = useState<any>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://hacksquad-api.onrender.com/history/64f23246c5cd72aa0ab6ec28');
          if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData);
            console.log(data);
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div>
    {/* Render your component content here */}
    {data?.length > 0 ? (
      <div>
        <h1>Data from API:</h1>
        <ul>
          {data.map((item: any, index: number) => (
            <li key={index}><span className='mr-2'>{index+1}</span>:{item.body}</li>
          ))}
        </ul>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  )
}

export default History