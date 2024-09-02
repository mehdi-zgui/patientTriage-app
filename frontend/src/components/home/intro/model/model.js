import React from "react";
import Registre from "../registre/registre";
import "./model.css";

function Model(props) {


    return (
        <>
            <div className="modal">
                <div onClick={props.show} className="overlay"></div>
                <div className="modal-content">
                    <Registre />
                    <button className="close-modal" onClick={props.show}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default Model;