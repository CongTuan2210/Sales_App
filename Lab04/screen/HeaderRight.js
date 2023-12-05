import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'

const HeaderRight = ({onPress}) => {
  return (  
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.btn}
            onPress={onPress}
        >
            <Icon
                name='check'
                size={25}
                style={styles.icon}
            />
        </TouchableOpacity>
    </View>
  )
}

export default HeaderRight

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        width: 'auto',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: '#000',
    }
})