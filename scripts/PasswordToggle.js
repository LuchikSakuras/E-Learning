const rootSelector = '[data-js-password]'

class PasswordToggle {
    selectors = {
        root: rootSelector,
        button: '[data-js-password-button]',
        input: '[data-js-password-input]',
    }

    attributeValues = {
        passwordType: "password",
        textType: "text",
        showTitle: "Show password",
        hideTitle: "Hide password",
    }

    svg = {
        openEye: `<svg
        width="22"
        height="17"
        viewBox="0 0 22 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            d="M11.001 11.5C12.6578 11.5 14.001 10.1569 14.001 8.5C14.001 6.84315 12.6578 5.5 11.001 5.5C9.34412 5.5 8.00098 6.84315 8.00098 8.5C8.00098 10.1569 9.34412 11.5 11.001 11.5Z"
            fill="#4C4C4D"
        />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.324388 7.9467C1.81164 3.47571 6.02889 0.25 11.0015 0.25C15.9718 0.25 20.1874 3.47271 21.6765 7.94045C21.7969 8.30152 21.797 8.69217 21.6769 9.05331C20.1896 13.5243 15.9723 16.75 10.9997 16.75C6.02945 16.75 1.81381 13.5273 0.324715 9.05955C0.204374 8.69849 0.204259 8.30783 0.324388 7.9467ZM16.251 8.5C16.251 11.3995 13.9005 13.75 11.001 13.75C8.10148 13.75 5.75098 11.3995 5.75098 8.5C5.75098 5.6005 8.10148 3.25 11.001 3.25C13.9005 3.25 16.251 5.6005 16.251 8.5Z"
            fill="#4C4C4D"
        />
        </svg>`,
        closeEye: `<svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24"
        height="24"
        viewBox="0 0 24 24" id="eye-slash"
        >
        <path 
            fill="#4C4C4D" 
            d="M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z"
        >
        </path>
        </svg>`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElement = this.rootElement.querySelector(this.selectors.button)
        this.inputElement = this.rootElement.querySelector(this.selectors.input)

        this.bindEvenets()
    }

    showPassword = () =>{
        this.buttonElement.innerHTML = this.svg.closeEye
        this.inputElement.type = this.attributeValues.textType
        this.buttonElement.title = this.buttonElement.ariaLabel = this.attributeValues.hideTitle
    }

    hidePassword = () =>{
        this.buttonElement.innerHTML = this.svg.openEye
        this.inputElement.type = this.attributeValues.passwordType
        this.buttonElement.title = this.buttonElement.ariaLabel = this.attributeValues.showTitle
    }

    onButtonClick = () => {
        const isPasswordHidden = this.inputElement.type === this.attributeValues.passwordType

        if(isPasswordHidden) {
            this.showPassword()
        } else {
            this.hidePassword()
        }
    }

    bindEvenets() {
        this.buttonElement.addEventListener('click', this.onButtonClick)
    }
}

class PasswordToggleCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new PasswordToggle(element)
        })
    }
}

export default PasswordToggleCollection