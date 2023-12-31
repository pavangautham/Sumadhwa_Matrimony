import { useRef, useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { FormSection, StyledForm } from "./form.styled";
import { Button } from "../Components/button";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import LoaderComponent from "../Components/loader";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "./customDatePicker";
import DatePicker from "react-datepicker";

export interface IFormData {
  name: string;
  gender: string;
  fatherName: string;
  motherName: string;
  gotra: string;
  nakshatra: string;
  rashi: string;
  paada: string;
  gana: string;
  nadi: string;
  caste: string;
  matha: string;
  dob: string;
  tob: string;
  placeOfBirth: string;
  height: string;
  qualification: string;
  workingOrganization: string;
  isAbroadWorking: boolean;
  workingLocation: string;
  expectationsAboutPartner: string;
  salary: string;
  siblings: string;
  contactNumber: string;
  isDivorced: boolean;
  divorceDetails: string;
  residence: string;
  description: string;
  photo: File | null;
  [key: string]: string | File | null | boolean;
}

interface ErrorData {
  [key: string]: boolean;
}

function Form() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    gender: "",
    fatherName: "",
    motherName: "",
    gotra: "",
    nakshatra: "",
    rashi: "",
    paada: "",
    gana: "",
    nadi: "",
    caste: "",
    dob: "",
    tob: "",
    matha: "",
    placeOfBirth: "",
    height: "",
    qualification: "",
    workingOrganization: "",
    isAbroadWorking: false,
    workingLocation: "",
    expectationsAboutPartner: "",
    salary: "",
    siblings: "",
    contactNumber: "",
    isDivorced: false,
    divorceDetails: "",
    description: "",
    residence: "",
    photo: null,
  });

  const [error, setError] = useState<ErrorData>({
    name: false,
    contactNumber: false,
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeOfBirth, setTimeOfBirth] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    // Update the date in the formData
  const formattedDate = date
  ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  : "";

    setFormData((prevData) => ({
    ...prevData,
    dob: formattedDate,
  }));
  };

  const handleTimeOfBirthChange = (time: Date | null) => {
    // Update the time of birth in the formData
    const formattedTime = time
      ? new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(time)
      : '';
  
    setFormData((prevData) => ({
      ...prevData,
      tob: formattedTime,
    }));
  
    // Update the state for the selected time
    setTimeOfBirth(time);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFormData = () => {
    const newErrors: ErrorData = {};

    // Check if "name" is empty
    newErrors.name = formData.name === "";

    // Check if "contactNumber" is empty
    newErrors.contactNumber = formData.contactNumber === "";

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
  };

  const region = import.meta.env.VITE_AWS_REGION;
  const bucketName = import.meta.env.VITE_BUCKET_NAME;

  const uploadPhoto = async () => {
    const file = formData.photo;

    // Check if a file is present
    if (file) {
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
    }

    // If no file is present, return null or any other default value
    return null;
  };

  const BOT_TOKEN = "6710721716:AAFJCkuFl94excqHHHcz7q2aKr2a85rUDqs";
  // const CHAT_ID = 822389037;
  const CHAT_ID = -1002136474672;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the form data is valid
    if (!validateFormData()) {
      // If not valid, don't proceed with the submission
      return;
    }
    setLoading(true);
    let photoId = null;
    // const photoId = await uploadPhoto();

    try {
      // Check if a photo is present
      if (formData.photo) {
        // If photo is present, upload it and get the ID
        photoId = await uploadPhoto();
      }

      const apiPayload = {
        name: formData.name,
        gender: formData.gender,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        gotra: formData.gotra,
        nakshatra: formData.nakshatra,
        rashi: formData.rashi,
        gana: formData.gana,
        nadi: formData.nadi,
        paada: formData.paada,
        caste: formData.caste,
        matha: formData.matha,
        dob: formData.dob,
        tob: formData.tob,
        placeOfBirth: formData.placeOfBirth,
        height: formData.height,
        qualification: formData.qualification,
        workingOrganization: formData.workingOrganization,
        isAbroadWorking: formData.isAbroadWorking,
        workingLocation: formData.workingLocation,
        expectationsAboutPartner: formData.expectationsAboutPartner,
        salary: formData.salary,
        residence: formData.residence,
        siblings: formData.siblings,
        contactNumber: formData.contactNumber,
        isDivorced: formData.isDivorced,
        divorceDetails: formData.isDivorced ? formData.divorceDetails : null,
        description: formData.description,
        photo: photoId,
      };

      // Make the API request using Axios
      const response = await axios.post(
        "https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/add-profile",
        apiPayload
      );

      // // Handle the API response as needed
      console.log("API Response:", response.data);

      const fieldMappings: Record<keyof IFormData, string> = {
        name: "Name",
        fatherName: "Father's Name",
        motherName: "Mother's Name",
        gotra: "Gotra",
        nakshatra: "Nakshatra",
        rashi: "Rashi",
        gana: "Gana",
        nadi: "Nadi",
        paada: "Paada",
        caste: "Caste",
        matha: "Mata(ಮಠ)",
        dob: "Date of Birth",
        tob: "Time of Birth",
        placeOfBirth: "Place of Birth",
        height: "Height",
        qualification: "Qualification",
        contactNumber: "Contact Number",
        siblings: "Siblings",
        workingOrganization: "Working Organization",
        isAbroadWorking: "Working in Abroad",
        workingLocation: "Working Location",
        salary: "Salary per Annum",
        expectationsAboutPartner: "Expectations About Partner",
        isDivorced: "Divorced / Widow",
        divorceDetails: "Divorced / Widow Details",
        description: "Other Details",
        residence: "Address",
      };

      // Send form data and photo to Telegram bot
      if (photoId) {
        const telegramApiPayload = {
          chat_id: CHAT_ID,
          photo: photoId,
          caption:
          Object.keys(fieldMappings)
      .filter((key) => {
        const value = formData[key];

        // Skip if the value is undefined, null, or an empty string
        if (value === undefined || value === null || value === "") {
          return false;
        }

        // Include only when the value is not undefined and true
        return key === "isAbroadWorking" || key === "isDivorced"
          ? value !== undefined && value !== false
          : true;
      })
      .map((key) => {
        if (key === "isAbroadWorking" || key === "isDivorced") {
          // Map isAbroadWorking and isDivorced to "Yes" or "No"
          return `${fieldMappings[key]}: ${formData[key] ? "Yes" : "No"}`;
        } else {
          return `${fieldMappings[key]}: ${formData[key]}`;
        }
      })
      .join("\n\n") +
    "\n\n" +
    "######################\nSumadhwa Matrimony - For joining call 7975950334 / 9042729165",
          //         caption: `
          // Name: ${formData.name}
          // Father's Name: ${formData.fatherName}
          // Mother's Name: ${formData.motherName}
          //   `,
        };

        const telegramApiResponse = await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
          telegramApiPayload
        );

        console.log("Telegram API Response:", telegramApiResponse.data);
      } else {
        // If no photo, use sendMessage API
        const telegramApiPayload = {
          chat_id: CHAT_ID,
          text:
          Object.keys(fieldMappings)
      .filter((key) => {
        const value = formData[key];

        // Skip if the value is undefined, null, or an empty string
        if (value === undefined || value === null || value === "") {
          return false;
        }

        // Include only when the value is not undefined and true
        return key === "isAbroadWorking" || key === "isDivorced"
          ? value !== undefined && value !== false
          : true;
      })
      .map((key) => {
        if (key === "isAbroadWorking" || key === "isDivorced") {
          // Map isAbroadWorking and isDivorced to "Yes" or "No"
          return `${fieldMappings[key]}: ${formData[key] ? "Yes" : "No"}`;
        } else {
          return `${fieldMappings[key]}: ${formData[key]}`;
        }
      })
      .join("\n\n") +
    "\n\n" +
    "######################\nSumadhwa Matrimony - For joining call 7975950334 / 9042729165",
        };

        const telegramApiResponse = await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          telegramApiPayload
        );
        console.log("Telegram API Response:", telegramApiResponse.data);
      }

      Swal.fire({
        title: "Success!!",
        text: "Successfully Registered to Sumadhwa Matrimony",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset the form and errors after successful submission
      setFormData({
        name: "",
        gender: "",
        fatherName: "",
        motherName: "",
        gotra: "",
        nakshatra: "",
        rashi: "",
        paada: "",
        gana: "",
        nadi: "",
        caste: "",
        matha: "",
        dob: "",
        tob: "",
        placeOfBirth: "",
        height: "",
        qualification: "",
        workingOrganization: "",
        isAbroadWorking: false,
        workingLocation: "",
        expectationsAboutPartner: "",
        salary: "",
        siblings: "",
        contactNumber: "",
        isDivorced: false,
        divorceDetails: "",
        description: "",
        residence: "",
        photo: null,
      });

      // Clear the file input
      if (fileRef.current) {
        fileRef.current.value = "";
      }

      setError({
        name: false,
        contactNumber: false,
      });

      setPreview(null);
    } catch (error) {
      // Handle API request error
      console.error("API Request Error:", error);
      // alert(error)
      Swal.fire({
        title: "Error!!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      // Set loading back to false when the submission is complete
      setLoading(false);
    }
  };

  return (
    <FormSection>
      <h2 className="mb-4" style={{ textAlign: "center" }}>
        <img className="logo-left" src="./src/assets/hand-in-hand.png" alt="" />
        Sumadhwa Matrimony
        <img
          className="logo-right"
          src="./src/assets/hand-in-hand.png"
          alt=""
        />
      </h2>
      <StyledForm action="" onSubmit={handleSubmit}>
        <h2 className="mt-2 mb-3">Please Fill The Form</h2>
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
            <label id="gender-label" htmlFor="gender">
              Gender
            </label>
            <select
              style={{ width: "130px", background: "#ebfbffe6" }}
              name="gender"
              value={formData.gender}
              id="gender"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="two col-lg-12 col-11">
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
        </div>
        <div className="two col-lg-12 col-11">
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
            <label id="paada-label" htmlFor="paada">
              Paada
            </label>
            <input
              type="text"
              name="paada"
              value={formData.paada}
              id="age"
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
              Caste: Madhwa/ Smartha
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
              Mata(ಮಠ)
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
              Date of Birth
            </label>
            <CustomDatePicker onDateChange={handleDateChange} />
          </div>
          <div className="input-holder col-lg-6">
            <label id="dob-label" htmlFor="dob">
              Time of Birth
            </label>
            <DatePicker
              selected={timeOfBirth}
              onChange={handleTimeOfBirthChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
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
          <div className="input-holder col-lg-12">
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
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="isAbroadWorking-label" htmlFor="isAbroadWorking">
              Working in Abroad?
            </label>
            <select
              style={{ width: "130px", background: "#ebfbffe6" }}
              name="isAbroadWorking"
              value={formData.isAbroadWorking ? "yes" : "no"}
              id="isAbroadWorking"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isAbroadWorking: e.target.value === "yes",
                })
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
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
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="isDivorced-label" htmlFor="isDivorced">
              Divorced/Widow?
            </label>
            <select
              style={{ width: "130px", background: "#ebfbffe6" }}
              name="isDivorced"
              value={formData.isDivorced ? "yes" : "no"}
              id="isDivorced"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isDivorced: e.target.value === "yes",
                })
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          {formData.isDivorced && (
            <div className="input-holder col-lg-6">
              <label id="divorceDetails-label" htmlFor="divorceDetails">
                Divorced/Widow Details
              </label>
              <input
                type="text"
                name="divorceDetails"
                value={formData.divorceDetails}
                id="divorceDetails"
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
          )}
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
            <label id="description-label" htmlFor="description">
              Other Details (optional)
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
              Address (optional)
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
              Upload Photo
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
        {(error.name || error.contactNumber) && (
          <p className="error-message" style={{ color: "red" }}>
            Please fill the mandatory fields to submit the data.
          </p>
        )}
        <div className="button-holder col-lg-12 col-md-11 col-sm-10 col-10">
          <Button
            backgroundColor="blue"
            textColor="white"
            type="submit"
            name="submit"
            loading={loading}
          >
            Submit
            {loading && <LoaderComponent />}
          </Button>
        </div>
      </StyledForm>
    </FormSection>
  );
}

export default Form;
