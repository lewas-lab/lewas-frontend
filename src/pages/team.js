// src/pages/team.js
import { useState } from 'react';
import Layout from '../components/Layout';

export default function TeamMembers() {
    // Team members data - replace with your actual team members
    const teamMembers = [
        {
            name: "Dr. Vinod Lohani",
            email: "vlohani@vt.edu",
            role: "Director",
            photo: "/team/vlohani.jpeg" // These photos should be placed in the public/team directory
        },
        {
            name: "Yunus Naseri",
            email: "mohammadyunusn@vt.edu",
            role: "Phd Student",
            photo: "/team/yunus.jpeg"
        },
        {
            name: "Akshat Kothyari",
            email: "kakshat@vt.edu",
            role: "PhD Student",
            photo: "/team/akshat.jpeg"
        },
        {
            name: "Dhruv Varshney",
            email: "dhruvvarshney@vt.edu",
            role: "Undergraduate Student",
            photo: "/team/dhruv.jpeg"
        },
        {
            name: "Jeremy Smith",
            email: "smithjer@vt.edu",
            role: "PhD Student",
            photo: "/team/jeremy.jpeg"
        }
    ];

    return (
        <Layout title="LEWAS Lab - Team Members">
            <div className="team-container">
                <h2>Our Team</h2>
                <p className="team-intro">
                    Meet the researchers and developers behind the LEWAS Lab environmental monitoring project.
                    Our interdisciplinary team combines expertise in environmental science, software development,
                    and civil engineering, engineering education.
                </p>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member-card">
                            <div className="member-photo">
                                {/* If photo is not available, show initials */}
                                {member.photo ? (
                                    <img src={member.photo} alt={member.name} />
                                ) : (
                                    <div className="member-initials">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}
                            </div>
                            <div className="member-info">
                                <h3>{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                                <p className="member-email">{member.email}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="development-notice">
                    <p>Team member information is being updated.</p>
                </div>
            </div>
        </Layout>
    );
}