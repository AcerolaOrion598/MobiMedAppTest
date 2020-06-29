import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import 'intl'
import 'intl/locale-data/jsonp/ru'
import globalStyles from '../Styles'

export class CurrentDateTime extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            curDate: '',
            curTime: ''
        }
    }

    componentDidMount = () => {
        setInterval(() => {
            let dateTime = new Date()
            let formatter = Intl.DateTimeFormat('ru', {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            })
            let localDateTime = formatter.format(dateTime)
            let ind = localDateTime.indexOf(',')
            let date = localDateTime.slice(0, ind)
            let time = localDateTime.slice(ind + 2, localDateTime.length)
            this.setState({
                curDate: date,
                curTime: time
            })
        }, 1000)
    }

    render() {
        return (
            <View>
                <Text style = {[globalStyles.text, styles.time]}>{this.state.curTime}</Text>
                <Text style = {[globalStyles.text, styles.date]}>{this.state.curDate}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    time: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})