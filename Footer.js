import { Button, StyleSheet, StatusBar, View } from "react-native";

export default function Footer(){
    return(
        <View style={styles.qr_button}>
          <Button title='QR Code Reader' color="white"/>
        </View>
    )
}

const styles = StyleSheet.create({
    qr_button:{
        marginTop: StatusBar.currentHeight || 12,
        width: 110,
        backgroundColor: "rgb(21, 75, 126)",
    },
})