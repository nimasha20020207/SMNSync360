import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialsTable from "./MaterialsTable";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import background from "../pictures/inventory2.jpg"; // Import the background

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

      {/* Background wrapper for content only */}
      <div
        className="py-4"
        style={{
          position: "relative",
          minHeight: "calc(100vh - 160px)", // leave space for header/footer
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>

        <div className="container">
          <MaterialsTable materials={materials} setMaterials={setMaterials} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MaterialView;
