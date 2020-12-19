import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
//import DefaultImg from "../public/imgs/turnip.png";

const axios = require('axios');
function UploadProfilePic() {
    
    const { currentUser } = useContext(AuthContext);
    const [multerImage, setMulterImage] = useState("/imgs/turnip.png");

    useEffect(() => {
        async function getImage() {
            try {
                const profile = await axios.get(`http://localhost:5000/images/${currentUser.email}`); 
                let newimageSource = profile.data.data.imageData;
                let finalimageSource = newimageSource.replaceAll("\\", "/").replace("../client/public", "");
                
                setMulterImage(finalimageSource);
                console.log(multerImage);
            } catch (e) {
                setMulterImage("/imgs/turnip.png");
                console.log(e);
            }
        }
        getImage();
    }, [multerImage]);
    
    const uploadImage = (e) => {
        let imageFormObj = new FormData();
        imageFormObj.append("userId", currentUser.id);
        imageFormObj.append("userEmail", currentUser.email);
        imageFormObj.append("imageName", "multer-image-" + Date.now());
        imageFormObj.append("imageData", e.target.files[0]);
        axios.delete(`http://localhost:5000/images/${currentUser.email}`)

        axios.post('http://localhost:5000/images/uploadmulter', imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    alert("Image successfully uploaded");
                    //setMulterImage("/imgs/turnip.png");

                }
            })
            .catch((err) => {
                alert(err);
                setMulterImage("/imgs/turnip.png");
            })
        };


    return (
        <div>
            <form>
                <input type="file"
                onChange={uploadImage}
            />
            </form>
        </div>
    )
}

export default UploadProfilePic