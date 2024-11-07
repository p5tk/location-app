import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}/>
      <TextInput style={styles.input} />
      <Button title='Login' />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: '100%'
    }
})