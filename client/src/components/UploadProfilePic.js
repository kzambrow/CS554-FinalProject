import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
//import DefaultImg from "../public/imgs/turnip.png";

function UploadProfilePic() {
    
    const { currentUser } = useContext(AuthContext);
    const [multerImage, setMulterImage] = useState();
    const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);



    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const uploadImage = (e) => {
        let imageFormObj = new FormData();
        imageFormObj.append("userEmail", currentUser.email);
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", e.target.files[0]);
        axios.post('http://localhost:5000/images/uploadmulter', imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Image successfully uploaded");
                    setMulterImage("multer");
                }
            })
            .catch((err) => {
                alert("Error uploading image");
                setMulterImage("multer");
            })
        };


    return (
        <div>
            <form onSubmit={uploadImage}>
                <input type="file"
                onChange={handleImageAsFile}     
            />
            <button>upload</button>
            </form>
            <img src={multerImage} alt="upload-image" />
        </div>
    )
}

export default UploadProfilePic