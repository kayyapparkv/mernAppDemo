import React from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

import './App.css';

class addCattleDetails extends React.Component {
    state = {
        sheetName: "",
        data: []
    }

    submit = (e) => {
        e.preventDefault();

        axios({
            url: 'api/save',
            method: 'POST',
            data: this.state.data
        }).then(() => {
            console.log(`Data has been sen to the server`);
            this.setState({
                sheetName: "",
                data: []
            });
        }).catch(() => {
            console.log(`Internal server error`);
        });
    };

    fileHandler = (e) => {
        e.preventDefault();

        let fileObj = e.target.files;
        let f =fileObj[0];
        console.log(f);
        let reader = new FileReader();
        reader.onload = (e) => {
            let data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary', cellDates:true, cellNF: false, cellText:false});
            let rowObject;
            readedData.SheetNames.forEach(sheet => {
                rowObject = XLSX.utils.sheet_to_json(readedData.Sheets[sheet]);
            });
            this.setState({
                sheetName: fileObj[0].name,
                data: rowObject
            })
            console.log(rowObject);
        };
        reader.readAsBinaryString(f);
    }
    render() {
        return (
            <div className="upload-page">
                <h3>{this.state.sheetName}</h3>
                <form onSubmit={this.submit}>
                    <label className="label-class">
                        <input type = "file" onChange={this.fileHandler.bind(this)} className="browse-file" accept=".xlsx" />
                        <a className="choose-field">Upload Herd Details</a>
                    </label><br/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default addCattleDetails;