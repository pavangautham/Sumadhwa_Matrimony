import { useRef, useState } from "react";
import { FormSection, StyledForm } from "./form.styled";
import { Button } from "../Components/button";

interface FormData {
  name: string;
  fathersName: string;
  mothersName: string;
  gothra: string;
  nakshathra: string;
  rashi: string;
  gana: string;
  nadi: string;
  caste: string,
  dob: string,
  matha: string,
  birthPlace: string,
  height: string,
  qualification: string,
  organisation: string,
  workingPlace: string,
  salary: string,
  siblings: string,
  phone: string;
  alternativePhone: string;
  address: string;
  photo: File | null;
  [key: string]: string | File | null;
}

interface ErrorData {
  [key: string]: boolean;
}

function Form() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    fathersName: "",
    mothersName: "",
    gothra: "",
    nakshathra: "",
    rashi: "",
    gana: "",
    nadi: "",
    caste: "",
    dob: "",
    matha: "",
    birthPlace:"",
    height:"",
    qualification:"",
    organisation:"",
    workingPlace:"",
    salary:"",
    siblings:"",
    phone: "",
    alternativePhone: "",
    address: "",
    photo: null,
  });

  const [error, setError] = useState<ErrorData>({
    name: false,
    phone: false,
    photo: false,
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the form data is valid
    if (!validateFormData()) {
      // If not valid, don't proceed with the submission
      return;
    }

    console.log("Name:", formData.name);
    console.log("Phone:", formData.phone);
    console.log("Matha:", formData.matha);
    console.log("working place:", formData.workingPlace);
    console.log("siblings:", formData.siblings);
    console.log("Address:", formData.address);
    console.log("Photo:", formData.photo);

    // Reset the form and errors after successful submission
    setFormData({
      name: "",
      fathersName: "",
      mothersName: "",
      gothra: "",
      nakshathra: "",
      rashi: "",
      gana: "",
      nadi: "",
      caste: "",
      dob: "",
      matha: "",
      birthPlace:"",
      height:"",
      qualification:"",
      organisation: "",
      workingPlace: "",
      salary: "",
      siblings: "",
      phone: "",
      alternativePhone: "",
      address: "",
      photo: null,
    });

    setError({
      name: false,
      phone: false,
      photo: false,
    });
  };

  return (
    <FormSection>
      <h1 className="mb-4" style={{ textAlign: "center" }}>
        Sumadhwa Matrimony
      </h1>
      <StyledForm action="" onSubmit={handleSubmit}>
        <h2 className="mt-2 mb-3">Bride / Bridegroom required</h2>        
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
            <label id="fathersName-label" htmlFor="fathersName">
              Father's Name
            </label>
            <input
              type="text"
              name="fathersName"
              value={formData.fathersName}
              id="fathersName"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>          
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="mothersName-label" htmlFor="mothersName">
              Mother's Name
            </label>
            <input
              type="text"
              name="mothersName"
              value={formData.mothersName}
              id="mothersName"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="gothra-label" htmlFor="gothra">
              Gothra
            </label>
            <input
              type="text"
              name="gothra"
              value={formData.gothra}
              id="gothra"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="nakshathra-label" htmlFor="nakshathra">
              Nakshathra
            </label>
            <input
              type="text"
              name="nakshathra"
              value={formData.nakshathra}
              id="nakshathra"
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
              Nadi
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
              Madhwa/ Smartha/ (specify)
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
            <label id="dob-label" htmlFor="dob">
              Date and Time of Birth
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
        </div>
        <div className="two col-lg-12 col-11">
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
          <div className="input-holder col-lg-6">
            <label id="birthPlace-label" htmlFor="birthPlace">
              Place of Birth
            </label>
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              id="birthPlace"
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
            <label id="organisation-label" htmlFor="organisation">
              Working Organisation
            </label>
            <input
              type="text"
              name="organisation"
              value={formData.organisation}
              id="organisation"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="workingPlace-label" htmlFor="workingPlace">
              Place of Working
            </label>
            <input
              type="text"
              name="workingPlace"
              value={formData.workingPlace}
              id="workingPlace"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="salary-label" htmlFor="salary">
              Salary per annum
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
            <label id="address-label" htmlFor="address">
              Residence
            </label>
            <textarea
              name="address"
              value={formData.address}
              id="address"
              className="address-input"
              autoComplete="off"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div className="two col-lg-12 col-11">
          <div className="input-holder col-lg-6">
            <label id="phone-label" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              id="phone"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-holder col-lg-6">
            <label id="alternativePhone-label" htmlFor="alternativePhone">
              Another Phone No
            </label>
            <input
              type="text"
              name="alternativePhone"
              value={formData.alternativePhone}
              id="alternativePhone"
              autoComplete="off"
              onChange={handleChange}
            />
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
          >
            Submit
          </Button>
        </div>
      </StyledForm>
    </FormSection>
  );
}

export default Form;
