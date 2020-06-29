import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import globalStyles from '../Styles'

export const Patient = ({plan}) => {

    const items = []
    let plans = Object.values(plan)
    for (let i = 0; i < 5; i++) {
        if (plans[i] == undefined) {
            break
        }
        let consDate = plans[i].date_cons
        let ind = plans[i].date_cons.indexOf(' ')
        let consTime = consDate.slice(ind + 1, ind + 6)
        let itemStyle = plans[i].rank - 1
        items.push(<Text style = {[styles.mainItem, styles.item, globalStyles.text, itemStyles[itemStyle]]} key = {i}>{consTime + ' ' + plans[i].patient}</Text>)        
    }

    return (
        <View style = {styles.container}>
            <Text style = {[styles.title, globalStyles.text]}>Следующий пациент</Text>
            {items}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 120
    },
    title: {
        fontSize: 25
    },
    item: {
        fontSize: 16,
        marginTop: 10,
    },
    mainItem: {
        fontWeight: 'bold'
    }
})

const itemStyles = [
    StyleSheet.create({
        fontSize: 20,
        opacity: 1
    }),
    StyleSheet.create({
        marginStart: 15,
        opacity: 0.85
    }),
    StyleSheet.create({
        marginStart: 15,
        opacity: 0.65
    })
]
