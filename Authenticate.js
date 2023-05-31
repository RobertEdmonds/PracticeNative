import {useState, useEffect} from 'react'
import { Button, SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native'

export default function Authenticate({handleLogout}){
    const [ sites, setSites ] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/mobile_sites')
        .then(resp => resp.json().then(site => {
            setSites(site)
        }))
    },[setSites])
    console.log(sites)

    return(
        <>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sites}
                // renderItem={({item}) => <Item title={item.title} />}
                // keyExtractor={item => item.id}
            />
        </SafeAreaView>
        <Button
        title="Press me"
        onPress={() => handleLogout()}
        />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
})