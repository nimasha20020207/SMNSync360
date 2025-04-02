
import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialsTable from "./MaterialsTable";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";

const URL = "http://localhost:5000/Materials";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return { Materials: [] };
  }
};

function MaterialView() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setMaterials(data.Materials));
  }, []);

  return (
    <div>
      <Header />
      <MaterialsTable materials={materials} setMaterials={setMaterials} />
      <Footer />
    </div>
  );
}

export default MaterialView;

