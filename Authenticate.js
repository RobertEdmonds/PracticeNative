import {useState, useEffect} from 'react'
import { Button, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    StatusBar, 
    View, 
    Text,
    SectionList } from 'react-native'
import { Header } from 'react-native-elements'
import { Left, Right, Icon, useTheme } from 'native-base';
import { renderNode } from 'react-native-elements/dist/helpers';

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
        <SafeAreaView >
             <ScrollView style={styles.scrollView}>
                {sites.filter(site => !site.completed).map(site => {
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
                })}
                {sites.filter(site => site.completed).map(site => {
                    const siteDate = site.start_date.split("-")
                    return(
                        <View style={styles.completed_container} key={site.id}>
                            <Text style={styles.completed_title_text}>{site.location}</Text>
                            <Text style={styles.completed_title_text}>{site.crew}</Text>
                            <Text style={styles.completed_title_text}>{siteDate[1]}/{siteDate[2]}/{siteDate[0]}</Text>
                        </View>
                    )
                })}
             </ScrollView>
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
      backgroundColor: 'rgb(21, 75, 126)',
      alignItems: 'center',
      marginBottom: 4,
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
    completed_container: {
        flex: 1,
        backgroundColor: 'tan',
        alignItems: 'center',
        marginBottom: 2,
        justifyContent: 'center',
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
    completed_title_text: {
        fontSize: 32,
        color: "black",
        fontWeight: "bold"
      },

})