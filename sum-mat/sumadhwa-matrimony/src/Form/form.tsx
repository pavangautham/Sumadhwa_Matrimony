import { useRef, useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { FormSection, StyledForm } from "./form.styled";
import { Button } from "../Components/button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface IFormData {
  name: string;
  description: string;
  fatherName: string;
  motherName: string;
  gotra: string;
  nakshatra: string;
  rashi: string;
  gana: string;
  nadi: string;
  caste: string;
  dob: string;
  matha: string;
  placeOfBirth: string;
  height: string;
  qualification: string;
  workingOrganization: string;
  workingLocation: string;
  expectationsAboutPartner: string;
  salary: string;
  siblings: string;
  contactNumber: string;
  alternativePhone: string;
  residence: string;
  photo: File | null;
  photo2: File | null;
  [key: string]: string | File | null;
}

interface ErrorData {
  [key: string]: boolean;
}

function Form() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    description: "",
    fatherName: "",
    motherName: "",
    gotra: "",
    nakshatra: "",
    rashi: "",
    gana: "",
    nadi: "",
    caste: "",
    dob: "",
    matha: "",
    placeOfBirth: "",
    height: "",
    qualification: "",
    workingOrganization: "",
    workingLocation: "",
    expectationsAboutPartner: "",
    salary: "",
    siblings: "",
    contactNumber: "",
    alternativePhone: "",
    residence: "",
    photo: null,
    photo2: null,
  });

  const [error, setError] = useState<ErrorData>({
    name: false,
    contactNumber: false,
    photo: false,
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFormData = () => {
    const newErrors: ErrorData = {};

    // Perform validation for each field
    Object.keys(formData).forEach((key) => {
      newErrors[key] = formData[key] === "";
    });

    // Additional validation for specific fields
    newErrors.photo = formData.photo === null;

    // Set errors
    setError(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.values(newErrors).every((error) => !error);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setPreview(file ? URL.createObjectURL(file) : null);

    setFormData((prevData) => ({
      ...prevData,
      //   photo: file !== undefined ? (file as File) : null,
      photo: file ?? null,
    }));

    validateFormData();
  };

  const region = import.meta.env.VITE_AWS_REGION;
  const bucketName = import.meta.env.VITE_BUCKET_NAME;

  const uploadPhoto = async () => {
    const file = formData.photo;

    // Check if a file is present
    if (!file) {
      throw new Error("Photo is required");
    }

    try {
      // Generate a unique ID for the photo
      const ext = file.name.split(".").pop();
      const id = uuidv4();

      // Upload the photo and get the resulting ID
      const result = await uploadData({
        key: `${id}.${ext}`,
        data: file,
        options: {
          contentType: file.type,
        },
      }).result;

      console.log("Succeeded: ", result);

      // Return the generated URL
      const photoUrl = `https://${bucketName}.s3.${region}.amazonaws.com/public/${id}.${ext}`;
      return photoUrl;
    } catch (error) {
      console.log("Error : ", error);
      throw new Error("Failed to upload photo");
    }
  };

  const BOT_TOKEN = "6710721716:AAFJCkuFl94excqHHHcz7q2aKr2a85rUDqs";
  const CHAT_ID = "822389037";

  //   const sendTextAndImageToTelegram = async (photoUrl: string) => {
  //     const messageText = `
  //       Name: ${formData.name}
  //       Father's Name: ${formData.fatherName}
  //       Mother's Name: ${formData.motherName}
  //       // ... (include other form fields as needed)
  //     `;

  //     try {
  //       const response = await axios.post(
  //         `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
  //         {
  //           chat_id: CHAT_ID,
  //           photo: photoUrl,
  //           caption: messageText,
  //         }
  //       );

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error('Error sending text and image to Telegram:', error);
  //     }
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Check if the form data is valid
    // if (!validateFormData()) {
    //   // If not valid, don't proceed with the submission
    //   return;
    // }

    // Prepare the API request payload using your form data

    const photoId = await uploadPhoto();

    const apiPayload = {
      name: formData.name,
      description: formData.description,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      gotra: formData.gotra,
      nakshatra: formData.nakshatra,
      rashi: formData.rashi,
      gana: formData.gana,
      nadi: formData.nadi,
      caste: formData.caste,
      matha: formData.matha,
      dob: formData.dob,
      placeOfBirth: formData.placeOfBirth,
      height: formData.height,
      qualification: formData.qualification,
      workingOrganization: formData.workingOrganization,
      workingLocation: formData.workingLocation,
      expectationsAboutPartner: formData.expectationsAboutPartner,
      salary: formData.salary,
      residence: formData.residence,
      siblings: formData.siblings,
      contactNumber: formData.contactNumber,
      photo: photoId,
    };

    try {
      // Make the API request using Axios
      const response = await axios.post(
        "https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/add-profile",
        apiPayload
      );

      // // Handle the API response as needed
      console.log("API Response:", response.data);
      // console.log("API Response:", apiPayload);

      // Send form data and photo to Telegram bot
      const telegramApiPayload = {
        chat_id: CHAT_ID,
        photo: photoId,
        caption: `
Name: ${formData.name}

Father's Name: ${formData.fatherName}

Mother's Name: ${formData.motherName}

Gotra: ${formData.gotra}

Nakshatra: ${formData.nakshatra}

Rashi: ${formData.rashi}

Gana: ${formData.gana}

Nadi: ${formData.nadi}

Caste: ${formData.caste}

Matha: ${formData.matha}

Date of Birth: ${formData.dob}

Place of Birth: ${formData.placeOfBirth}

Height: ${formData.height}

Qualification: ${formData.qualification}

Working Organization: ${formData.workingOrganization}

Working Location: ${formData.workingLocation}

Expectations About Partner: ${formData.expectationsAboutPartner}

Salary: ${formData.salary}

Residence: ${formData.residence}

Siblings: ${formData.siblings}

Contact Number: ${formData.contactNumber}
  `,
      };

      const telegramApiResponse = await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
        telegramApiPayload
      );

      console.log("Telegram API Response:", telegramApiResponse.data);

      // Reset the form and errors after successful submission
      setFormData({
        name: "",
        description: "",
        fatherName: "",
        motherName: "",
        gotra: "",
        nakshatra: "",
        rashi: "",
        gana: "",
        nadi: "",
        caste: "",
        dob: "",
        matha: "",
        placeOfBirth: "",
        height: "",
        qualification: "",
        workingOrganization: "",
        workingLocation: "",
        expectationsAboutPartner: "",
        salary: "",
        siblings: "",
        contactNumber: "",
        alternativePhone: "",
        residence: "",
        photo: null,
        photo2: null,
      });

      // Clear the file input
      if (fileRef.current) {
        fileRef.current.value = "";
      }

      setError({
        name: false,
        contactNumber: false,
        photo: false,
      });

      setPreview(null);
    } catch (error) {
      // Handle API request error
      console.error("API Request Error:", error);
    } finally {
      // Set loading back to false when the submission is complete
      setLoading(false);
    }
  };

  return (
    <FormSection>
      <h1 className="mb-4" style={{ textAlign: "center" }}>
        <img className="logo-left" src="./src/assets/hand-in-hand.png" alt="" />
        Sumadhwa Matrimony
        <img
          className="logo-right"
          src="./src/assets/hand-in-hand.png"
          alt=""
        />
      </h1>
      <StyledForm action="" onSubmit={handleSubmit}>
        <h1 className="mt-2 mb-3">Tell us about yourself</h1>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="name-label" htmlFor="name">
              Name<sup>*</sup>
              {error.name && (
                <span className="name-error error-message">
                  {formData.name === "" ? "Required" : ""}
                </span>
              )}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              id="name"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="fatherName-label" htmlFor="fatherName">
              Father&apos;s Name
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              id="fatherName"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="motherName-label" htmlFor="motherName">
              Mother&apos;s Name
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              id="motherName"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="gotra-label" htmlFor="gotra">
              Gotra
            </label>
            <input
              type="text"
              name="gotra"
              value={formData.gotra}
              id="gotra"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="nakshatra-label" htmlFor="nakshatra">
              Nakshatra
            </label>
            <input
              type="text"
              name="nakshatra"
              value={formData.nakshatra}
              id="nakshatra"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="rashi-label" htmlFor="rashi">
              Rashi
            </label>
            <input
              type="text"
              name="rashi"
              value={formData.rashi}
              id="rashi"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="gana-label" htmlFor="gana">
              Gana
            </label>
            <input
              type="text"
              name="gana"
              value={formData.gana}
              id="gana"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="nadi-label" htmlFor="nadi">
              Nadi.
            </label>
            <input
              type="text"
              name="nadi"
              value={formData.nadi}
              id="nadi"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="caste-label" htmlFor="caste">
              Madhwa/ Smartha
            </label>
            <input
              type="text"
              name="caste"
              value={formData.caste}
              id="caste"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="matha-label" htmlFor="matha">
              Matha
            </label>
            <input
              type="text"
              name="matha"
              value={formData.matha}
              id="matha"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="dob-label" htmlFor="dob">
              Date & Time of Birth
            </label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              id="dob"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="placeOfBirth-label" htmlFor="placeOfBirth">
              Place of Birth
            </label>
            <input
              type="text"
              name="placeOfBirth"
              value={formData.placeOfBirth}
              id="placeOfBirth"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="height-label" htmlFor="height">
              Height
            </label>
            <input
              type="text"
              name="height"
              value={formData.height}
              id="height"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="qualification-label" htmlFor="qualification">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              id="qualification"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="workingOrganization-label" htmlFor="workingOrganization">
              Working Organisation
            </label>
            <input
              type="text"
              name="workingOrganization"
              value={formData.workingOrganization}
              id="workingOrganization"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="workingLocation-label" htmlFor="workingLocation">
              Place of Working
            </label>
            <input
              type="text"
              name="workingLocation"
              value={formData.workingLocation}
              id="workingLocation"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="salary-label" htmlFor="salary">
              Salary Per Annum
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              id="salary"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="siblings-label" htmlFor="siblings">
              Siblings
            </label>
            <input
              type="text"
              name="siblings"
              value={formData.siblings}
              id="siblings"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-md-12 col-11">
          <div className="input-holder col-lg-12 col-md-11">
            <label id="contactNumber-label" htmlFor="contactNumber">
              Contact Nos.<sup>*</sup>
              {error.contactNumber && (
                <span className="error-message">
                  {formData.contactNumber === "" ? "Required" : ""}
                </span>
              )}
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              id="contactNumber"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-md-12 col-11">
          <div className="input-holder col-lg-12 col-md-11">
            <label
              id="expectationsAboutPartner-label"
              htmlFor="expectationsAboutPartner"
            >
              Expectations about Groom/Bride
            </label>
            <textarea
              name="expectationsAboutPartner"
              value={formData.expectationsAboutPartner}
              id="expectationsAboutPartner"
              className="address-input"
              autoComplete="off"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="two col-lg-12 col-md-12 col-11">
          <div className="input-holder col-lg-12 col-md-11">
            <label
              id="description-label"
              htmlFor="description"
            >
              Other Details
            </label>
            <textarea
              name="description"
              value={formData.description}
              id="description"
              className="address-input"
              autoComplete="off"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="two col-lg-12 col-md-12 col-11">
          <div className="input-holder col-lg-12 col-md-11">
            <label id="residence-label" htmlFor="residence">
              Residence
            </label>
            <textarea
              name="residence"
              value={formData.residence}
              id="residence"
              className="address-input"
              autoComplete="off"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="two col-lg-12 col-md-12 col-11">
          <div className="last-input-holder input-holder col-lg-12 col-md-11">
            <label id="file-label" htmlFor="upload-file">
              Upload Photo<sup>*</sup>
              {error.photo && <span className="error-message">Required</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              id="upload-file"
              autoComplete="off"
              onChange={handleFileChange}
              ref={fileRef}
            />
            <div className="preview-holder">
              {preview && <img src={preview} alt="Preview" />}
            </div>
          </div>
        </div>
        <div className="button-holder col-lg-12 col-md-11 col-sm-10 col-10">
          <Button
            backgroundColor="blue"
            textColor="white"
            type="submit"
            name="submit"
            loading={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </StyledForm>
    </FormSection>
  );
}

export default Form;
