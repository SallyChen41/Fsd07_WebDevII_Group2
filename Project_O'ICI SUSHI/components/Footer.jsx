import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import styles from '../styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: 45.508888,
    lng: -73.561668,
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>LOCATIONS</h1>
          <p className={styles.text}>
            1654 R. Don Road
            <br /> Montréal, H1A 1H1
            <br /> (438) 867-1010
          </p>
          <p className={styles.text}>
            2356 K. Laquie Rd
            <br /> Montréal, H1A 1H1
            <br /> (512) 867-1011
          </p>
          <p className={styles.text}>
            1614 E. Erwin St
            <br /> Montréal, H1A 1H1
            <br /> (438) 867-1012
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>OPENING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 11:00 – 21:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 11:00 – 22:00
          </p>
          <br />
        </div>
      </div>

      <div className={styles.item}>
        <LoadScript googleMapsApiKey="AIzaSyA3EUaQYk2Gk2xgp0KayLaL7OEnjafXlz8">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  )
}

export default Footer
