import React from 'react'
import { UserData } from '../../../Helper/Type'

function MyProfile({ userData }: any) {
  return (
    <>
      <div>{userData.fullName}</div>
      <div>{userData.phone}</div>
      <div>{userData.email}</div>
    </>
  )
}

export default MyProfile