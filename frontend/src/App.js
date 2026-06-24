import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios"; // install with npm install axios

function App() {
  const [formdata, setdata] = useState({
    name: "",
    age: "",
    branch: ""
  });

  const[stu,setStu]=useState([]);



const [editingId, setEditingId] = useState(null);
const [editData, setEditData] = useState({ name: "", age: "", branch: "" });


const handleEditClick = (student) => {
  setEditingId(student._id);
  setEditData({ name: student.name, age: student.age, branch: student.branch });
};

const handleUpdate = async (id) => {
  try {
    const res = await axios.put(`http://localhost:5000/students/${id}`, editData);
    setStu(stu.map((s) => (s._id === id ? res.data.updated : s)));
    setEditingId(null); // exit edit mode
  } catch (err) {
    console.error("Error updating student:", err);
  }
};





const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/students/${id}`);
    setStu(stu.filter((student) => student._id !== id)); // remove from UI
  } catch (err) {
    console.error("Error deleting student:", err);
  }
};

const handleEdit = async (id) => {
  try {
    const res = await axios.put(`http://localhost:5000/students/${id}`, {
      branch: "Updated"
    });
    setStu(stu.map((student) => (student._id === id ? res.data.updated : student)));
  } catch (err) {
    console.error("Error editing student:", err);
  }
};








  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/students/getall");
        setStu(res.data.students);
        console.log(res.data.students);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
   // prevent page reload
    try {
      console.log(formdata); // see data in console

      // send to backend
      const res = await axios.post("http://localhost:5000/students/create", formdata);
      console.log("Response:", res.data);
      alert("Student created successfully!");
      setdata({ name: "", age: "", branch: "" });
    } catch (err) {
      console.error(err);
      alert("Error creating student");
    }
  };

  return (
    <div className="main">
      <div className="header">
        <h1>Student data management System</h1>
        <nav>
          <ul><a>home</a></ul>
          <ul><a>studentdatas</a></ul>
        </nav>
      </div>

      <div className="container">
        <div className="left">
          <h3>student data entry</h3>
          <h4>we can store the data to this place</h4>
          <p>
            this platform created by 
            <a href="https://neelamohan.vercel.app/">Neelamohan</a><br/>
            and this is used to store the data to database
          </p>
        </div>

        <div className="right">
          <form className="student-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={formdata.name}
              onChange={(e) => setdata({ ...formdata, name: e.target.value })}
              id="name"
              name="name"
              required
            />

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={formdata.age}
              onChange={(e) => setdata({ ...formdata, age: e.target.value })}
              name="age"
              required
            />

            <label htmlFor="branch">Branch:</label>
            <select
              value={formdata.branch}
              onChange={(e) => setdata({ ...formdata, branch: e.target.value })}
              id="branch"
              name="branch"
              required
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="AIDS">AIDS</option>
            </select>

            <button type="submit">Submit</button>
          </form>
        </div>

        


      <div>
        <ul>
            {stu.map((s) => (
            <li key={s._id}>
              {editingId === s._id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editData.age}
                    onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                  />
                  <select
                    value={editData.branch}
                    onChange={(e) => setEditData({ ...editData, branch: e.target.value })}
                  >
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="ECE">ECE</option>
                    <option value="AIDS">AIDS</option>
                  </select>
                  <button onClick={() => handleUpdate(s._id)}>Update</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {s.name} - {s.age} - {s.branch}
                  <button onClick={() => handleEditClick(s)}>Edit</button>
                  <button onClick={() => handleDelete(s._id)}>Delete</button>
                </>
              )}
            </li>
          ))}

                  </ul>
          </div>











      </div>
    </div>
  );
}

export default App;
