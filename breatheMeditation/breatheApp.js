const breathButtons = document.querySelectorAll(".breath-button");
const start = document.querySelector(".start");
const instructions = document.querySelector(".instructions");
const breathsText = document.querySelector(".breaths-text");
const circleProgress = document.querySelector(".circle-progress");
let breathsLeft = 3;

// Add click event listeners to each breath button
breathButtons.forEach((button) => {
    button.addEventListener("click", () => {
        breathsLeft = parseInt(button.getAttribute("data-value"));
        breathsText.innerText = breathsLeft;
    });
});

// Grow/Shrink Circle
const growCircle = () => {
    circleProgress.classList.add("circle-grow");
    setTimeout(() => {
        circleProgress.classList.remove("circle-grow");
    }, 8000);
};

// Breathing Instructions
const breathTextUpdate = () => {
    breathsLeft--;
    breathsText.innerText = breathsLeft;
    instructions.innerText = "Breath in";
    setTimeout(() => {
        instructions.innerText = "Hold Breath";
        setTimeout(() => {
            instructions.innerText = "Exhale Breath Slowly";
        }, 4000);
    }, 4000);
};

// Breathing App Function
const breathingApp = () => {
    const breathingAnimation = setInterval(() => {
        if (breathsLeft === 0) {
            clearInterval(breathingAnimation);
            instructions.innerText = "Breathing session completed. Click 'Begin' to start another session!";
            start.classList.remove("button-inactive");
            breathsLeft = 3;
            breathsText.innerText = breathsLeft;
            return;
        }
        growCircle();
        breathTextUpdate();
    }, 12000);
};

// Start Breathing
start.addEventListener("click", () => {
    start.classList.add("button-inactive");
    instructions.innerText = "Get relaxed, and ready to begin breathing";
    setTimeout(() => {
        instructions.innerText = "Breathing is about to begin...";
        setTimeout(() => {
            breathingApp();
        }, 2000);
    }, 2000);
});
