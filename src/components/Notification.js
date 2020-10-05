import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactNotificationsSystem from 'react-notification-system-redux'
import {enumType} from '../constants'

class Notification extends Component {
  render() {
    const {notifications} = this.props
    let alert = []
    if (notifications && notifications.length > 0) {
      alert = notifications.map(x => {
        let titleImage = ''
        switch (x.level) {
          case enumType.notification.Success:
            titleImage = <img
              src={require('../img/success.png')}
              className="img-fluid mr-3"
              alt={'success'}
            />
            break
          case enumType.notification.Error:
            titleImage = <img
              src={require('../img/error-noti.png')}
              className="img-fluid mr-3"
              alt={'success'}
            />
            break
          case enumType.notification.Warning:
            titleImage = <img
              src={require('../img/warning.png')}
              className="img-fluid mr-3"
              alt={'success'}
            />
            break
          case enumType.notification.Info:
            titleImage = <img
              src={require('../img/info.png')}
              className="img-fluid mr-3"
              alt={'success'}
            />
            break
          default:
            titleImage = x.title
            break
        }
        return {
          ...x,
          title: titleImage,
          autoDismiss: 2
        }
      })
    }
    const style = {
      Containers: {
        DefaultStyle: {
          position: 'fixed',
          zIndex: 999999
        },
        tr: {
          top: '70px',
          right: '10px',
          bottom: 'auto',
          left: 'auto'
        }
      },
      NotificationItem: {
        DefaultStyle: {
          position: 'relative',
          overflow: 'hidden',
          margin: '0 0 6px',
          padding: '15px',
          width: '300px',
          borderRadius: '3px',
          backgroundPosition: '15px center',
          backgroundRepeat: 'no-repeat',
          boxShadow: '0 0 12px #000000',
          fontWeight: '400',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          color: '#ffffff',
          opacity: 0.8
        },
        success: {
          backgroundColor: '#51a351'
        },
        error: {
          backgroundColor: '#bd362f'
        },
        info: {
          backgroundColor: '#2f96b4'
        },
        warning: {
          backgroundColor: '#f89406'
        }
      },
      Dismiss: {
        DefaultStyle: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 1px 0 #fff',
          opacity: 0.8,
          backgroundColor: 'transparent',
          position: 'absolute',
          top: '0.4em',
          right: '0.5em'
        }
      }
    }
    return (
      <ReactNotificationsSystem
        notifications={alert}
        style={style}/>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications
})

export default connect(
  mapStateToProps,
  null
)(Notification)
