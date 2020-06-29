import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {Patient} from './Patient'
import {Doctor} from './Doctor'
import {CurrentDateTime} from './CurrentDateTime'
import globalStyles from '../Styles'

const States = ["Входите", "Ожидайте", "Нет приёма", "Идёт приём"]

export const Main = props => {
    return (
        <View style = {[styles.container, backgroundStyles[props.state - 1].container]}>
            <View>
                <View style = {styles.header}>
                    <Text style = {[styles.cab, globalStyles.text]}>{"Кабинет " + props.code}</Text>
                    <CurrentDateTime/>
                </View>
                <Doctor doctorId = {props.doctorId} baseUrl = {props.baseUrl}/>
            </View>
            <Text style = {[styles.stateText, globalStyles.text]}>{States[props.state - 1]}</Text>        
            <Patient plan = {props.plan}/>
        </View>
    )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  }, 
  cab: {
      fontSize: 30,
  },
  stateText: {
      fontSize: 60,
      textAlign: 'center',
      fontWeight: 'bold'
  },
  container: {
      padding: 30,
      flex: 1,
      justifyContent: 'space-between',
      
  }
})

const backgroundStyles = [
    StyleSheet.create({
      container: {
        backgroundColor: '#6abf69'
      }
    }),
    
    StyleSheet.create({
      container: {
        backgroundColor: '#63a4ff'
      }
    }),
    StyleSheet.create({
      container: {
        backgroundColor: '#d84315'
      }
    }),
    StyleSheet.create({
      container: {
        backgroundColor: '#f57f17'
      }
    }),
  ]
  
