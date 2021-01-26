import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from 'react-redux'
import { getUser, uploadAvatar } from '../redux/actions'


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
        // return new Promise((resolve, reject) => {
        //   canvas.toBlob(blob => {
        //     if (!blob) {
        //       //reject(new Error('Canvas is empty'));
        //       console.error('Canvas is empty');
        //       return;
        //     }
        //     blob.name = fileName;
        //     window.URL.revokeObjectURL(this.fileUrl);
        //     this.fileUrl = window.URL.createObjectURL(blob);
        //     resolve(this.fileUrl);
        //   }, 'image/jpeg');
        // });
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
    }

    render() {
        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div style={{ textAlign: "center" }} className="ImageUpload">
                <div>
                    <input type="file" accept="image/*" onChange={this.onSelectFile} />
                </div>
                {src && (
                    <div style={{ maxWidth: "400px" }}>
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            circularCrop={true}
                            ruleOfThirds={false}
                        />
                        <br />
                    </div>
                )}
                {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: '100%', borderRadius: "50%" }} src={croppedImageUrl} />
                )}
                <br />
                {this.state.src ?
                    <button onClick={this.imgSaveHandler}>Save</button>
                    :
                    null
                }
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

export default connect(msp,mdp)(ImageUpload)
