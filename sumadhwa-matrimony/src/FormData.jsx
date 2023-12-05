import { useEffect, useState } from "react";
import { imgDB, txtDB } from "./firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
// import { MessagingResponse } from "twilio/lib/twiml/MessagingResponse";
// import twilio from 'twilio';

const FormData = () => {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    const imgs = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0])
      .then(async (data) => {
        console.log(data, "imgs");
  
        // Get photo URL
        const photoURL = await getDownloadURL(data.ref);
        console.log('Image URL:', photoURL);
  
        // Set photo URL
        setImg(photoURL);
      })
      .catch((error) => {
        console.error('Error uploading photo:', error.message);
      });
  };

  const handleClick = async () => {
    const valRef = collection(txtDB, "txtData");
    await addDoc(valRef, { txtVal: txt, imgUrl: img });
    alert("Data added successfully");
  };

  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
    console.log(dataDb);
  };

  const handleSendToWhatsAppWeb = (value) => {
    const message = `Text: ${value.txtVal}\nImage URL: ${value.imgUrl}`;
    const phoneNumber = '7259691900';
    // const whatsappURL = `https://api.whatsapp.com/send?phone=${receiverPhone}&text= ${message}`;
    const whatsappWebLink = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappWebLink, '_blank');

    // Automatically send to WhatsApp using Twilio WhatsApp API
    // const phoneNumber = 'whatsapp:+918660142686'; // Replace with the recipient's phone number
    // const message = `Text: ${value.txtVal}\nImage URL: ${value.imgUrl}`;

    // // Twilio credentials
    // const accountSid = 'ACbba7076ea5e80c06910b08358f7e579f';
    // const authToken = '202b6aa93bd547d34c16c5be0d4c9c50';

    // import('twilio').then((twilio) => {
    //   const client = twilio(accountSid, authToken);
    //   // Now you can use the 'client' instance
    //   // Send message
    // client.messages
    // .create({
    //   body: message,
    //   from: 'whatsapp:+18028584022', // Replace with your Twilio WhatsApp Business number
    //   to: phoneNumber,
    // })
    // .then((message) => console.log('Message sent:', message.sid))
    // }).catch((error) => {
    //   console.error('Error loading Twilio:', error.message);
    // });
  };

  const handleSendToWhatsAppMobile = (value) => {
    const message = `Text: ${value.txtVal}\nImage URL: ${value.imgUrl}`;
    const phoneNumber = '7259691900'; // Replace with the recipient's phone number
    const whatsappMobileLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappMobileLink, '_blank');
  };

  useEffect(() => {
    getData();
  },[]);
  console.log(data, "datadata");

  return (
    <div>
      <input onChange={(e) => setTxt(e.target.value)} />
      <br />
      <input type="file" onChange={(e) => handleUpload(e)} />
      <br />
      <br />
      <button onClick={handleClick}>Add</button>

      {data.map((value) => (
        <div key="presentation">
          <h1>{value.txtVal}</h1>
          <img src={value.imgUrl} height="200px" width="200px" />
          <br />
          <button onClick={() => handleSendToWhatsAppWeb(value)}>Send to WhatsApp Web</button>
          <button onClick={() => handleSendToWhatsAppMobile(value)}>Send to WhatsApp Mobile</button>
        </div>
      ))}
    </div>
  );
}

export default FormData;