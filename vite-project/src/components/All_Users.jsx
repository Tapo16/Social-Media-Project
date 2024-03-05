import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase.config'
import ConvertDateTime from './ConvertDateTime'
import Loader from './Loader'

const All_Users = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userQuery = query(collection(db, "users"), orderBy("timestamp", "desc"))

    const fetchData = async () => {
      await onSnapshot(userQuery, (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({
          ...doc.data(), id: doc.id
        }))
        );
        setLoading(false)
      });
    };
    fetchData();
    console.log(users)
  }, []);


  return (
    <>
      <div className="container">
        {loading ? <Loader/> : (
          <>
            {users.map((user) => {
              return (
                <>
                  <div className='text-center my-3 all_users_con'>

                    <div key={user.id} className="container all_users">
                      <img src={user.photoUrl} alt="" />
                      <h3>{user.name}</h3>
                      <h5>{user.email}</h5>
                    </div>
                    <ConvertDateTime text="Register Time:-" seconds={user.timestamp.seconds} nanoseconds={user.timestamp.nanoseconds} />
                  </div >
                </>
              );
            })}
          </>

        )}


      </div>
    </>
  )
}

export default All_Users