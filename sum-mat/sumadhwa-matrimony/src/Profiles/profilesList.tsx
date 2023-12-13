import { useState, useEffect } from "react";
import styled from "styled-components";
import UserCard from "./userCard";
import "bootstrap/dist/css/bootstrap.css";

const AdminPanelWrapper = styled.div`
  position: relative;
  background-color: #4689f3;
  padding: 50px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  @media (width <= 768px) {
    padding: 30px 10px;
  }
`;

const AdminTitle = styled.h1`
  position: relative;
  color: #f7fff7;
  // width: 100%;
  margin-bottom: 40px;
  @media (width <= 768px) {
    padding-top: 10px;
    margin-bottom: 10px;
  }

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    padding: 1px;
    left: 0;
    bottom: 0;
    background-color: #f7fff7;
  }
`;

const UserList = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media (width <= 768px) {
    margin-top: 10px;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

interface Profile {
    id: string;
    name: string;
    photo: string;
    contactNumber: string;
  }

const ProfilesList = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          "https://51kxoxxpf4.execute-api.ap-south-1.amazonaws.com/Stage/list-profiles"
        );
        const data = await response.json();
        setProfiles(data.data || []);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    console.log("profiles:", profiles);
  
    const filtered = profiles.filter(
      (profile) =>
        (profile.name && profile.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (profile.contactNumber && profile.contactNumber.includes(searchTerm))
    ) as Profile[];
  
    console.log("filtered:", filtered);
  
    setFilteredProfiles(filtered);
  }, [searchTerm, profiles]);  
  

  return (
    <AdminPanelWrapper>
      <AdminTitle>Profile Lists</AdminTitle>
      <SearchInput
        type="text"
        placeholder="Search by name or phone number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserList>
        {filteredProfiles.map((profile, index) => (
          <UserCard key={index} profile={profile} />
        ))}
      </UserList>
    </AdminPanelWrapper>
  );
};
export default ProfilesList;
