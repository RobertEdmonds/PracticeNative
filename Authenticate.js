import {useState, useEffect, useRef} from 'react'
import { Button, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    StatusBar, 
    View, 
    Text,
    TextInput, 
    FlatList} from 'react-native'
import { Header } from 'react-native-elements'
import { Left, Right, Icon, useTheme } from 'native-base';
import { renderNode } from 'react-native-elements/dist/helpers';
import Footer from './Footer';

export default function Authenticate({handleLogout}){
    const [ sites, setSites ] = useState([])
    const [ allSites, setAllSites] = useState([])
    const [ completed, setCompleted ] = useState(false)

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/mobile_sites')
        .then(resp => resp.json().then(site => {
            setAllSites(site)
            setSites(site)
        }))
    },[setSites])

    const handleSearch = (value) => {
        const searchSite = allSites.filter(site => {
            return(site.location.toUpperCase().includes(value.toUpperCase()) || site.crew.toUpperCase().includes(value.toUpperCase()))
        })
        setSites(searchSite)
    }

    return(
        <>
        <Header style={styles.container}>
            <View style={styles.header_button}>
            <Button
            onPress={() => setCompleted(!completed)}
            title={completed ? "Completed" : "Active"}
            color="white"
            backgroundColor={completed ? "tan" : "rgb(21, 75, 126)"}
            accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <TextInput placeholder="Search" 
            style={styles.text_input} 
            editable={true} 
            onChangeText={text => handleSearch(text)}/>
            <View style={styles.header_button}>
          <Button
            title="Logout"
            color="white"
            style={styles.header_button}
            onPress={() => handleLogout()}
          />
          </View>
        </Header> 
        <SafeAreaView style={styles.safe_view}>
        <View style={styles.qr_button}>
              <Button title='QR Code Reader' color="white" style={styles.bottom_button} onPress={(e) => console.log(e)} />
            </View>
             <ScrollView contentContainerStyle={styles.scroll_view}>
            {completed ? (
                sites.filter(site => site.completed).map(site => {
                    const siteDate = site.start_date.split("-")
                    return(
                        <View style={styles.completed_container} key={site.id}>
                            <Text style={styles.completed_title_text}>{site.location}</Text>
                            <Text style={styles.completed_title_text}>{site.crew}</Text>
                            <Text style={styles.completed_title_text}>{siteDate[1]}/{siteDate[2]}/{siteDate[0]}</Text>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Total Sand On-Site</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.total_on_site).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Total Sand Used</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.total_sand_used).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Total Sand Delivered</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.total_delivered).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>Trash Sand</Text>
                            </View>
                            <View style={styles.info_complete_container}>
                                <Text style={styles.info_complete_text}>{(site.trash_sand).toLocaleString("en-US")}</Text>
                            </View>
                        </View>
                    )
                })
            ) : (
                sites.filter(site => !site.completed).reverse().map(site => {
                    const siteDate = site.start_date.split("-")
                    return(
                        <View style={styles.container} key={site.id}>
                            <Text style={styles.title_text}>{site.location}</Text>
                            <Text style={styles.title_text}>{site.crew}</Text>
                            <Text style={styles.title_text}>{siteDate[1]}/{siteDate[2]}/{siteDate[0]}</Text>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Total Sand On-Site</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.total_on_site).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Total Sand Used</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.total_sand_used).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Total Sand Delivered</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.total_delivered).toLocaleString("en-US")}</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>Trash Sand</Text>
                            </View>
                            <View style={styles.info_container}>
                                <Text style={styles.info_text}>{(site.trash_sand).toLocaleString("en-US")}</Text>
                            </View>
                        </View>
                    )
                })
            )}
            </ScrollView>
        </SafeAreaView>
        
        </>
    )
}

const styles = StyleSheet.create({
    safe_view: {
        backgroundColor: 'rgb(45, 45, 45)',
        height: "100%",
    },
    scroll_view:{
        flexGrow: 10,
        padding: 10,
        paddingBottom: 150,
    },
    container: {
      flex: 1,
      backgroundColor: 'rgb(21, 75, 126)',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent: 'center',
      marginTop: StatusBar.currentHeight || 0,
    },
    info_container: {
        flex: 1,
        backgroundColor: 'rgb(21, 75, 126)',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        marginTop: StatusBar.currentHeight || 0,
      },
    text_input:{
        marginTop: StatusBar.currentHeight || 12,
        width: 100,
        height: 35,
        padding: 5,
        backgroundColor: "white",
    }, 
    header_button:{
        marginTop: StatusBar.currentHeight || 12,
        width: 110,
        backgroundColor: "rgb(21, 75, 126)",
    },
    completed_container: {
        flex: 1,
        backgroundColor: 'tan',
        alignItems: 'center',
        marginBottom: 2,
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
      },
      info_complete_container: {
        flex: 1,
        backgroundColor: 'tan',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: "black",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        marginTop: StatusBar.currentHeight || 0,
      },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title_text: {
      fontSize: 32,
      color: "white",
      fontWeight: "bold"
    },
    info_text: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        
      },
      info_complete_text: {
        fontSize: 16,
        fontWeight: "bold",
        
      },
    completed_title_text: {
        fontSize: 32,
        color: "black",
        fontWeight: "bold"
      },
      qr_button:{
        flexGrow: 1,
        justifyContent: 'flex-bottom',
        marginBottom: 5,
        marginTop: 10,
        borderRadius: 25,
        width: "100%",
        position: 'fixed',
        backgroundColor: "rgb(21, 75, 126)",
    },
    bottom_button:{
        position: 'fixed',
        bottom:0
    },
})