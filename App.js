import React, {Component} from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {Main} from './components/Main'
import globalStyles from './Styles'
import {fetchWithTimeout} from './Networking'

const UID = '14fe7a5c53f38084'
// const BASE_URL = 'http://skolkovo.mobimed.ru:3010/'
const BASE_URL = 'http://ruslanshah.no-ip.org:3002/'
const DEVICE_ROOT = 'registerDeviceUID/'
const CABINET_ROOT = 'getCabinet/'
let interval
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: 0,
      planState: 0,
      plan: [],
      doctorId: 0,
      errorNum: 0,
      cabinetId: 0,
      isSuccessful: false,
      isLoading: true      
    }
  }

  componentDidMount = () => {
    this.requestDeviceData()
    setInterval(this.requestDeviceData, 60000)
  }

  requestDeviceData = () => {
    fetchWithTimeout(10000, fetch(BASE_URL + DEVICE_ROOT + UID)) 
    .then(deviceResponse => deviceResponse.json())
    .then(deviceData => {
      this.setState({errorNum: 0})
      if (!interval) {
        interval = setInterval(this.requestCabinet, 5000)
      }
      this.setState({cabinetId: deviceData.cabinet_id})
      this.requestCabinet()
    })
    .catch(() => {
      let e = this.state.errorNum
      this.setState({
        errorNum: ++e,
        isLoading: false,
      })
    })
  }
  
  requestCabinet = () => {
    fetchWithTimeout(4000, fetch(BASE_URL + CABINET_ROOT + this.state.cabinetId))
    .then(cabinetResponse => {
      return cabinetResponse.json()
    })
    .then(cabinetData => {
      this.setState({
        errorNum: 0,
        code: cabinetData.code,
        planState: cabinetData.state,
        plan: cabinetData.plan,
        doctorId: cabinetData.doctor_id,
        isSuccessful: true
      })
    })
    .catch(() => {
      let e = this.state.errorNum
      this.setState({
        errorNum: ++e,
        isSuccessful: false
      })
    })
    .finally(() => {
      this.setState({isLoading: false})
    })
  }

  render() {
    return (
      <View style = {globalStyles.container}>
      {      
        this.state.isLoading ? <ActivityIndicator/> : this.state.isSuccessful ? (
          <Main
            baseUrl = {BASE_URL}
            code = {this.state.code}
            plan = {this.state.plan}
            state = {this.state.planState}
            doctorId = {this.state.doctorId}
          />
        ) : <Text style = {styles.error}>Ошибка соединения {this.state.errorNum}</Text>
      }
    </View>
    )
  } 
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center'
  }
})
