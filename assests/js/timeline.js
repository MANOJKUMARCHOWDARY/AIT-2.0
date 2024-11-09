const DOM = {
    timeline: "timeline",
    timelineStepper: "timeline__stepper",
    timelineStep: "timeline__step",
    timelineStepTitle: "timeline__step-title",
    timelineStepActive: "is-active",
    timelineStepActiveMarker: "timeline__step-active-marker",
    timelineSlidesContainer: "timeline__slides",
    timelineSlide: "timeline__slide",
    timelineSlideActive: "is-active",
};

const STEP_ACTIVE_MARKER_CUSTOM_PROPS = {
    width: "--slide-width",
    posX: "--slide-pos-x",
    posY: "--slide-pos-y",
};

const SLIDES_CONTAINER_CUSTOM_PROPS = {
    height: "--slides-container-height",
};

let autoPlayInterval;
const AUTO_PLAY_DELAY = 3000; // 3 seconds

const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => Array.from(document.querySelectorAll(selector));

// DOM Elements
const timeline = select(`.${DOM.timeline}`);
const timelineStepper = select(`.${DOM.timelineStepper}`);
const timelineStepTitle = select(`.${DOM.timelineStepTitle}`);
const timelineSlidesContainer = select(`.${DOM.timelineSlidesContainer}`);
const timelineSlides = selectAll(`.${DOM.timelineSlide}`);

document.addEventListener("DOMContentLoaded", () => {
    createStepActiveMarker();
    activateCurrentSlide();
    startAutoplay(); // Start autoplay when content loads
});

window.addEventListener("resize", recalcStepActiveMarkerProps);

timeline?.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent unintended propagation

    const target = event.target.closest(`.${DOM.timelineStep}`);
    if (!target) return;

    deactivateSteps();
    activateCurrentStep(target);
    recalcStepActiveMarkerProps();
    deactivateSlides();
    activateCurrentSlide();

    resetAutoplay(); // Reset autoplay on manual click
});

function deactivateSteps() {
    selectAll(`.${DOM.timelineStep}`).forEach(step =>
        step.classList.remove(DOM.timelineStepActive)
    );
}

function activateCurrentStep(currentStep) {
    currentStep.classList.add(DOM.timelineStepActive);
}

function deactivateSlides() {
    timelineSlides.forEach(slide =>
        slide.classList.remove(DOM.timelineSlideActive)
    );
}

function activateCurrentSlide() {
    const currentSlide = getCurrentSlide();
    if (!currentSlide) return;

    const currentHeight = currentSlide.clientHeight;
    setSlideContainerHeight(currentHeight);
    currentSlide.classList.add(DOM.timelineSlideActive);
}

function createStepActiveMarker() {
    const marker = document.createElement("div");
    marker.classList.add(DOM.timelineStepActiveMarker);
    timelineStepper.appendChild(marker);

    const props = getStepActiveMarkerProps();
    if (props) setStepActiveMarkerProps(marker, props);
}

function recalcStepActiveMarkerProps() {
    const marker = select(`.${DOM.timelineStepActiveMarker}`);
    const props = getStepActiveMarkerProps();
    if (props) setStepActiveMarkerProps(marker, props);
}

function setStepActiveMarkerProps(marker, { posX, posY, width }) {
    marker.style.setProperty(STEP_ACTIVE_MARKER_CUSTOM_PROPS.width, `${width}px`);
    marker.style.setProperty(STEP_ACTIVE_MARKER_CUSTOM_PROPS.posX, `${posX}px`);
    if (posY !== null) {
        marker.style.setProperty(STEP_ACTIVE_MARKER_CUSTOM_PROPS.posY, `${posY}px`);
    }
}

function getStepActiveMarkerProps() {
    const { currentStep } = getCurrentStep();
    if (!currentStep) return null;

    const width = currentStep.clientWidth;
    const posX = getStepActiveMarkerPosX(currentStep);
    const posY = getStepActiveMarkerPosY();

    return posX !== null && posY !== null ? { posX, posY, width } : null;
}

function getCurrentStep() {
    const steps = selectAll(`.${DOM.timelineStep}`);
    const currentStep = steps.find(step =>
        step.classList.contains(DOM.timelineStepActive)
    );
    const currentIndex = steps.indexOf(currentStep);
    return { currentStep, currentIndex };
}

function getCurrentSlide() {
    const { currentIndex } = getCurrentStep();
    return currentIndex >= 0 ? timelineSlides[currentIndex] : null;
}

function setSlideContainerHeight(height) {
    timelineSlidesContainer.style.setProperty(
        SLIDES_CONTAINER_CUSTOM_PROPS.height,
        `${height}px`
    );
}

function getStepActiveMarkerPosY() {
    const titlePosY = timelineStepTitle.getBoundingClientRect().top;
    const stepperPosY = timelineStepper.getBoundingClientRect().top;
    return titlePosY - stepperPosY;
}

function getStepActiveMarkerPosX(currentStep) {
    const stepperPosX = timelineStepper.getBoundingClientRect().left;
    const stepPosX = currentStep.getBoundingClientRect().left;
    return stepPosX - stepperPosX;
}

// Autoplay Functions
function startAutoplay() {
    autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
}

function stopAutoplay() {
    clearInterval(autoPlayInterval);
}

function resetAutoplay() {
    console.log("Autoplay reset triggered");
    if (autoPlayInterval) stopAutoplay();
    startAutoplay();
}



function nextSlide() {
    const { currentIndex } = getCurrentStep();
    const steps = selectAll(`.${DOM.timelineStep}`);
    const nextIndex = (currentIndex + 1) % steps.length;

    deactivateSteps();
    activateCurrentStep(steps[nextIndex]);
    deactivateSlides();
    activateCurrentSlide();
    recalcStepActiveMarkerProps();
}
// ----------------------------time line js ----------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.ps-timeline li');
    let currentIndex = 0;

    function highlightCurrentStep() {
        // Reset all elements to default state
        timelineItems.forEach((item) => {
            item.classList.remove('active'); // Remove active class for border change
            item.querySelector('.ps-bot')?.classList.remove('highlight', 'highlightEffect');
            item.querySelector('.ps-top')?.classList.remove('highlight', 'highlightEffect');
            item.querySelector('.ps-sp-top')?.classList.remove('highlight');
            item.querySelector('.ps-sp-bot')?.classList.remove('highlight');
            
            // Reset the :before pseudo-element
            const spTopBefore = item.querySelector('.ps-sp-top');
            if (spTopBefore) {
                spTopBefore.classList.remove('highlight'); // Reset the highlight for :before
            }
        });

        // Apply highlight to the current item
        const currentItem = timelineItems[currentIndex];
        const botElement = currentItem.querySelector('.ps-bot');
        const topElement = currentItem.querySelector('.ps-top');
        const spTopElement = currentItem.querySelector('.ps-sp-top');
        const spBotElement = currentItem.querySelector('.ps-sp-bot');

        currentItem.classList.add('active'); // Highlight the active item for border change
        if (botElement) botElement.classList.add('highlight', 'highlightEffect');
        if (topElement) topElement.classList.add('highlight', 'highlightEffect');
        if (spTopElement) {
            spTopElement.classList.add('highlight'); // Highlight the span element
            spTopElement.classList.add('highlight'); // Add highlight for :before pseudo-element
        }
        if (spBotElement) spBotElement.classList.add('highlight');

        // Move to the next item
        currentIndex = (currentIndex + 1) % timelineItems.length;
    }

    // Start autoplay every 3 seconds
    setInterval(highlightCurrentStep, 3000);

    // Initial highlight
    highlightCurrentStep();
});
