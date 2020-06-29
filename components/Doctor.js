import React, {Component} from 'react'
import {ActivityIndicator, View, Text, Image, StyleSheet} from 'react-native'
import globalStyles from '../Styles'
import {fetchWithTimeout} from '../Networking'

const DOCTOR_ROOT = 'getDoctor/'

export let doctorInstance

export class Doctor extends Component {
   
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      surname: '',
      spec: '',
      photo: '',
      isLoading: true,
      doctorId: props.doctorId,
    }
    doctorInstance = this
    this.baseUrl = props.baseUrl
  }
  
  requestDoctor = () => {
    fetchWithTimeout(4000, fetch(this.baseUrl + DOCTOR_ROOT + this.state.doctorId)) 
    .then((doctorResponse) => doctorResponse.json())
    .then((doctorData) => {
      this.setState({
        name: doctorData.name,
        surname: doctorData.surname,
        spec: doctorData.spec,
        photo: doctorData.photo,
        isLoading: false
      })
    })
  }

  componentDidMount = ()  => {
    this.requestDoctor()
  }

  render() {
    function hexToBase64(hexstring) {
      return Base64.btoa(hexstring.match(/\w{2}/g).map(function(a) {
          return String.fromCharCode(parseInt(a, 16));
      }).join(""));
    }

    if (this.state.isLoading) {
      return (<ActivityIndicator/>)
    }
    return (
      <View style = {styles.container}>
          <Image style = {styles.photo} source = {{uri: `data:image/png;base64,${hexToBase64(this.state.photo)}`}}/>
          <Text style = {[styles.docText, globalStyles.text]}>{'Приём ведёт: ' + this.state.spec}</Text>
          <Text style = {[styles.docName, styles.docText, globalStyles.text]}>{this.state.name + ' ' + this.state.surname}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center'
    },
    photo: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginBottom: 20
    },
    docText: {
        fontSize: 20
    },
    docName: {
      fontWeight: 'bold'
    }
})

// Вспомогательная функция для конвертации hex в base64: https://snack.expo.io/BktW0xdje
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input = '')  => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3/4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      
      block = block << 8 | charCode;
    }
    
    return output;
  },

  atob: (input = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};