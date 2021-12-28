import React, { Component } from 'react'

export default class Upload extends Component {
  state={
    image: localStorage["fileBase64"] 
    // local storage get item
    || "https://fakeimg.pl/350x200/"
  }
  imageUpload = (e) => {
      const file = e.target.files[0];
      getBase64(file).then(base64 => {
        localStorage["fileBase64"] = base64;
        // local storage set item
        console.debug("file stored",base64);
      }).then(()=> this.setState({image: localStorage["fileBase64"]}));
  };

  render() {

    const {image} = this.state

    return (
    <div>
    <input 
     type="file" 
     id="imageFile" 
     name='imageFile' 
     onChange={this.imageUpload} />
     
  <img src={image} width="350" height="200" alt="embleh"/>
     
     </div>
     
     )

  }
}


const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
     const reader = new FileReader();
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
     reader.readAsDataURL(file);
  });
}