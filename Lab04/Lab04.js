import React from 'react'
import MainNavigator from './screen/MainNavigator'
import { AuthProvider } from './context/AuthContext'
import { UserDataProvider } from './context/AuthUserContext'

const Lab04 = () => {
  return (
    <AuthProvider>
      {/* <UserDataProvider> */}
        <MainNavigator/>
      {/* </UserDataProvider> */}
    </AuthProvider>
  )
}

export default Lab04