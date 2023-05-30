
import { Button, SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native'

export default function Authenticate({handleLogout}){
    return(
        <>
        <SafeAreaView style={styles.container}>
            <FlatList
                // data={DATA}
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