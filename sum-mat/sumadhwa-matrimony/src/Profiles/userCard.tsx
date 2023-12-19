import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styled from "styled-components";
import { useState } from "react";
import ProfileDetailModal from "./profileDetailModal";
import axios from "axios";
import { IFormData } from "../Form/form";
import Swal from "sweetalert2";

const UserCardWrapper = styled.div`
  position: relative;
  border: 1px solid transparent;
  height: auto;
  background-color: #ffffffed;
  padding: 10px;
  margin: 20px;
  border-radius: 7px;
  transition: all 0.3s ease;

  @media (width >= 320px) and (width <= 425px) {
    margin: 20px;
  }

  &:hover,
  &:focus {
    background-color: #fff;
    transform: translateY(-5px);
    box-shadow: 0px 3px 10px #0000009a;

    .user-image {
      transform: scale(1.03);
      filter: grayscale(0);
    }

    .card-title::after {
      transform: scale(1);
      transition-delay: 570ms;
    }
  }

  p {
    margin: 0;
  }
`;

const UserName = styled.h3`
  position: relative;
  color: #333;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;

  &.card-title::after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    width: 13%;
    height: 2px;
    background-color: #f34655;
    transform: scale(0);
    transform-origin: left;
    transition: all 0.3s ease-in;
  }
`;

const UserPhone = styled.p`
  color: #444;
  font-size: 15px;
  padding: 5px;
`;

const UserImage = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c0c0c073;

  .user-image {
    transition: all 0.5s ease;
    transition-delay: 180ms;
    width: 100%;
    height: 100%;
    // filter: grayscale(0.7);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ViewMore = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  outline: unset;
  border: unset;
  border-radius: 3px;
  background-color: #4689f3;
  color: #f1f1f1;
  transition: all 0.3s ease;
  letter-spacing: 0.7px;

  &:hover,
  &:focus {
    background-color: #6fae63;
    transform: translateX(3px);
  }
`;

const SendMessage = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  outline: unset;
  border: unset;
  border-radius: 3px;
  background-color: #4689f3;
  color: #f1f1f1;
  transition: all 0.3s ease;
  letter-spacing: 0.7px;

  &:hover,
  &:focus {
    background-color: #6fae63;
    transform: translateX(3px);
  }

  .bi-telegram {
    margin-right: 3px;
  }
`;

export interface Profile {
  id: string
  name: string;
  fatherName: string;
  motherName: string;
  gotra: string;
  nakshatra: string;
  rashi: string;
  gana: string;
  nadi: string;
  caste: string;
  matha: string;
  dob: string;
  placeOfBirth: string;
  height: string;
  qualification: string;
  workingOrganization: string;
  workingLocation: string;
  expectationsAboutPartner: string;
  salary: string;
  siblings: string;
  contactNumber: string;
  residence: string;
  description: string;
  photo: string;
  [key: string]: string | File | null;
}

const UserCard: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   if (profile.length === 0) {
  //     return <div>No Users Found</div>;
  //   }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    location.reload();
  };

  const BOT_TOKEN = "6710721716:AAFJCkuFl94excqHHHcz7q2aKr2a85rUDqs";
  // const CHAT_ID = 822389037;
  const CHAT_ID = -1002136474672;

  const fieldMappingsOrder = [
    "name",
    "fatherName",
    "motherName",
    "gotra",
    "nakshatra",
    "rashi",
    "gana",
    "nadi",
    "caste",
    "matha",
    "dob",
    "placeOfBirth",
    "height",
    "qualification",
    "contactNumber",
    "siblings",
    "workingOrganization",
    "workingLocation",
    "expectationsAboutPartner",
    "salary",
    "description",
    "residence",
  ];

  const sendTelegramMessage = () => {
    const fieldMappings: Record<keyof IFormData, string> = {
      name: "Name",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      gotra: "Gotra",
      nakshatra: "Nakshatra",
      rashi: "Rashi",
      gana: "Gana",
      nadi: "Nadi",
      caste: "Caste",
      matha: "Mata(ಮಠ)",
      dob: "Date of Birth & Time",
      placeOfBirth: "Place of Birth",
      height: "Height",
      qualification: "Qualification",
      contactNumber: "Contact Number",
      siblings: "Siblings",
      workingOrganization: "Working Organization",
      workingLocation: "Working Location",
      expectationsAboutPartner: "Expectations About Partner",
      salary: "Salary per Annum",
      description: "Other Details",
      residence: "Address",
    };

    const commonPayload = {
      chat_id: CHAT_ID,
      text:
        fieldMappingsOrder
          .map((key) => ({ key, value: profile[key as keyof Profile] }))
          .filter(({ value }) => value)
          .map(({ key, value }) => `${fieldMappings[key] || key}: ${value}`)
          .join("\n\n") +
        "\n\n" +
        "######################\nSumadhwa Matrimony - For joining call 7975950334 / 9042729165",
    };

    if (profile.photo) {
      // If profile.photo has a value, use sendPhoto API
      const telegramApiPayload = {
        ...commonPayload,
        photo: profile.photo,
        caption: commonPayload.text,
      };

      const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;

      axios
        .post(apiUrl, telegramApiPayload)
        .then((response) => {
          console.log("Photo sent:", response.data);
          Swal.fire({
            title: "Success!!",
            text: "Successfully sent to Telegram",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error(
            "Error sending photo:",
            error.response ? error.response.data : error.message
          );
          Swal.fire({
            title: "Error!!",
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
      // If profile.photo is null, use sendMessage API
      const telegramApiPayload = commonPayload;

      const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      axios
        .post(apiUrl, telegramApiPayload)
        .then((response) => {
          console.log("Message sent:", response.data);
          Swal.fire({
            title: "Success!!",
            text: "Successfully sent to Telegram",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error(
            "Error sending message:",
            error.response ? error.response.data : error.message
          );
          Swal.fire({
            title: "Error!!",
            text: "Something went wrong",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  return (
    <>
      <UserCardWrapper className="col-lg-3 col-md-5 col-sm-7 col-12">
        <UserName className="card-title">{profile.name}</UserName>
        <UserImage>
          <img className="user-image" src={profile.photo} alt="User Photo" />
        </UserImage>
        <UserPhone>{profile.contactNumber}</UserPhone>
        <ButtonsWrapper>
          <ViewMore onClick={openModal}>
            <i className="bi bi-door-closed-fill me-1"></i>View Details
          </ViewMore>
          <SendMessage onClick={sendTelegramMessage}>
            <i className="bi bi-telegram"></i>Send Telegram
          </SendMessage>
        </ButtonsWrapper>
      </UserCardWrapper>
      <ProfileDetailModal
        // profileId={profile.id}
        profile={profile}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default UserCard;
