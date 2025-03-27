// Set copyright year and last modified date
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");
    
    // Set current year for copyright
    yearSpan.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    
    // Call the function to load member data
    loadMemberData();
});

// Toggle between grid and list view
function toggleView(viewType) {
    const memberList = document.getElementById("member-list");
    
    if (viewType === "grid") {
        memberList.classList.remove("list");
        memberList.classList.add("grid");
        document.getElementById("grid-view").classList.add("active");
        document.getElementById("list-view").classList.remove("active");
    } else {
        memberList.classList.remove("grid");
        memberList.classList.add("list");
        document.getElementById("list-view").classList.add("active");
        document.getElementById("grid-view").classList.remove("active");
    }
}

// Load and display member data
async function loadMemberData() {
    const memberList = document.getElementById("member-list");
    
    // Set a placeholder with appropriate height before loading data
    memberList.innerHTML = `
        <div style="grid-column: 1/-1; height: 200px; display: flex; justify-content: center; align-items: center;">
            <p>Loading directory members...</p>
        </div>
    `;
    
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading member data:", error);
        document.getElementById("member-list").innerHTML = 
            "<p class='error'>Unable to load member data. Please try again later.</p>";
    }
}

// Create and display member cards
function displayMembers(members) {
    const memberList = document.getElementById("member-list");
    memberList.innerHTML = ""; // Clear any existing content
    memberList.classList.add("grid"); // Default to grid view
    
    members.forEach(member => {
        // Create member card
        const card = document.createElement("div");
        card.className = "member-card";
        
        // Add membership level class
        if (member.membership_level === 3) {
            card.classList.add("membership-gold");
        } else if (member.membership_level === 2) {
            card.classList.add("membership-silver");
        }
        
        // Generate membership level text
        let membershipText = "Member";
        if (member.membership_level === 2) membershipText = "Silver Member";
        if (member.membership_level === 3) membershipText = "Gold Member";
        
        // Get image name without extension
        const imageName = member.image.split('.')[0];
        
        // Populate card with member data using picture element for WebP with fallback
        card.innerHTML = `
            <picture>
                <source srcset="images/${imageName}.webp" type="image/webp">
                <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100">
            </picture>
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p class="membership-level">${membershipText}</p>
            <p>${member.description}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        
        memberList.appendChild(card);
    });
    
    // Add view toggle buttons if not already present
    if (!document.querySelector(".view-toggle")) {
        const main = document.querySelector("main");
        const toggleDiv = document.createElement("div");
        toggleDiv.className = "view-toggle";
        toggleDiv.innerHTML = `
            <button id="grid-view" class="active" onclick="toggleView('grid')">Grid View</button>
            <button id="list-view" onclick="toggleView('list')">List View</button>
        `;
        memberList.after(toggleDiv);
    }
}