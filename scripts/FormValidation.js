const rootSelector = '[data-js-form]'

class FormValidation {
    selectors = {
        root: rootSelector,
        fieldError: '[data-js-form-field-error]'
    }

    errorMessages = {
        valueMissing: () => 'Please fill in this field',
        tooShort: ({ title, minLength}) => title || `Value too short, minimum characters ${minLength}`,
        patternMismatch: ({ title }) => title || 'The data is not in the correct format',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.fieldErrorElements = [...this.rootElement.querySelectorAll(this.selectors.fieldError)]

        this.bindEvents()
    }

    manageErrors(fieldControlElement, errorMessagesArr) {
        const fieldErrorsElement = 
        [fieldControlElement.parentElement, fieldControlElement.parentElement.parentElement]
        .find(parent => parent.querySelector(this.selectors.fieldError))?.querySelector(this.selectors.fieldError);
    
        fieldErrorsElement.innerHTML = errorMessagesArr
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('')
    }

    validateField(fieldControlElement) {
        const errors = fieldControlElement.validity;
        const errorMessages = [];
        const fieldValueLength = fieldControlElement.value.length;

        if (fieldValueLength < fieldControlElement.minLength && fieldValueLength > 0) {
            errorMessages.push(this.errorMessages.tooShort(fieldControlElement));
        }

        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType] && errorType !== 'tooShort') {
                errorMessages.push(getErrorMessage(fieldControlElement));
            }
        });

        this.manageErrors(fieldControlElement, errorMessages)

        const isValid = errorMessages.length === 0

        fieldControlElement.ariaInvalid = !isValid

        return isValid
    }

    onSubmit(event) {
        event.preventDefault()

        const { target } = event
        let firstInvalidFieldControl = null
        let isFormValid = true 

        const requiredControlElements = [...target.elements]
            .filter(({required}) => required)

        requiredControlElements.forEach((element) => {
            const isFieldValid = this.validateField(element)

            if(!isFieldValid) {
                isFormValid = false

                if(!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element
                }
            }
        })

        if(!isFormValid) {
            firstInvalidFieldControl.focus()
        } else {
            alert('The form has been submitted.')
        }
    }

    onChange(event) {
        const target = event.target
        const isRequired = target.required
        const isToggleType = ['checkbox'].includes(target.type)

        if(isToggleType && isRequired) {
            this.validateField(target)
        }
    }

    onBlur(event) {
        const target = event.target
        const isRequired = target.required
        
        if(isRequired) {
            this.validateField(target)
        }
    }

    bindEvents() {
        this.rootElement.addEventListener('submit', (event) => this.onSubmit(event))
        this.rootElement.addEventListener('change', (event) => this.onChange(event))
        this.rootElement.addEventListener('blur', (event) => {
            this.onBlur(event)
        }, {capture: true})
    }
}

class FormValidationCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new FormValidation(element)
        })
    }
}

export default FormValidationCollection