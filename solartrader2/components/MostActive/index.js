import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMostActive } from '../../store/actions'

import List from '../List'

class MostActive extends Component {
  onRefresh = () => this.props.getMostActive()

  componentDidMount() {
    this.props.getMostActive()
  }

  render() {
    const { data, latestUpdate, loading } = this.props.mostActive

    return (
      <List
        headerTitle="Most Active"
        latestUpdate={latestUpdate}
        loading={loading}
        list={data}
        onRefresh={this.onRefresh}
      />
    )
  }
}

const mapStateToProps = state => ({
  mostActive: state.mostActive
})

const mapDispatchToProps = {
  getMostActive
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MostActive)
