import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';

export default class RichEditor extends React.Component{
    constructor(props) {
        super(props);
        this.editor = null;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.detail !== nextProps.detail){
            this.editor.setValue(nextProps.detail);
            this.editor.focus();
        }
    }

    componentDidMount() {
        let editor = this.refs['editor'];
        this.editor = new Simditor({
            textarea: $(editor),
            placeholder: this.props.placeholder || "Please input",
            pasteImage: true,
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                params: null,
                fileKey: 'upload_file',
                leaveConfirm: '正在上传文件'
            }
        });
        this.editor.on('valuechanged',e => {
            this.props.onChange(this.editor.getValue())
        });
    }

    render() {
        return (
            <div className="richEditor">
                <textarea ref="editor"/>
            </div>
        )
    }
}