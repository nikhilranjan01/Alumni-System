import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlumnus } from "../api/alumniApi";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaUser, FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";

const ViewAlumni = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const data = await getAlumnus(id);
        setAlumni(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!alumni) return <div className="p-6 text-center">Alumni not found.</div>;

  const initials = (alumni.name || "A")
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >

        {/* Header Gradient */}
        <div className="h-36 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500"></div>

        {/* Profile Section */}
        <div className="p-8 -mt-16 flex flex-col items-center">

          {/* Avatar */}
          <div className="w-32 h-32 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white shadow-lg">
            {alumni.photoUrl ? (
              <img
                src={alumni.photoUrl}
                alt={alumni.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              initials
            )}
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold text-slate-800 mt-4">
            {alumni.name}
          </h1>

          <p className="text-slate-500">
            {alumni.designation || "-"} @ {alumni.company || "-"}
          </p>

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-8 w-full">

            <div className="bg-slate-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <FaGraduationCap className="text-sky-500 text-xl"/>
              <div>
                <p className="text-sm text-slate-500">Department</p>
                <p className="font-medium">{alumni.department || "-"}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <FaUser className="text-emerald-500 text-xl"/>
              <div>
                <p className="text-sm text-slate-500">Roll Number</p>
                <p className="font-medium">{alumni.rollNumber || "-"}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <FaBriefcase className="text-indigo-500 text-xl"/>
              <div>
                <p className="text-sm text-slate-500">Batch</p>
                <p className="font-medium">{alumni.batch || "-"}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <FaEnvelope className="text-red-500 text-xl"/>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                {alumni.email ? (
                  <a href={`mailto:${alumni.email}`} className="text-blue-600">
                    {alumni.email}
                  </a>
                ) : "-"}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <FaPhone className="text-green-500 text-xl"/>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium">{alumni.phone || "-"}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
              <FaLinkedin className="text-blue-600 text-xl"/>
              <div>
                <p className="text-sm text-slate-500">LinkedIn</p>
                {alumni.linkedin ? (
                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    View Profile
                  </a>
                ) : "-"}
              </div>
            </div>

          </div>

          {/* Notes */}
          {alumni.notes && (
            <div className="mt-8 w-full bg-slate-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-2 text-slate-700">Notes</h3>
              <p className="text-slate-600 text-sm">{alumni.notes}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <Link
              to="/alumni"
              className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
            >
              Back
            </Link>

            {alumni.email && (
              <a
                href={`mailto:${alumni.email}`}
                className="px-6 py-2 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition"
              >
                Contact
              </a>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default ViewAlumni;