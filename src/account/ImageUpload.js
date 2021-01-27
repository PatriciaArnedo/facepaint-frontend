import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux'
import { uploadAvatar } from '../redux/actions'
import { Button } from 'primereact/button';

class ImageUpload extends React.Component {
    state = {
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 1 / 1
        },
    };

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };



    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL('image/jpeg')

        return base64Image
    }

    imgSaveHandler = () => {
        let imgObj = {
            avatar: this.state.croppedImageUrl
        }
        this.props.uploadAvatar(imgObj, this.props.userId)
        this.setState({
            src: null,
            croppedImageUrl: null
        })
        this.props.cancelHandler()
    }

    cancelHandler = () => {
        this.props.cancelHandler()
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div className="upload-modal">
                <div className="upload-modal-content">
                    <h2>Upload a Profile Picture</h2>
                    <div>
                        <label class="custom-file-upload">
                            Choose Image <i className="pi pi-plus" style={{marginLeft:"5px"}}></i>
                            <input type="file" accept="image/*" onChange={this.onSelectFile} />
                        </label>
                    </div>
                    <br />
                    <div className="upload-preview">
                        <div style={{ width: "300px", marginRight: "100px" }}>
                            {src && (
                                <ReactCrop
                                    src={src}
                                    crop={crop}
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                    circularCrop={true}
                                    ruleOfThirds={false}
                                />
                            )}
                        </div>
                        <div>
                            {croppedImageUrl && (
                                <img alt="Crop" style={{ width: "180px", borderRadius: "50%" }} src={croppedImageUrl} />
                            )}
                        </div>
                    </div>
                    <br />
                    {this.state.src ?
                        <Button onClick={this.imgSaveHandler} label="Save" />
                        :
                        null
                    }
                    <br />
                    <Button onClick={this.cancelHandler} label="Cancel" className="p-button-warning"/>
                </div>

            </div>
        );
    }
}

function msp(state) {
    return {
        user: state.user,
        userId: state.userId,
        userObj: state.userObj
    }
}

function mdp(dispatch) {
    return {
        uploadAvatar: (imgObj, userId) => dispatch(uploadAvatar(imgObj, userId)),
    }
}

export default connect(msp, mdp)(ImageUpload)
