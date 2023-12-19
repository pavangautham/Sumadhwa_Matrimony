// import React from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useRef, useState } from "react";
import { IFormData } from "../Form/form";
import { uploadData } from "aws-amplify/storage";
import axios from "axios";
import Swal from "sweetalert2";
import LoaderComponent from "../Components/loader";
import { v4 as uuidv4 } from "uuid";
import { Profile } from "./userCard";

interface OveylayProps {
  $isOpen: boolean;
}

const Oveylay = styled.div<OveylayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.69);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

export const StyledUserModel = styled.div`
  position: fixed;
  height: 500px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e3e7f2;
  padding: 0 20px 20px 20px;
  border-radius: 10px;
  z-index: 1000;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 6px;
  }

  @media (width >= 320px) and (width <= 425px) {
    height: 580px;
  }

  .popup-top {
    position: sticky;
    top: 0;
    z-index: 55;
    padding: 20px 0 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e3e7f2;
    border-bottom: 1px solid silver;

    @media (width >= 320px) and (width <= 425px) {
      padding: 20px 0 35px 0;
    }

    h3 {
      margin: 0;
      font-weight: 600;
      color: #f5b900;

      @media (width >= 320px) and (width <= 425px) {
        font-size: 23px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
`;

const CloseButton = styled.button`
  outline: unset;
  border: unset;
  border-radius: 3px;
  background-color: #4689f3;
  color: #fafafa;
  z-index: 1000;
  padding: 5px 10px;
  transition: all 0.3s ease;
  letter-spacing: 0.7px;

  &:hover,
  &:focus {
    background-color: #f34655;
    transform: translateX(-3px);
  }
`;

const EditButton = styled.button`
  outline: unset;
  border: unset;
  border-radius: 3px;
  background-color: #6fae63;
  color: #fafafa;
  z-index: 1000;
  padding: 5px 10px;
  transition: all 0.3s ease;
  letter-spacing: 0.7px;

  &:hover,
  &:focus {
    background-color: #37954a;
    transform: translateX(3px);
  }
`;

const SaveButton = styled.button`
    display: flex;
    outline: unset;
    border: unset;
    border-radius: 3px;
    background-color: #ffcb2e;M
    color: #fafafa;
    z-index: 1000;
    padding: 5px 10px;
    transition: all 0.3s ease;
    letter-spacing: 0.7px;

    &:hover,
    &:focus {
      background-color: #FA960F;
      transform: translateX(3px);
    }
  `;

const ViewDetails = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 17px;
  border: 1px solid silver;
  padding: 10px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  @media (width >= 320px) and (width <= 425px) {
    padding: 13px;
  }
`;

export const ViewUserPhoto = styled.div`
  width: 39%;
  height: auto;
  border-radius: 7px;
  border: 1px solid silver;
  overflow: hidden;
  position: absolute;
  top: 10px;
  right: 10px;

  img {
    width: 100%;
    transition: all 0.4s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (width >= 320px) and (width <= 768px) {
    width: 100%;
    padding: 0;
    top: 0;
    left: 0;
    margin-bottom: 10px;
    display: block;
    position: relative;
    display: grid;
    place-items: center;

    img {
      width: 100%;
    }
  }

  @media (width > 768px) and (width <= 1024px) {
    width: 60%;
    padding: 0;
    top: 0;
    left: 0;
    margin-bottom: 10px;
    display: block;
    position: relative;
    display: grid;
    place-items: center;

    img {
      width: 100%;
    }
  }
`;

export const UpdateProfile = styled.div`
  display: block;
  margin-top: 15px;
`;

export const ViewUserDetails = styled.div`
  width: 60%;
  @media (width >= 320px) and (width <= 768px) {
    width: 100%;
  }
`;

export const DetailsSpan = styled.span`
  font-size: 17px;
  letter-spacing: 1px;
  margin: 5px 0;
  display: block;
  text-align: justify;

  @media (width >= 320px) and (width <= 425px) {
    font-size: 16px;
    text-align: left;
  }

  strong {
    color: #a52a2a;
    letter-spacing: 0.7px;
    // color: #4689f3;
  }
`;

export const EditUSerDetails = styled.form`
  width: 100%;
  height: auto;
  padding: 10px;
  margin-top: 17px;
  border: 1px solid silver;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .preview-holder {
    margin-top: 20px;
    overflow: hidden;
    width: auto;
    height: 320px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const DiscardButton = styled.button`
  outline: unset;
  border: unset;
  border-radius: 3px;
  background-color: #eb4474;
  color: #fafafa;
  z-index: 1000;
  padding: 5px 10px;
  transition: all 0.3s ease;
  letter-spacing: 0.7px;

  &:hover,
  &:focus {
    background-color: #eb5144;
    transform: translateX(3px);
  }
`;

export const FieldsHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 7px 0;

  @media (width >= 320px) and (width <= 1242px) {
    display: block;
    margin: 5px 0;
  }
`;

export const InputHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5px;

  @media (width >= 320px) and (width <= 1242px) {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
  }

  label {
    font-size: 17px;
    letter-spacing: 1px;
    font-weight: 500;
    color: #a52a2a;
  }

  input,
  textarea {
    width: 100%;
    outline: unset;
    padding: 5px;
    border: none;
    transition: all 0.2s ease;
    font-size: 17px;
    letter-spacing: 0.7px;
    box-shadow: 1px 1px 0 #088f8f;
    font-weight: 500;

    @media (width >= 320px) and (width <= 1242px) {
      width: 100%;
    }

    &:focus {
      transform: translateX(3px) translateY(3px);
      border: 1px solid #141414;
      box-shadow: 0 0 0;
    }
  }

  input::file-selector-button {
    background-color: transparent;
    outline: unset;
    border: 1px solid #141414;
    border-radius: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;

    &:hover {
      background-color: #141414;
      color: white;
    }
  }

  textarea {
    resize: none;
    height: 100px;
  }

  .edit-save-button {
    background-color: #4689f3;
    color: #f7fff7;
    border-radius: 7px;

    &:hover,
    &:focus {
      transform: scale(0.95);
    }
  }
`;

interface ProfileDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  // profileId: string;
  profile: Profile;
}

function ProfileDetailModal({
  isOpen,
  onClose,
  // profileId,
  profile,
}: ProfileDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetail, setProfileDetail] = useState<IFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    gender: "",
    id: profile?.id ? profile?.id : "",
    fatherName: "",
    motherName: "",
    gotra: "",
    nakshatra: "",
    rashi: "",
    gana: "",
    nadi: "",
    caste: "",
    matha: "",
    dob: "",
    age: "",
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

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/get-profile?id=${profile?.id}`
        );
        const data = await response.json();
        setProfileDetail(data.data || []);
        setFormData(data.data || {});
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, [profile?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
        const ext = file.name ? file.name.split(".").pop() : ""; // Check if file.name is defined
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

  const updatePhotoSubmit = async () => {
    try {
      setIsLoading(true);
  
      // Upload the new photo
      const photoUrl = await uploadPhoto();
      
      // Update the profile data with the new photo URL
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setProfileDetail((prevProfile) => ({
        ...prevProfile,
        photo: photoUrl,
      }));

      const apiPayload = {
        id: profile?.id,
        photo: photoUrl,
        name: profile?.name,
        fatherName: profile?.fatherName,
        motherName: profile?.motherName,
        gotra: profile?.gotra,
        nakshatra: profile?.nakshatra,
        rashi: profile?.rashi,
        gana: profile?.gana,
        nadi: profile?.nadi,
        caste: profile?.caste,
        matha: profile?.matha,
        dob: profile?.dob,
        placeOfBirth: profile?.placeOfBirth,
        height: profile?.height,
        qualification: profile?.qualification,
        workingOrganization: profile?.workingOrganization,
        workingLocation: profile?.workingLocation,
        expectationsAboutPartner: profile?.expectationsAboutPartner,
        salary: profile?.salary,
        residence: profile?.residence,
        siblings: profile?.siblings,
        contactNumber: profile?.contactNumber,
        description: profile?.description,
      };

      const response = await axios.post(
        "https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/add-profile",
        apiPayload
      );
        
      console.log("updated photo response", response.data);
      // Display a success message
      Swal.fire({
        title: "Success!!",
        text: "Photo updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear the file input
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (error) {
      // Display an error message
      Swal.fire({
        title: "Error!!",
        text: "Failed to update photo",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };  

  const handleSaveClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const updatedProfile = {
        ...profileDetail,
        id: profile?.id,
        name: formData.name,
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
        description: formData.description,
        photo: profile?.photo,
      };

      // Update the profile data in the state
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
    setProfileDetail(updatedProfile);

      const response = await axios.post(
        "https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/add-profile",
        updatedProfile
      );
      console.log("updated response", response.data);
      setIsLoading(false);
      Swal.fire({
        title: "Success!!",
        text: "Successfully Updated",
        icon: "success",
        confirmButtonText: "OK",
      });
      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        title: "Error!!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handelEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handelCloseClick = () => {
    setIsEditing(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Oveylay $isOpen={isOpen} />
      <StyledUserModel className="col-lg-8 col-md-7 col-sm-7 col-11">
        <div className="popup-top">
          <CloseButton onClick={handelCloseClick}>
            <i className="bi bi-door-open-fill me-1"></i>Close
          </CloseButton>
          {isEditing ? <h3>Edit User Details</h3> : <h3>User Details</h3>}
          {isEditing ? (
            <DiscardButton onClick={handleCancelClick}>
              Cancel<i className="bi bi-x-circle ms-1"></i>
            </DiscardButton>
          ) : (
            <EditButton onClick={handelEditClick}>
              Edit<i className="bi bi-pencil-fill ms-1"></i>
            </EditButton>
          )}
        </div>
        {isEditing ? (
          <EditUSerDetails onSubmit={handleSaveClick}>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="fatherName">Father&apos;s Name:</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="motherName">Mother&apos;s Name:</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData?.motherName || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="gotra">Gotra</label>
                <input
                  type="text"
                  name="gotra"
                  value={formData?.gotra || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="nakshatra">Nakshatra:</label>
                <input
                  type="text"
                  name="nakshatra"
                  value={formData?.nakshatra || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="rashi">Rashi</label>
                <input
                  type="text"
                  name="rashi"
                  value={formData?.rashi || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="gana">Gana:</label>
                <input
                  type="text"
                  name="gana"
                  value={formData?.gana || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="nadi">Nadi.:</label>
                <input
                  type="text"
                  name="nadi"
                  value={formData?.nadi || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="caste">Madhwa/ Smartha:</label>
                <input
                  type="text"
                  name="caste"
                  value={formData?.caste || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="matha">Matha.:</label>
                <input
                  type="text"
                  name="matha"
                  value={formData?.matha || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="dob">Date & Time of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  value={formData?.dob || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="placeOfBirth">Place of Birth:</label>
                <input
                  type="text"
                  name="placeOfBirth"
                  value={formData?.placeOfBirth || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="height">Height:</label>
                <input
                  type="text"
                  name="height"
                  value={formData?.height || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="qualification">Qualification:</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData?.qualification || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="workingOrganization">
                  Working Organisation:
                </label>
                <input
                  type="text"
                  name="workingOrganization"
                  value={formData?.workingOrganization || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="workingLocation">Place of Working:</label>
                <input
                  type="text"
                  name="workingLocation"
                  value={formData?.workingLocation || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="salary">Salary Per Annum:</label>
                <input
                  type="text"
                  name="salary"
                  value={formData?.salary || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="siblings">Siblings:</label>
                <input
                  type="text"
                  name="siblings"
                  value={formData?.siblings || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="contactNumber">Contact No.:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData?.contactNumber || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="expectationsAboutPartner">
                  Expectations about Groom/Bride:
                </label>
                <textarea
                  name="expectationsAboutPartner"
                  id="expectationsAboutPartner"
                  value={formData?.expectationsAboutPartner || ""}
                  onChange={handleChange}
                  autoComplete="off"
                ></textarea>
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="residence">Residence:</label>
                <textarea
                  name="residence"
                  value={formData?.residence || ""}
                  onChange={handleChange}
                  id="residence"
                  autoComplete="off"
                ></textarea>
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-3">
                <SaveButton type="submit">
                  Save Changes<i className="bi bi-check2-square ms-1"></i>
                  {isLoading && <LoaderComponent />}
                </SaveButton>
              </InputHolder>
            </FieldsHolder>
          </EditUSerDetails>
        ) : (
          <ViewDetails>
            <ViewUserPhoto>
              {preview ? (
                <div className="preview-holder">
                  <img src={preview} alt="Preview" />
                </div>
              ) : (
                <img
                  src={profileDetail?.photo as unknown as string}
                  alt={profileDetail?.name}
                />
              )}
              <UpdateProfile>Update Photo</UpdateProfile>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                name="photo"
                autoComplete="off"
                onChange={handleFileChange}
              />
              {fileRef.current && <SaveButton onClick={updatePhotoSubmit}>Update {isLoading && <LoaderComponent />}</SaveButton>}
            </ViewUserPhoto>
            <ViewUserDetails>
              {profileDetail?.name && (
                <DetailsSpan>
                  <strong>Name: </strong>
                  {profileDetail?.name}
                </DetailsSpan>
              )}
              {profileDetail?.fatherName && (
                <DetailsSpan>
                  <strong>Father&apos;s Name: </strong>
                  {profileDetail?.fatherName}
                </DetailsSpan>
              )}
              {profileDetail?.motherName && (
                <DetailsSpan>
                  <strong>Mother&apos;s Name: </strong>
                  {profileDetail?.motherName}
                </DetailsSpan>
              )}
              {profileDetail?.gotra && (
                <DetailsSpan>
                  <strong>Gotra: </strong>
                  {profileDetail?.gotra}
                </DetailsSpan>
              )}
              {profileDetail?.nakshatra && (
                <DetailsSpan>
                  <strong>Nakshatra: </strong>
                  {profileDetail?.nakshatra}
                </DetailsSpan>
              )}
              {profileDetail?.rashi && (
                <DetailsSpan>
                  <strong>Rashi: </strong>
                  {profileDetail?.rashi}
                </DetailsSpan>
              )}
              {profileDetail?.gana && (
                <DetailsSpan>
                  <strong>Gana: </strong>
                  {profileDetail?.gana}
                </DetailsSpan>
              )}
              {profileDetail?.nadi && (
                <DetailsSpan>
                  <strong>Nadi: </strong>
                  {profileDetail?.nadi}
                </DetailsSpan>
              )}
              {profileDetail?.caste && (
                <DetailsSpan>
                  <strong>Madhwa/ Smartha: </strong>
                  {profileDetail?.caste}
                </DetailsSpan>
              )}
              {profileDetail?.matha && (
                <DetailsSpan>
                  <strong>Matha: </strong>
                  {profileDetail?.matha}
                </DetailsSpan>
              )}
              {profileDetail?.dob && (
                <DetailsSpan>
                  <strong>Date & Time of Birth: </strong>
                  {profileDetail?.dob}
                </DetailsSpan>
              )}
              {profileDetail?.age && (
                <DetailsSpan>
                  <strong>Age: </strong>
                  {profileDetail?.age}
                </DetailsSpan>
              )}
              {profileDetail?.placeOfBirth && (
                <DetailsSpan>
                  <strong>Place of Birth: </strong>
                  {profileDetail?.placeOfBirth}
                </DetailsSpan>
              )}
              {profileDetail?.height && (
                <DetailsSpan>
                  <strong>Height: </strong>
                  {profileDetail?.height}
                </DetailsSpan>
              )}
              {profileDetail?.qualification && (
                <DetailsSpan>
                  <strong>Qualification: </strong>
                  {profileDetail?.qualification}
                </DetailsSpan>
              )}              
              {profileDetail?.workingOrganization && (
                <DetailsSpan>
                  <strong>Working Organisation: </strong>
                  {profileDetail?.workingOrganization}
                </DetailsSpan>
              )}
              {profileDetail?.isAbroadWorking && (
                <DetailsSpan>
                  <strong>Working in Abroad: </strong>
                  {profileDetail?.isAbroadWorking ? "Yes" : "No"}
                </DetailsSpan>
              )}
              {profileDetail?.workingLocation && (
                <DetailsSpan>
                  <strong>Place of Working: </strong>
                  {profileDetail?.workingLocation}
                </DetailsSpan>
              )}
              {profileDetail?.salary && (
                <DetailsSpan>
                  <strong>Salary Per Annum: </strong>
                  {profileDetail?.salary}
                </DetailsSpan>
              )}
              {profileDetail?.siblings && (
                <DetailsSpan>
                  <strong>Siblings: </strong>
                  {profileDetail?.siblings}
                </DetailsSpan>
              )}
              {profileDetail?.contactNumber && (
                <DetailsSpan>
                  <strong>Contact No: </strong>
                  {profileDetail?.contactNumber}
                </DetailsSpan>
              )}
              {profileDetail?.expectationsAboutPartner && (
                <DetailsSpan>
                  <strong>Expectations about Groom/Bride: </strong>
                  {profileDetail?.expectationsAboutPartner}
                </DetailsSpan>
              )}
              {profileDetail?.isDivorced && (
                <DetailsSpan>
                  <strong>Divorced/Widow Details: </strong>
                  {profileDetail?.divorceDetails}
                </DetailsSpan>
              )}
              {profileDetail?.description && (
                <DetailsSpan>
                  <strong>Other Details: </strong>
                  {profileDetail?.description}
                </DetailsSpan>
              )}
              {profileDetail?.residence && (
                <DetailsSpan>
                  <strong>Address: </strong>
                  {profileDetail?.residence}
                </DetailsSpan>
              )}
            </ViewUserDetails>
          </ViewDetails>
        )}
      </StyledUserModel>
    </>
  );
}

export default ProfileDetailModal;
