import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./createMonitor.css";
import Navbar from "../../topnav/supervisor/ss";
import Footer from "../../bottomnav/foter";

function CreateMonitor() {
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Location: "",
    Monitoring_Date: "",
    Issues_Found: "",
    Weather_Conditions: "sunny",
    Workers_Present: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Tasks/${taskId}`);
        const task = response.data.task;
        
        console.log(task)
        if (task) {
          const res = await axios.get(`http://localhost:5000/ProjectSchedules/${task.Project_ID}`)
          console.log(res)
          const project = res.data.ProjectSchedules[0]
          console.log(project)
          let projectName = ""
          let projectLocation = ""
          if (project) {
            projectLocation = project.Project_Location 
            projectName = project.Project_Name
          }

          console.log(projectName)
          setInputs({
            Project_ID: `${task.Project_ID}` ?? "",
            Project_Name: `${projectName}` ?? "",
            Location: projectLocation ?? "",
            Monitoring_Date: task.Monitoring_Date ?? "",
            Issues_Found: task.Issues_Found ?? "",
            Weather_Conditions: task.Weather_Conditions ?? "sunny",
            Workers_Present: task.Workers_Present ?? "",
          });
          
          
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
  
    if (taskId) {
      getTask();
    }
  }, [taskId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to create this record?"
    );
    if (!isConfirmed) {
      return; // Stop if user cancels
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/Monitoring",
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Record created successfully!");
        navigate("/site-supervisor/monitor/view");
      }
    } catch (error) {
      console.error("Creation error:", error);
      let errorMessage = "Failed to create record";

      if (error.response) {
        if (error.response.data?.errors) {
          errorMessage = error.response.data.errors.join(", ");
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-monitor-form">
        <div className="form-container">
          <h2 className="form-title">Create Monitoring Record</h2>

          <form className="monitor-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Project ID</label>
                <input
                  type="text"
                  name="Project_ID"
                  value={inputs.Project_ID}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  name="Project_Name"
                  value={inputs.Project_Name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="Location"
                  value={inputs.Location}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Monitoring Date</label>
                <input
                  type="date"
                  name="Monitoring_Date"
                  value={inputs.Monitoring_Date}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Issues Found</label>
                <textarea
                  rows={2}
                  name="Issues_Found"
                  value={inputs.Issues_Found}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Weather Conditions</label>
                <select
                  name="Weather_Conditions"
                  value={inputs.Weather_Conditions}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="sunny">Sunny</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Workers Present</label>
                <input
                  type="number"
                  name="Workers_Present"
                  value={inputs.Workers_Present}
                  onChange={handleChange}
                  min="0"
                  required
                  className="input-field"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating...
                </>
              ) : (
                "Create Record"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateMonitor;
