const Profile = require("./Profile");
const Project = require("./Project");
const Technology = require("./Technology");
const Feedback = require("./Feedback");

// Profile 1:N Project
Profile.hasMany(Project, {
    foreignKey: "profileId"
});

Project.belongsTo(Profile, {
    foreignKey: "profileId"
});

// Project N:N Technology
Project.belongsToMany(Technology, {
    through: "ProjectTechnologies"
});

Technology.belongsToMany(Project, {
    through: "ProjectTechnologies"
});

// Project 1:N Feedback
Project.hasMany(Feedback, {
    foreignKey: "projectId"
});

Feedback.belongsTo(Project, {
    foreignKey: "projectId"
});

module.exports = {
    Profile,
    Project,
    Technology,
    Feedback
};