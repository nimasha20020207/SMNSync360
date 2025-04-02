import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import EquipmentTable from "./EquipmentTable";

const URL = "http://localhost:5000/Equipments";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return { equipments: [] };
  }
};

function EquipmentView() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setEquipments(data.equipments));
  }, []);

  return (
    <div>
      <Header />
      <EquipmentTable equipments={equipments} setEquipments={setEquipments} />
      <Footer />
    </div>
  );
}

export default EquipmentView;
