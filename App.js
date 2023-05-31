// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Button, Alert, View, StatusBar } from 'react-native';
import Authenticate from './Authenticate';
import Login from './Login';

export default function App() {
  const [ user, setUser ] = useState(null)
  const [ companyUser, setCompanyUser ] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, [setUser]);

  useEffect(() => {
      fetch('http://127.0.0.1:3000/api/company_personnel')
      .then(resp => {
        if(resp.ok) {
          resp.json().then(user => setCompanyUser(user))
        }
      })
  },[setCompanyUser])

  function handleLogout() {
    fetch("http://127.0.0.1:3000/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  } 
  // Alert.alert('Simple Button pressed')
  return (
    <>
    <StatusBar
        backgroundColor="rgb(45, 45, 45)" 
        barStyle="light-content"
      />
    {user && (
      <View style={styles.view}>
        <Authenticate handleLogout={handleLogout} />
      </View>
    )}
    {companyUser &&  (
      <View style={styles.view}>

      </View>
    )}
    {user === null && companyUser === null && (
      <View style={styles.container}>
        <Login setUser={setUser} setCompanyUser={setCompanyUser}/>
      </View>
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(45, 45, 45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: 'rgb(45, 45, 45)',
  }
});
