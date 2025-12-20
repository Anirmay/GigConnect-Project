import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PaymentButton from "../components/PaymentButton";

const PublicProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://gigconnect-project.onrender.com/api/profile/${userId}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load profile. This user may not have a profile yet.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleContact = () => {
    if (profile && profile.user) {
      navigate("/messages", { state: { userToChat: profile.user } });
    }
  };

  if (loading) return <p style={textCenterStyles}>Loading profile...</p>;
  if (error) return <p style={errorTextStyles}>{error}</p>;
  if (!profile || !profile.user) return <p style={textCenterStyles}>Profile not found.</p>;

  return (
    <div style={pageStyles}>
      <div style={containerStyles}>
        {/* --- HEADER --- */}
        <div style={headerCardStyles}>
          <div style={avatarCircle}>
            {profile.user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={titleStyles}>{profile.user.username}</h1>
            <h2 style={headlineStyles}>
              {profile.headline || "No headline provided."}
            </h2>
          </div>
        </div>

        {/* --- ABOUT ME --- */}
        <div style={cardStyles}>
          <h3 style={sectionTitle}>About Me</h3>
          <p style={textBody}>{profile.bio || "No bio provided."}</p>
        </div>

        {/* --- SKILLS --- */}
        <div style={cardStyles}>
          <h3 style={sectionTitle}>Skills</h3>
          <div style={skillsContainerStyles}>
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill) => (
                <span key={skill} style={skillTagStyles}>
                  {skill}
                </span>
              ))
            ) : (
              <p style={textBody}>No skills listed.</p>
            )}
          </div>
        </div>

        {/* --- SERVICE RATES --- */}
        <div style={cardStyles}>
          <h3 style={sectionTitle}>Service Rates</h3>
          {profile.serviceRates && profile.serviceRates.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}>
              {profile.serviceRates.map((service, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f9fafb",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1rem",
                    marginBottom: "0.5rem",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <strong>{service.name}</strong> — ₹{service.rate}
                </li>
              ))}
            </ul>
          ) : (
            <p style={textBody}>Hourly Rate: ₹{profile.hourlyRate || "Not specified"}</p>
          )}
        </div>

        {/* --- USER REVIEWS --- */}
        <div style={cardStyles}>
          <h3 style={sectionTitle}>User Reviews</h3>
          {profile.reviews && profile.reviews.length > 0 ? (
            <div>
              <p style={{ color: "#f59e0b", fontWeight: 600, marginBottom: "1rem" }}>
                ⭐ Average Rating:{" "}
                {(
                  profile.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                  profile.reviews.length
                ).toFixed(1)}{" "}
                / 5
              </p>
              <div style={reviewList}>
                {profile.reviews.map((review, i) => (
                  <div key={i} style={reviewCard}>
                    <p style={reviewerName}>{review.reviewerName || "Anonymous"}</p>
                    <p style={{ color: "#f59e0b", margin: 0 }}>
                      {"⭐".repeat(review.rating || 0)}
                    </p>
                    <p style={reviewText}>{review.comment || "No comment provided."}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p style={textBody}>No reviews yet.</p>
          )}
        </div>

        {/* --- CONTACT --- */}
        <div style={cardStyles}>
          <h3 style={sectionTitle}>Contact</h3>
          <p style={textBody}>
            Hourly Rate:{" "}
            <span style={{ color: "#4f46e5", fontWeight: "600" }}>
              ₹{profile.hourlyRate || "Not specified"}
            </span>
          </p>

          {currentUser && currentUser._id !== profile.user._id && (
            <div style={buttonContainerStyles}>
              <button onClick={handleContact} style={buttonStyles}>
                💬 Contact {profile.user.username}
              </button>
              <div style={payButtonWrapper}>
                <PaymentButton amount={profile.hourlyRate || 500} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- STYLES ---------------- */
const pageStyles = {
  padding: "3rem 1rem",
  background: "linear-gradient(to bottom, #f3f4f6, #e5e7eb)",
  minHeight: "100vh",
};
const containerStyles = {
  maxWidth: "850px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};
const headerCardStyles = {
  background: "white",
  borderRadius: "1rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  padding: "2rem",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
};
const avatarCircle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "#4f46e5",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  flexShrink: 0,
};
const titleStyles = {
  fontSize: "2rem",
  fontWeight: "700",
  margin: 0,
};
const headlineStyles = {
  fontSize: "1rem",
  color: "#6b7280",
  marginTop: "0.25rem",
};
const cardStyles = {
  background: "white",
  padding: "1.75rem",
  borderRadius: "1rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};
const sectionTitle = {
  fontSize: "1.25rem",
  fontWeight: "600",
  marginBottom: "1rem",
  color: "#111827",
};
const textBody = {
  color: "#374151",
  lineHeight: "1.6",
};
const skillsContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.6rem",
};
const skillTagStyles = {
  background: "#eef2ff",
  color: "#4338ca",
  padding: "0.35rem 0.9rem",
  borderRadius: "9999px",
  fontSize: "0.9rem",
  fontWeight: "500",
};
const buttonContainerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  marginTop: "1rem",
};
const buttonStyles = {
  width: "fit-content",
  padding: "0.7rem 1.2rem",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
};
const payButtonWrapper = {
  width: "140px",
  alignSelf: "flex-start",
};
const textCenterStyles = {
  textAlign: "center",
  marginTop: "3rem",
  color: "#6b7280",
};
const errorTextStyles = {
  ...textCenterStyles,
  color: "red",
  fontWeight: "600",
};

/* --- Reviews --- */
const reviewList = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};
const reviewCard = {
  background: "#f9fafb",
  borderRadius: "0.75rem",
  padding: "1rem",
  border: "1px solid #e5e7eb",
};
const reviewerName = {
  fontWeight: "600",
  marginBottom: "0.25rem",
};
const reviewText = {
  color: "#374151",
  fontSize: "0.95rem",
  marginTop: "0.5rem",
};

export default PublicProfilePage;
