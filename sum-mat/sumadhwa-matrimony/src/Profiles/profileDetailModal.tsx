// import React from "react";
import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { IFormData } from "../Form/form";

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
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
`;

const StyledUserModel = styled.div`
  position: fixed;
  height: 500px;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
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
    height: 425px;
  }

  .popup-top {
    position: sticky;
    top: 0;
    z-index: 55;
    padding: 20px 0 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-bottom: 1px solid silver;

    @media (width >= 320px) and (width <= 425px) {
      padding: 20px 0 35px 0;
    }

    h3 {
      margin: 0;

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

const ViewUserPhoto = styled.div`
  width: 230px;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid silver;
  position: absolute;
  top: 10px;
  right: 10px;

  img {
    width: 100%;
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

const DetailsSpan = styled.span`
  font-size: 17px;
  letter-spacing: 0.7px;
  margin: 5px 0;
  text-align: justify;

  @media (width >= 320px) and (width <= 425px) {
    font-size: 14px;
    text-align: left;
  }
`;

const EditUSerDetails = styled.div`
  width: 100%;
  height: auto;
  padding: 10px;
  margin-top: 17px;
  border: 1px solid silver;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FieldsHolder = styled.form`
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

const InputHolder = styled.div`
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
  }

  input,
  textarea {
    width: 100%;
    outline: unset;
    padding: 5px;
    border: 1px solid #4689f3;
    transition: all 0.2s ease;
    letter-spacing: 0.7px;
    font-weight: 500;

    @media (width >= 320px) and (width <= 1242px) {
      width: 100%;
    }

    &:focus {
      color: #f1f1f1;
      background-color: #4689f3a1;
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
    profileId: string; // Assuming profileId is a string, you can adjust the type accordingly
  }

function ProfileDetailModal({ isOpen, onClose, profileId }: ProfileDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetail,setProfileDetail] = useState<IFormData>();
  console.log("profileDetail",profileDetail)
  console.log("id",profileId)

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/get-profile?id=${profileId}`
        );
        const data = await response.json();
        setProfileDetail(data.data || []);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handelEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Now I have to add the logic for saving the data here
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
            <SaveButton onClick={handleSaveClick}>
              Save<i className="bi bi-check2-square ms-1"></i>
            </SaveButton>
          ) : (
            <EditButton onClick={handelEditClick}>
              Edit<i className="bi bi-pencil-fill ms-1"></i>
            </EditButton>
          )}
        </div>
        {isEditing ? (
          <EditUSerDetails>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={profileDetail?.name} autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="fatherName">Father&apos;s Name:</label>
                <input type="text" name="fatherName" value={profileDetail?.fatherName} autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="motherName">Mother&apos;s Name:</label>
                <input type="text" name="motherName" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="gotra">Gotra</label>
                <input type="text" name="gotra" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="nakshatra">Nakshatra:</label>
                <input type="text" name="nakshatra" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="rashi">Rashi</label>
                <input type="text" name="rashi" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="gana">Gana:</label>
                <input type="text" name="gana" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="nadi">Nadi.:</label>
                <input type="text" name="nadi" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="caste">Madhwa/ Smartha:</label>
                <input type="text" name="caste" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="matha">Matha.:</label>
                <input type="text" name="matha" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="dob">Date & Time of Birth:</label>
                <input type="text" name="dob" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="placeOfBirth">Place of Birth:</label>
                <input type="text" name="placeOfBirth" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="height">Height:</label>
                <input type="text" name="height" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="qualification">Qualification:</label>
                <input type="text" name="qualification" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="workingOrganization">Working Organisation:</label>
                <input type="text" name="workingOrganization" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="workingLocation">Place of Working:</label>
                <input type="text" name="workingLocation" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="salary">Salary Per Annum:</label>
                <input type="text" name="salary" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="siblings">Siblings:</label>
                <input type="text" name="siblings" autoComplete="off" />
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="contactNumber">Contact No.:</label>
                <input type="text" name="contactNumber" autoComplete="off" />
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="siblings">Siblings:</label>
                <input type="text" name="siblings" autoComplete="off" />
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
                  autoComplete="off"
                ></textarea>
              </InputHolder>
              <InputHolder className="input-holder mb-2 col-lg-5">
                <label htmlFor="residence">Residence:</label>
                <textarea
                  name="residence"
                  id="residence"
                  autoComplete="off"
                ></textarea>
              </InputHolder>
            </FieldsHolder>
            <FieldsHolder>
              <InputHolder className="input-holder mb-2 col-lg-3">
                <input
                  className="edit-save-button"
                  type="submit"
                  value="Save"
                />
              </InputHolder>
            </FieldsHolder>
          </EditUSerDetails>
        ) : (
          <ViewDetails>
            <ViewUserPhoto>
              <img src="./src/assets/react.svg" />
            </ViewUserPhoto>
            <DetailsSpan>
              <strong>Name: {profileDetail?.name}</strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Father&apos;s Name: {profileDetail?.fatherName}</strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Mother&apos;s Name: {profileDetail?.motherName}</strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Gotra: {profileDetail?.gotra}</strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Nakshatra: {profileDetail?.nakshatra} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Rashi: {profileDetail?.rashi} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Gana: {profileDetail?.gana} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Nadi: {profileDetail?.nadi} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Madhwa/ Smartha: {profileDetail?.caste} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Matha: {profileDetail?.matha} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Date & Time of Birth: {profileDetail?.dob} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Place of Birth: {profileDetail?.placeOfBirth} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Height: {profileDetail?.height} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Qualification: {profileDetail?.qualification} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Working Organisation: {profileDetail?.workingOrganization} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Place of Working: {profileDetail?.workingLocation} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Salary Per Annum: {profileDetail?.salary} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Siblings: {profileDetail?.siblings} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Contact No: {profileDetail?.contactNumber} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Expectations about Groom/Bride: {profileDetail?.expectationsAboutPartner} </strong>
            </DetailsSpan>
            <DetailsSpan>
              <strong>Address: {profileDetail?.residence} </strong>
            </DetailsSpan>
          </ViewDetails>
        )}
      </StyledUserModel>
    </>
  );
}

export default ProfileDetailModal;