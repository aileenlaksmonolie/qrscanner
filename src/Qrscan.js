import React, { useState } from 'react';
import QrReader from "react-web-qr-reader";
// import {QrReader} from "react-qr-reader";
import axios from 'axios';
import styles from './Qrscan.module.css';

const Qrscan = () => {

	const [result, setResult] = useState("");
	const [loading, setLoading] = useState('');
	const [APIResult, setAPIResult] = useState('');

	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = (result) => {
		if(result!==""){
            setLoading("Loading....");
            setAPIResult("");
            setResult(result.data);
            axios.post(`https://icnmusical.com/api/scanner/check_in`, { "encrypted_ticket_item_id":result.data })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.result===false){
                    setLoading("done!");
                    setAPIResult(res.data.result.toString() + ", "+ res.data.error_message.toString());
                }else{
                    setLoading("done!");
                    setAPIResult(res.data.result.toString() + ", checked in");
                }
            })
            setResult("");
		}
	}

	const previewStyle = {
		height: 240,
		width: 320,
	}

	return (
		<div className={styles.container}>
			{(loading==="done!" || loading==="") && <QrReader
			delay={500}
			style={previewStyle}
			onError={handleError}
			onScan={handleScan}
			/>}
			<div className={styles.result}>scanning status: {loading}</div>	
			<div className={styles.result}>checkin status: {APIResult}</div>	
		</div>
	);
}

export default Qrscan;