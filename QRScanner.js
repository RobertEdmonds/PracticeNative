import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

class QRScanner extends Component {
  onSuccess = (e) => {
    alert(`Scanned QR code data: ${e.data}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={this.onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text style={styles.centerText}>
              Scan the QR code
            </Text>
          }
          bottomContent={
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 48,
    padding: 16,
    backgroundColor: '#00000080',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default QRScanner;
