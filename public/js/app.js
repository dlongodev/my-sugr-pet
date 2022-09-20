// Disable form submissions if there are invalid fields
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// Bootstrap helper function for form file inpyt type
bsCustomFileInput.init()

// Bootstrap enable tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// Bootstrap dismiss alert after 2sec
$(".alert-success").alert();
window.setTimeout(function () { $(".alert-success").alert('close'); }, 2000);

// Bootstrap ToolTip
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// handle mobile viewport height --> https://stackoverflow.com/questions/62114804/how-to-do-calc-function-on-vendor-prefixed-properties-in-css
function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--vh', (window.innerHeight * .01) + 'px');
}
window.addEventListener('resize', appHeight);
appHeight();