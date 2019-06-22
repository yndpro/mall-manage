import React from 'react';
import RcFileUpload from './reactFileUpload.js';

class FileUpload extends React.Component{
    render() {
        /*set properties*/
        const options={
            baseUrl         : '/manage/product/upload.do',
            dataType        : 'json',
            fileFieldName   : 'upload_file',
            chooseAndUpload : true,
            uploadSuccess : (res) => {
                typeof this.props.onUploadSuccess === "function" && this.props.onUploadSuccess(res.data);
            },
            uploadError    : (err) => {
                typeof this.props.onUploadError === "function" && this.props.onUploadSuccess(err.message || "Upload Fail");
            }
        };
        /*Use ReactFileUpload with options*/
        /*Set two dom with ref*/
        return (
            <RcFileUpload options={options}>
                <button className="btn btn-default" ref="chooseAndUpload">choose</button>
            </RcFileUpload>
        )
    }
}


export default FileUpload;