import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [usersOnline, setUsersOnline] = useState([]);
  const fetchUserIds = async () => {
    return ["john.smith", "sara.lee", "jack.ma"];
  };

  const checkStatus = async (userId) => {
    return Math.random() > 0.8
      ? { status: "offline", id: userId }
      : { status: "online", id: userId };
  };

  const sendEmail = async (userId) => {
    // return if it was sucessfull or not
    return Math.random() > 0.1 ? true : false;
  };

  /*
    Question 1: 
    Find all online users and send them emails. Render the users for which the emails were successfully sent

    Step 1: Load users
    Step 2: Check users online
    Step 3: Send email for whom are online
    Step 4: Render those which the email was successfully sent
  
  */

 const fetchUsersOnlineAndSendEmail = async () => {
    const usersIds = await fetchUserIds();
    
    const users = usersIds.map(async (id) => {
      const user = await checkStatus(id);
      const getUserOnline = user.status === 'online' && user; 
      console.log(getUserOnline)
      return getUserOnline;
    });

   const usersAlreadySentEmail = await Promise.all(users.filter(async (user) => {
     await sendEmail(user.id);
     return user;
   }));
   
   setUsersOnline(usersAlreadySentEmail);
 };

  useEffect(() => {
    fetchUsersOnlineAndSendEmail();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          All online users that introductions were sucessfully sent
          <ul>
            {usersOnline.map((user) => user && (
              <li key={user.id}>{user.id} - {user.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
