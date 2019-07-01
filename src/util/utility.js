// To change direction of component
const positionComponent = (top, bottom, type, element) => {
    if (element) {
        const getBound = element.getBoundingClientRect();
        // To open bottom dropdown at top
        if (window.innerHeight < getBound.bottom && type === 'bottom') {
            top();
        }
        // To open top dropdown at bottom
        if (getBound.top + window.pageYOffset < 0 && type === 'top') {
            bottom();
        }
    }
};


// To handle the document click
const trackDocumentClick = (element, callback) => {
    const handler = event => {
        if (event.target !== element) {
            window.removeEventListener("click", handler);
            if (typeof callback === "function") {
                callback();
            }
        }
    };
    window.addEventListener("click", handler);
};

export { trackDocumentClick, positionComponent };
