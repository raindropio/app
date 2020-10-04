/*
    Old legacy deprecated bookmarklet route /bookmarklet/1.0/#/?link=
*/
import React from 'react'
import { Redirect } from 'react-router-dom'

export default function({ location: { hash } }) {
    return <Redirect to={'/add'+hash.replace(/^#/, '')} />
}