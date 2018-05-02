import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import Home from './Home'

class BooksApp extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/search' component={SearchBooks} />
      </Switch>
    )
  }
}

export default BooksApp;