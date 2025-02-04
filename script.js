// script.js

// Sample project data
const projects = [
    {
        projectName: 'Website Redesign',
        tasks: [
            { taskName: 'Design Homepage', assignedTo: 'Alice', comments: ['Great design idea!'] },
            { taskName: 'Develop Backend', assignedTo: 'Bob', comments: ['Backend is in progress'] }
        ]
    },
    {
        projectName: 'App Development',
        tasks: [
            { taskName: 'Build Login Screen', assignedTo: 'Charlie', comments: ['Need to add validation'] }
        ]
    }
];

// Function to load projects into the HTML
function loadProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <h3>${project.projectName}</h3>
            ${project.tasks.map(task => `
                <div class="task">
                    <p><strong>${task.taskName}</strong> - Assigned to: ${task.assignedTo}</p>
                    <button onclick="addComment('${task.taskName}')">Add Comment</button>
                    <div class="comments">
                        ${task.comments.map(comment => `<p>${comment}</p>`).join('')}
                    </div>
                </div>
            `).join('')}
        `;
        projectList.appendChild(projectCard);
    });
}

// Function to add a comment
function addComment(taskName) {
    const comment = prompt('Enter your comment:');
    if (comment) {
        const project = projects.find(project => project.tasks.some(task => task.taskName === taskName));
        const task = project.tasks.find(task => task.taskName === taskName);
        task.comments.push(comment);
        loadProjects(); // Re-render projects after adding a comment
    }
}

// Event listener to handle project creation
document.getElementById('create-project-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const projectName = document.getElementById('project-name').value;
    const taskName = document.getElementById('task-name').value;
    const assignTask = document.getElementById('assign-task').value;
    
    const newProject = {
        projectName: projectName,
        tasks: [
            {
                taskName: taskName,
                assignedTo: assignTask,
                comments: []
            }
        ]
    };
    
    projects.push(newProject);
    loadProjects();
    
    // Reset form
    document.getElementById('create-project-form').reset();
});

// Initial load of projects
loadProjects();
