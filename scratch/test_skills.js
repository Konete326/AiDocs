const mongoose = require('mongoose');
const { toggleProjectSkill } = require('./backend/controllers/skillsController');
const Project = require('./backend/models/Project');

async function testToggle() {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Create a dummy project
    const project = new Project({
        title: 'Test Project',
        userId: new mongoose.Types.ObjectId(),
        projectType: 'saas',
        customSkills: []
    });
    await project.save();
    
    console.log('Project created with customSkills:', project.customSkills);
    
    const req = {
        params: { projectId: project._id },
        body: { skillId: 'supabase' }, // A non-core skill
        user: { id: project.userId }
    };
    
    const res = {
        json: (data) => console.log('Response:', JSON.stringify(data, null, 2))
    };
    
    // Toggle ON
    await toggleProjectSkill(req, res);
    
    // Toggle OFF
    await toggleProjectSkill(req, res);
    
    await Project.deleteOne({ _id: project._id });
    await mongoose.disconnect();
}

// Note: This script needs environment variables to run. 
// I'll just check the code again.
