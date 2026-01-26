import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const TeachersList: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const teachersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeachers(teachersData);
    } catch (err) {
      setError("Failed to fetch teachers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const seedTeachers = async () => {
    const sampleTeachers = [
      { name: "John Doe", subject: "Mathematics", email: "john.doe@example.com" },
      { name: "Jane Smith", subject: "Physics", email: "jane.smith@example.com" },
      { name: "Emily Johnson", subject: "Chemistry", email: "emily.johnson@example.com" },
      { name: "Michael Brown", subject: "Biology", email: "michael.brown@example.com" },
    ];

    try {
      const teachersCollection = collection(db, "teachers");
      for (const teacher of sampleTeachers) {
        await addDoc(teachersCollection, teacher);
      }
      alert("Sample teachers added successfully!");
      fetchTeachers(); // Refresh the list after adding teachers
    } catch (error) {
      console.error("Error seeding teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return <div>Loading teachers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Teachers List</h1>
      <button onClick={seedTeachers}>Seed Teachers</button>
      {teachers.length === 0 ? (
        <p>No teachers available.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "200px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0" }}>{teacher.name}</h3>
              <p style={{ margin: "0 0 8px 0" }}>{teacher.subject}</p>
              <p style={{ margin: 0, color: "gray" }}>{teacher.email}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TeachersList;
