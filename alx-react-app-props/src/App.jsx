import ProfilePage from './components/ProfilePage';
import User from './components/UserContext';


function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (

    <UserContext.Provider>
      <ProfilePage userData={userData} />
      <UserContext.Provider value={userData} />
    </UserContext.Provider>
  )
    ;
}

export default App;