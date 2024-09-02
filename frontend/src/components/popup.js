import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { X } from 'lucide-react';
import React from 'react'
import './popup.css'


function Popup(props) {
    return (
        <Dialog open={props.open} maxWidth='md'>
            <DialogTitle className='diatitle'>
                <p>Consultation ID: {props.consult.consultation_id}</p>
                <button onClick={() => props.setopen(false)}><X /></button>
            </DialogTitle>
            <DialogContent>
                <p>Age: {props.consult.age}</p>
                <p>Sex: {props.consult.sex === '2' ? 'Male' : 'Female'}</p>
                <p>Arrival mode: {props.consult.arrival_mode === '1' ? 'Walking' : props.consult.arrival_mode === '2' ? '119 use' : props.consult.arrival_mode === '3' ? 'Private car' : props.consult.arrival_mode === '4' ? 'Private ambulance' : props.consult.arrival_mode === '5' ? 'Public transportation' : props.consult.arrival_mode === '6' ? 'Wheelchair' : 'Others'}</p>
                <p>Injury: {props.consult.injury === '1' ? 'Non-injury' : 'Injury'}</p>
                <p>Mental: {props.consult.mental_status === '1' ? 'Alert' : props.consult.mental_status === '2' ? 'Verval response' : props.consult.mental_status === '3' ? 'Pain response' : 'Unconciousness'}</p>
                <p>Pain: {props.consult.pain === '1' ? 'Pain' : 'Non-pain'}</p>
                <p>Numeric rating scales of pain: {props.consult.nrs_pain}</p>
                <p>Systolid blood pressure: {props.consult.systolic_blood_pressure}</p>
                <p>Diastolic blood pressure: {props.consult.diastolic_blood_pressure}</p>
                <p>Heart rate: {props.consult.heart_rate}</p>
                <p>Respiration rate: {props.consult.respiration_rate}</p>
                <p>Body temperature: {props.consult.body_temperature}</p>
                <p>Saturation to use pulse oxmeter: {props.consult.oxygen_saturation}</p>
                <p>Symptom 1: {props.consult.symptom_1}</p>
                <p>Symptom 2: {props.consult.symptom_2}</p>
                <p>Symptom 3: {props.consult.symptom_3}</p>
                <p>Treatment: {props.consult.treatment_description}</p>
            </DialogContent>
        </Dialog>
    )
}

export default Popup